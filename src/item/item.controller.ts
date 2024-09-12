import {
  Controller,
  Get,
  Post,
  Query,
  Body,
  Put,
  Param,
  UseGuards,
  Delete,
} from '@nestjs/common';
import { ItemService } from './item.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { AdminGuard } from 'src/auth/guards/admin.guard';

@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Get()
  async getAllItems(@Query('limit') limit: any, @Query('page') page: any) {
    return await this.itemService.getAllItems(+limit, +page);
  }

  @UseGuards(AuthGuard, AdminGuard)
  @Post()
  async createItem(@Body() itemDto: CreateItemDto) {
    return await this.itemService.createItem(itemDto);
  }

  @UseGuards(AuthGuard, AdminGuard)
  @Put()
  async updateItem(@Body() itemDto: UpdateItemDto) {
    return await this.itemService.updateItem(itemDto);
  }

  @UseGuards(AuthGuard, AdminGuard)
  @Delete(':itemId')
  async deleteItem(@Param('itemId') id: string) {
    return await this.itemService.deleteItem(+id);
  }
}
