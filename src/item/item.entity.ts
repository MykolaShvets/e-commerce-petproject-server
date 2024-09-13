import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from './category.entity';
import { Color } from './color.entity';
import { Brand } from './brand.entity';

@Entity({ name: 'items' })
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, type: 'varchar', unique: true })
  name: string;

  @Column()
  description: string;

  @Column({ nullable: false, default: 1 })
  price: number;

  @Column()
  sales: number;

  @Column({ default: 0 })
  rate: number;

  @Column()
  amount: number;

  @Column()
  imageUrl: string;

  @ManyToMany(() => Category, (categories) => categories)
  @JoinColumn()
  categories: Category[];

  @ManyToMany(() => Color, (colors) => colors)
  @JoinColumn()
  colors: Color[];

  @ManyToOne(() => Brand, (brand) => brand)
  @JoinColumn()
  brand: Brand;
}
