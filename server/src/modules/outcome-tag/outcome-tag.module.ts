import { Module } from '@nestjs/common';
import DatabaseModule from '../database/database.module';
import OutcomeTagService from './outcome-tag.service';
import OutcomeTagController from './outcome-tag.controller';

@Module({
  imports: [DatabaseModule],
  providers: [OutcomeTagService],
  controllers: [OutcomeTagController],
})
export default class OutcomeTagModule {}
