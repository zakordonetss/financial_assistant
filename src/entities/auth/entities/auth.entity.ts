import { User } from 'src/entities/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Auth {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.auth)
  user: User;

  @Column()
  accessToken: string;

  @Column()
  refreshToken: string;

  @Column()
  expiresIn: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  constructor({
    id,
    user,
    accessToken,
    refreshToken,
    expiresIn,
  }: Partial<Auth> = {}) {
    this.id = id;
    this.user = user;
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    this.expiresIn = expiresIn;
  }
}
