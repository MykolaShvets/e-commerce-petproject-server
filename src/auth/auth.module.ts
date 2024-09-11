import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { TokenPair } from './token-pair.entity';
import { UserService } from '../user/user.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, UserService],
  imports: [UserModule, TypeOrmModule.forFeature([TokenPair, User])],
  exports: [AuthModule],
})
export class AuthModule {}
