import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Auth } from './entities/auth.entity';

@Module({
  imports: [UsersModule, TypeOrmModule.forFeature([Auth])],
  controllers: [AuthController],
  providers: [AuthService, JwtService],
})
export class AuthModule {}
