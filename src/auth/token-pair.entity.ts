import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../user/user.entity';

@Entity({ name: 'tokens' })
export class TokenPair {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  accessToken: string;
  @Column()
  refreshToken: string;
  @OneToOne(() => User, { eager: true })
  @JoinColumn({ name: 'userId' })
  userId: number;
}
