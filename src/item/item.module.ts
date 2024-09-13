import { Module } from '@nestjs/common';
import { ItemController } from './item.controller';
import { ItemService } from './item.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './item.entity';
import { Brand } from './brand.entity';
import { Color } from './color.entity';
import { Category } from './category.entity';

@Module({
  controllers: [ItemController],
  providers: [ItemService],
  imports: [TypeOrmModule.forFeature([Item, Brand, Color, Category])],
})
export class ItemModule {}
