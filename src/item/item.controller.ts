import { Controller, Get, Query } from '@nestjs/common';
import { ItemService } from './item.service';

@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Get()
  async getAllItems(@Query('limit') limit: any, @Query('page') page: any) {
    return await this.itemService.getAllItems(+limit, +page);
  }
}
