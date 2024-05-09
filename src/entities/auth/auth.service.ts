import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { compare } from 'bcrypt';
import { randomBytes } from 'crypto';
import { CLIENT_SECRET } from 'src/configs/config';
import { Repository } from 'typeorm';

import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { Auth } from './entities/auth.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly _jwtService: JwtService,
    private readonly _usersService: UsersService,

    @InjectRepository(Auth)
    private readonly _usersRepository: Repository<Auth>,
  ) {}

  public async login(
    credentials: CreateAuthDto,
  ): Promise<Pick<Auth, 'accessToken' | 'refreshToken'>> {
    const { username, password } = credentials;
    const user = await this._validateUser(username, password);
    const accessToken = this._generateAccessToken(user);
    const refreshToken = this._generateRefreshToken();
    await this._saveAuthData(user, accessToken, refreshToken);
    return { accessToken, refreshToken };
  }

  private async _validateUser(
    username: string,
    password: string,
  ): Promise<User> {
    const user = await this._usersService.findOneByUsername(username);
    const isPasswordValid = user?.password
      ? await compare(password, user?.password)
      : false;
    if (!user || !isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return user;
  }

  private _generateAccessToken(user: User): string {
    const payload = { username: user.username, sub: user.id };
    return this._jwtService.sign(payload, { secret: CLIENT_SECRET });
  }

  private _generateRefreshToken(): string {
    return randomBytes(64).toString('hex');
  }

  private async _saveAuthData(
    user: User,
    accessToken: string,
    refreshToken: string,
  ): Promise<Auth> {
    return this._usersRepository.save<Auth>(
      new Auth({ user, accessToken, refreshToken, expiresIn: 1000 }),
    );
  }
}
