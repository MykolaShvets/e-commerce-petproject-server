import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
