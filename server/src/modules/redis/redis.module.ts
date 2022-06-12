import { createClient } from 'redis';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export const REDIS_CLIENT = Symbol('REDIS_CLIENT');

@Module({
  providers: [
    {
      provide: REDIS_CLIENT,
      useFactory: async (configService: ConfigService) => {
        const port = +configService.get('REDIS_PORT', 6379);
        const host = configService.get('REDIS_HOST', 'localhost');
        const client = createClient({
          url: `redis://${host}:${port}`,
          legacyMode: true, // needed for session store
        });
        await client.connect();
        return client;
      },
      inject: [ConfigService],
    },
  ],
  exports: [REDIS_CLIENT],
})
export default class RedisModule {}
