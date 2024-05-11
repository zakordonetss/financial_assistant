import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { entities } from './entities';
import { AccountsModule } from './entities/accounts/accounts.module';
import { AuthModule } from './entities/auth/auth.module';
import { UsersModule } from './entities/users/users.module';
import { DATABASE_CONFIG } from './globals/configs/config';
import { HttpExceptionFilter } from './globals/filters/httpException.filter';
import { TypeOrmExceptionFilter } from './globals/filters/typeOrmException.filter';
import { ValidationExceptionFilter } from './globals/filters/validationException.filter';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    TypeOrmModule.forRoot({
      ...DATABASE_CONFIG,
      entities,
    }),
    AccountsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: ValidationExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: TypeOrmExceptionFilter,
    },
  ],
})
export class AppModule {}
