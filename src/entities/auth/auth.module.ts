import { Global, Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CLIENT_SECRET } from 'src/configs/config';

import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthGuard } from './auth.quard';
import { AuthService } from './auth.service';
import { Auth } from './entities/auth.entity';

@Global()
@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forFeature([Auth]),
    JwtModule.register({
      global: true,
      secret: CLIENT_SECRET,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtService, AuthGuard],
  exports: [AuthGuard, AuthService],
})
export class AuthModule {
  static forRoot() {
    return {
      module: AuthModule,
      providers: [AuthModule],
      exports: [AuthModule],
    };
  }
}
