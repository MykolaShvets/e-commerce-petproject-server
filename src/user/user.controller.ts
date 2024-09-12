import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { AdminGuard } from 'src/auth/guards/admin.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get(':id')
  async getById(@Param('id') id: string) {
    return await this.userService.getById(+id);
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.userService.createUser(createUserDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  async getAll() {
    return await this.userService.getAll();
  }

  @Put()
  @UseGuards(AuthGuard, AdminGuard)
  async updateUser(@Body() updateUserDto: UpdateUserDto) {
    return await this, this.userService.updateUser(updateUserDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async deleteUser(@Param('id') id: string) {
    return await this.userService.deleteUser(+id);
  }
}
