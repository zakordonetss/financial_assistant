import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Auth {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number; // Посилання на ідентифікатор користувача

  @Column()
  accessToken: string; // JWT токен доступу

  @Column()
  refreshToken: string; // Токен оновлення

  @Column()
  expiresIn: number; // Термін дії токенів (у секундах)

  @CreateDateColumn()
  createdAt: Date; // Дата та час створення запису

  @UpdateDateColumn()
  updatedAt: Date; // Дата та час оновлення запису
}
