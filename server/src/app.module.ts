import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import AuthModule from './modules/auth/auth.module';
import RedisModule from './modules/redis/redis.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    AuthModule,
    RedisModule,
  ],
})
export default class AppModule {}
