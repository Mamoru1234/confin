import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import AuthController from './auth.controller';
import DatabaseModule from '../database/database.module';
import AuthService from './auth.service';
import LocalStrategy from './strategy/local.strategy';

@Module({
  imports: [PassportModule, DatabaseModule],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy],
})
export default class AuthModule {}
