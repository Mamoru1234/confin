import { Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../../decorators/user.decorator';
import UserEntity from '../database/entities/user.entity';

@Controller('auth')
export default class AuthController {
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@User() user: UserEntity): Promise<void> {
    console.log('Login request: ', user);
  }
}
