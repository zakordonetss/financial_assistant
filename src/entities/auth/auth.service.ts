import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/entities/users/users.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { User } from 'src/entities/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly _jwtService: JwtService,
    private readonly _usersService: UsersService,
  ) {}

  public async login(credentials: CreateAuthDto) {
    const { username, password } = credentials;
    const user = await this._validateUser(username, password);
    const accessToken = await this._login(user);
    return this._validateToken(accessToken);
  }

  private async _validateUser(
    username: string,
    password: string,
  ): Promise<User> {
    const user = await this._usersService.findOneByUsername(username);
    if (!user || !(user.password === password)) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return user;
  }

  private async _login(user: any): Promise<string> {
    const payload = { username: user.username, sub: user.userId };
    return this._jwtService.sign(payload);
  }

  private async _validateToken(token: string) {
    try {
      const decoded = this._jwtService.verify(token);
      return decoded;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
