import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import AuthController from './auth.controller';
import DatabaseModule from '../database/database.module';

@Module({
  imports: [PassportModule, DatabaseModule],
  controllers: [AuthController],
})
export default class AuthModule {}
