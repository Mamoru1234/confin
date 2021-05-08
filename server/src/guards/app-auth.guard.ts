import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserSession } from '../constant/user-session';
import UserDao from '../modules/database/dao/user.dao';
import { Connection } from 'typeorm';

@Injectable()
export default class AppAuthGuard implements CanActivate {
  constructor(
    private readonly userDao: UserDao,
    private readonly connection: Connection,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    if (!req.session || !req.session.userId) {
      throw new UnauthorizedException('No user in session');
    }
    const userSession: UserSession = req.session;
    const user = await this.userDao.findOne(this.connection.manager, {
      where: {
        id: userSession.userId,
      },
    });
    if (!user) {
      throw new UnauthorizedException('Invalid user in session');
    }
    req.user = user;
    return true;
  }
}
