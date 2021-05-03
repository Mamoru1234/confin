import { Module } from '@nestjs/common';
import DatabaseModule from '../database/database.module';
import OutcomeService from './outcome.service';
import OutcomeController from './outcome.controller';

@Module({
  imports: [DatabaseModule],
  providers: [OutcomeService],
  controllers: [OutcomeController],
})
export default class OutcomeModule {}
