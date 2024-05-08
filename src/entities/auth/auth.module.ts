import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersService } from 'src/entities/users/users.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtService, UsersService],
})
export class AuthModule {}
