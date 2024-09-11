import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async getByEmail(email: string) {
    return await this.userRepository.findOne({ where: { email } });
  }

  async getById(id: number) {
    return await this.userRepository.findOne({ where: { id } });
  }

  async createUser(createUserDto: CreateUserDto) {
    const userFromDb = await this.getByEmail(createUserDto.email);
    if (userFromDb) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    const hashPass = await bcrypt.hash(createUserDto.password, 10);

    const newUser = await this.userRepository.save({
      ...createUserDto,
      password: hashPass,
    });

    return newUser;
  }

  async getAll() {
    return await this.userRepository.find();
  }
}
