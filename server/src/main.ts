import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as morgan from 'morgan';
import * as helmet from 'helmet';

import AppModule from './app.module';

async function main(): Promise<void> {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);
  app.useGlobalPipes(
    new ValidationPipe({
      forbidUnknownValues: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.setGlobalPrefix('/api/v1');
  app.use(helmet());
  app.use(morgan('dev'));
  if (configService.get('NODE_ENV') === 'development') {
    app.enableCors();
  }
  await app.listenAsync(+configService.get('APP_PORT', 3000));
}

main().catch(console.error.bind(console));
