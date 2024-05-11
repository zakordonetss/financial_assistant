import { Auth } from 'src/entities';
import { Account } from 'src/entities';
import { DB_TABLE_NAMES } from 'src/globals/configs/config';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';

@Entity({ name: DB_TABLE_NAMES.users })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  email?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @DeleteDateColumn()
  deletedAt?: Date;

  @OneToMany(() => Auth, (auth) => auth.user)
  auth: Auth[];

  @OneToMany(() => Account, (account) => account.user)
  account: Account[];
}
