import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TokenPair } from '../auth/token-pair.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ default: 'Jon' })
  firstName: string;
  @Column({ default: 'Dou' })
  lastName: string;
  @Column({ unique: true, nullable: false })
  email: string;
  @Column({ select: false })
  password: string;
  @Column({ default: 'customer' })
  role: string;
  @Column({ default: true })
  isActive: boolean;
}
