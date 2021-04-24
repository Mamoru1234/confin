import { Controller, Post } from '@nestjs/common';

@Controller()
export default class AuthController {
  @Post('login')
  async login(): Promise<void> {
    console.log('login call');
  }
}
