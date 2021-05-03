import { AbstractDao } from './abstract.dao';
import UserEntity from '../entities/user.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export default class UserDao extends AbstractDao<UserEntity> {
  target = UserEntity;
}
