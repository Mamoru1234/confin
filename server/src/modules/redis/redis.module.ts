import { createClient } from 'redis';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export const REDIS_CLIENT = Symbol('REDIS_CLIENT');

@Module({
  providers: [
    {
      provide: REDIS_CLIENT,
      useFactory: (configService: ConfigService) => {
        const port = +configService.get('REDIS_PORT', 6379);
        const host = configService.get('REDIS_HOST', 'localhost');
        return createClient(port, host);
      },
      inject: [ConfigService],
    },
  ],
  exports: [REDIS_CLIENT],
})
export default class RedisModule {}
