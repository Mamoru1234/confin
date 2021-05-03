import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import AuthService from '../auth.service';
import { Connection } from 'typeorm';
import UserDao from '../../database/dao/user.dao';
import UserEntity from '../../database/entities/user.entity';

@Injectable()
export default class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    private readonly connection: Connection,
    private readonly userDao: UserDao,
  ) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<UserEntity> {
    const user = await this.userDao.findOne(this.connection.manager, {
      where: {
        email: email,
      },
    });
    if (!user) {
      throw new UnauthorizedException('Email or password invalid');
    }
    const hash = this.authService.hashPassword(user.email, password);
    if (hash !== user.password) {
      throw new UnauthorizedException('Email or password invalid');
    }
    return user;
  }
}
