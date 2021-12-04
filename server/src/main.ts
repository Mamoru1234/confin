import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as morgan from 'morgan';
import * as helmet from 'helmet';
import * as session from 'express-session';
import * as connectRedis from 'connect-redis';

import AppModule from './app.module';
import { REDIS_CLIENT } from './modules/redis/redis.module';

async function main(): Promise<void> {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);
  const RedisStore = connectRedis(session);
  app.useGlobalPipes(
    new ValidationPipe({
      forbidUnknownValues: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.use(
    session({
      secret: configService.get('SESSION_SECRET'),
      store: new RedisStore({
        client: app.get(REDIS_CLIENT),
      }),
      cookie: {
        httpOnly: true,
        secure: false,
        maxAge: 1000 * 60 * 60 * 24 * 2,
      },
      saveUninitialized: false,
      resave: false,
      rolling: true,
    }),
  );
  app.setGlobalPrefix('/api/v1');
  app.use(helmet());
  app.use(morgan('dev'));
  if (configService.get('NODE_ENV') === 'development') {
    app.enableCors({
      origin: [configService.get('CORS_ORIGIN', 'http://localhost:4200')],
      credentials: true,
    });
  }
  await app.listenAsync(+configService.get('APP_PORT', 3000));
}

main().catch(console.error.bind(console));
