import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

import { UserService } from '../user/user.service';
import { TokenPair } from './token-pair.entity';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { configs } from '../core/configs';
import { User } from '../user/user.entity';
import { ITokenPair } from './dto/token-pair.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(TokenPair)
    private readonly tokenRepository: Repository<TokenPair>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private userService: UserService,
  ) {}

  async login(
    loginDto: LoginDto,
  ): Promise<{ user: Partial<User>; tokenPair: ITokenPair }> {
    const userFromDb = await this.userRepository.findOne({
      where: { email: loginDto.email },
      select: [
        'id',
        'email',
        'role',
        'password',
        'firstName',
        'lastName',
        'isActive',
      ],
    });

    if (!userFromDb) {
      throw new HttpException(
        'Wrong email or password! Please, try again.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      userFromDb.password,
    );
    if (!isPasswordValid) {
      throw new HttpException(
        'Wrong email or password! Please, try again.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const { id, email, role, firstName, lastName, isActive } = userFromDb;

    const tokenPair = this.generateTokenPair(id, email, role);

    await this.saveTokenPair(tokenPair, id);
    return {
      user: { id, email, role, firstName, lastName, isActive },
      tokenPair: tokenPair,
    };
  }

  async registration(
    createUserDto: CreateUserDto,
  ): Promise<{ user: Partial<User>; tokenPair: ITokenPair }> {
    const userFromDb = await this.userService.getByEmail(createUserDto.email);
    if (userFromDb) {
      throw new HttpException(
        'User with email: ' + createUserDto.email + ' already exists',
        HttpStatus.BAD_REQUEST,
      );
    }

    const newUser = await this.userService.createUser(createUserDto);

    const { id, email, role, firstName, lastName, isActive } = newUser;

    const tokenPair = this.generateTokenPair(id, email, role);

    await this.saveTokenPair(tokenPair, id);
    return {
      user: { id, email, role, firstName, lastName, isActive },
      tokenPair: tokenPair,
    };
  }

  async refresh(
    refreshToken: string,
  ): Promise<{ user: Partial<User>; tokenPair: ITokenPair }> {
    const tokenPairFromDb = await this.tokenRepository.findOne({
      where: { refreshToken },
    });

    if (!tokenPairFromDb) {
      throw new UnauthorizedException('UNUTHORIZED');
    }

    const user = await this.userService.getById(tokenPairFromDb.userId);

    if (!user) {
      throw new UnauthorizedException('UNUTHORIZED');
    }
    const { id, email, role, firstName, lastName, isActive } = user;

    const tokenPair = this.generateTokenPair(id, email, role);

    await this.saveTokenPair(tokenPair, id);
    return {
      user: { id, email, role, firstName, lastName, isActive },
      tokenPair: tokenPair,
    };
  }

  async logout(refreshToken: string): Promise<DeleteResult> {
    const tokenId = await this.tokenRepository.findOne({
      where: { refreshToken },
      select: ['id'],
    });

    return await this.tokenRepository.delete(tokenId.id);
  }

  private generateTokenPair(
    userId: number,
    userEmail: string,
    userRole: string,
  ): ITokenPair {
    const accessToken = jwt.sign(
      { id: userId, email: userEmail, role: userRole },
      configs.ACCESS_TOKEN_SECRET,
      { expiresIn: '15m' },
    );
    const refreshToken = jwt.sign(
      { id: userId, email: userEmail, role: userRole },
      configs.REFRESH_TOKEN_SECRET,
      { expiresIn: '14d' },
    );

    return { accessToken, refreshToken };
  }

  private async saveTokenPair(
    tokenPair: ITokenPair,
    userId: number,
  ): Promise<TokenPair> {
    const tokenPairFromDb = await this.tokenRepository.findOne({
      where: { userId },
    });

    if (tokenPairFromDb) {
      tokenPairFromDb.accessToken = tokenPair.accessToken;
      tokenPairFromDb.refreshToken = tokenPair.refreshToken;
      return await this.tokenRepository.save(tokenPairFromDb);
    }

    return await this.tokenRepository.save({ ...tokenPair, userId: userId });
  }
}
