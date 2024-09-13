import { HttpStatus, HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from './item.entity';
import { Repository } from 'typeorm';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Brand } from './brand.entity';
import { Color } from './color.entity';
import { Category } from './category.entity';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(Item) private readonly itemRepository: Repository<Item>,
    @InjectRepository(Brand)
    private readonly brandRepository: Repository<Brand>,
    @InjectRepository(Color)
    private readonly colorRepository: Repository<Color>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
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

  async updateItem(itemDto: UpdateItemDto) {
    const itemFromDb = await this.itemRepository.findOne({
      where: { id: itemDto.id },
    });

    if (!itemFromDb) {
      throw new HttpException(
        'Item with id ' + itemDto.id + ' not found',
        HttpStatus.NOT_FOUND,
      );
    }

    Object.assign(itemFromDb, itemDto);

    return await this.itemRepository.save(itemFromDb);
  }

  async deleteItem(id: number) {
    const itemFromDb = await this.itemRepository.findOne({ where: { id } });
    if (!itemFromDb) {
      throw new HttpException(
        'Item with id ' + id + ' not found',
        HttpStatus.NOT_FOUND,
      );
    }
    return this.itemRepository.delete(itemFromDb);
  }

  async createCategry(category: string) {
    const categoryFromDb = await this.categoryRepository.findOne({
      where: { name: category },
    });

    if (!categoryFromDb) {
      await this.categoryRepository.save({ name: category });
    }
  }
  async createColor(color: string) {
    const colorFromDb = await this.colorRepository.findOne({
      where: { name: color },
    });

    if (!colorFromDb) {
      await this.colorRepository.save({ name: color });
    }
  }

  async createBrand(brand: string) {
    const brandFromDb = await this.brandRepository.findOne({
      where: { name: brand },
    });

    if (!brandFromDb) {
      await this.brandRepository.save({ name: brand });
    }
  }
}
