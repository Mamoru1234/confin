import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import AuthService from '../auth.service';
import UserDao from '../../database/dao/user.dao';
import UserEntity from '../../database/entities/user.entity';
import { EntityManager } from 'typeorm/entity-manager/EntityManager';

@Injectable()
export default class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    private readonly entityManager: EntityManager,
    private readonly userDao: UserDao,
  ) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<UserEntity> {
    const user = await this.userDao.findOne(this.entityManager, {
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
