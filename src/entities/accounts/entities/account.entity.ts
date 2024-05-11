import { User } from 'src/entities';
import { DB_TABLE_NAMES } from 'src/globals/configs/config';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity({ name: DB_TABLE_NAMES.accounts })
export class Account {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'name' })
  name: string;

  @Column({
    name: 'balance',
    type: 'decimal',
    precision: 12,
    scale: 2,
    default: 0.0,
  })
  balance: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => User, (user) => user.account)
  @JoinColumn({ name: 'userId' })
  user: User;

  constructor({ id, user, name, balance }: Partial<Account> = {}) {
    this.id = id;
    this.user = user;
    this.name = name;
    this.balance = balance;
  }
}
