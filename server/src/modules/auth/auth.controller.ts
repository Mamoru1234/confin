import { Controller, Get, Post, Session, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../../decorators/user.decorator';
import UserEntity from '../database/entities/user.entity';
import { UserSession } from '../../constant/user-session';
import AppAuthGuard from '../../guards/app-auth.guard';

@Controller('auth')
export default class AuthController {
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(
    @Session() session: UserSession,
    @User() user: UserEntity,
  ): Promise<void> {
    console.log('Login request: ', user);
    session.userId = user.id;
  }

  @Get('me')
  @UseGuards(AppAuthGuard)
  async getMe(
    @Session() session: UserSession,
    @User() user: UserEntity,
  ): Promise<void> {
    console.log('me: ', session, user);
  }
}
