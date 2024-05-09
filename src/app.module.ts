import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DATABASE_CONFIG } from './configs/config';
import { entities } from './entities';
import { AuthModule } from './entities/auth/auth.module';
import { UsersModule } from './entities/users/users.module';
import { HttpExceptionFilter } from './filters/httpException.filter';
import { TypeOrmExceptionFilter } from './filters/typeOrmException.filter';
import { ValidationExceptionFilter } from './filters/validationException.filter';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    TypeOrmModule.forRoot({
      ...DATABASE_CONFIG,
      entities,
    }),
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
