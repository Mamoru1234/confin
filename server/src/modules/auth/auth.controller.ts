import {
  Controller,
  Get,
  Post,
  Session as SessionDec,
  UseGuards,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { Session } from 'express-session';
import { promisify } from 'util';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../../decorators/user.decorator';
import UserEntity from '../database/entities/user.entity';
import { UserSession } from '../../constant/user-session';
import AppAuthGuard from '../../guards/app-auth.guard';
import UserResponse from '../../dto/user.response';
import { DEFAULT_TRANSFORM_OPTIONS } from '../../constant/class-transform.options';

@Controller('auth')
export default class AuthController {
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(
    @SessionDec() session: UserSession,
    @User() user: UserEntity,
  ): Promise<void> {
    console.log('Login request: ', user);
    session.userId = user.id;
  }

  @Get('me')
  @UseGuards(AppAuthGuard)
  async getMe(@User() user: UserEntity): Promise<UserResponse> {
    return plainToClass(UserResponse, user, DEFAULT_TRANSFORM_OPTIONS);
  }

  @Post('logout')
  @UseGuards(AppAuthGuard)
  logout(@SessionDec() session: Session) {
    return promisify(session.destroy.bind(session))();
  }
}
