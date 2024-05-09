import { Controller, Post, Body } from '@nestjs/common';

import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly _authService: AuthService) {}

  @Post('login')
  async login(@Body() credentials: CreateAuthDto) {
    return this._authService.login(credentials);
  }
}
