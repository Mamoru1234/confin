import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import AuthModule from './modules/auth/auth.module';
import RedisModule from './modules/redis/redis.module';
import OutcomeTagModule from './modules/outcome-tag/outcome-tag.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    AuthModule,
    RedisModule,
    OutcomeTagModule,
  ],
})
export default class AppModule {}
