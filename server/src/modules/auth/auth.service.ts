import { Injectable } from '@nestjs/common';
import { createHmac } from 'crypto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export default class AuthService {
  constructor(private readonly configService: ConfigService) {}

  hashPassword(email: string, password: string): string {
    const hash = createHmac(
      'sha512',
      this.configService.get('APP_PASS_SECRET'),
    );
    hash.update(email);
    hash.update(password);
    return hash.digest().toString('base64');
  }
}
