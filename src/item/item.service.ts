import { HttpStatus, HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from './item.entity';
import { Repository } from 'typeorm';
import { CreateItemDto } from './dto/create-item.dto';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(Item) private readonly itemRepository: Repository<Item>,
  ) {}
  async createItem(item: CreateItemDto) {
    const itemFromDb = await this.itemRepository.findOne({
      where: { name: item.name },
    });

    if (itemFromDb) {
      throw new HttpException(
        'Item with this name already exist',
        HttpStatus.BAD_REQUEST,
      );
    }

    return await this.itemRepository.save(item);
  }

  async getAllItems(limit: number, page: number) {
    const result = await this.itemRepository
      .createQueryBuilder('items')
      .limit(limit)
      .offset((page - 1) * limit)
      .getManyAndCount();

    return result;
  }

  async getItemById(id: number) {
    return await this.itemRepository.findOne({ where: { id } });
  }
}
