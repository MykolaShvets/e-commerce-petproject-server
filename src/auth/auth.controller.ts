import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { Request, Response } from 'express';
import { AuthGuard } from './guards/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { user, tokenPair } = await this.authService.login(loginDto);
    res.cookie('refreshToken', tokenPair.refreshToken);
    return { user, token: tokenPair.accessToken };
  }

  @Post('registration')
  async registration(
    @Body() userDto: CreateUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { user, tokenPair } = await this.authService.registration(userDto);
    res.cookie('refreshToken', tokenPair.refreshToken);
    return { user, token: tokenPair.accessToken };
  }

  @Post('refresh')
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const token = req.cookies['refreshToken'];
    const { user, tokenPair } = await this.authService.refresh(token);
    res.cookie('refreshToken', tokenPair.refreshToken);
    return { user, token: tokenPair.accessToken };
  }

  @Post('logout')
  @UseGuards(AuthGuard)
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const refreshToken = req.cookies['refreshToken'];
    await this.authService.logout(refreshToken);
    return res.cookie('refreshToken', '', { maxAge: 0 });
  }
}
