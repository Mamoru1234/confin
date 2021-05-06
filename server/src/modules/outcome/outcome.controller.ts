import { Body, Controller, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { User } from '../../decorators/user.decorator';
import AppAuthGuard from '../../guards/app-auth.guard';
import UserEntity from '../database/entities/user.entity';
import CreateOutcomeRequest from './dto/create-outcome.request';
import OutcomeResponse from './dto/outcome.response';
import OutcomeService from './outcome.service';
import { plainToClass } from 'class-transformer';
import { DEFAULT_TRANSFORM_OPTIONS } from '../../constant/class-transform.options';
import { ListOutcomeQuery } from './dto/list-outcome.query';

@Controller('outcome')
@UseGuards(AppAuthGuard)
export default class OutcomeController {
  constructor(private readonly outcomeService: OutcomeService) {}

  @Post()
  async createOutcome(
    @User() user: UserEntity,
    @Body() request: CreateOutcomeRequest,
  ): Promise<OutcomeResponse> {
    const outcome = await this.outcomeService.create(user, request);
    return plainToClass(OutcomeResponse, outcome, DEFAULT_TRANSFORM_OPTIONS);
  }

  @Put('/:outcomeId')
  async updateOutcome(
    @User() user: UserEntity,
    @Body() request: CreateOutcomeRequest,
    @Param('outcomeId') outcomeId: string,
  ): Promise<OutcomeResponse> {
    const outcome = await this.outcomeService.update(user, +outcomeId, request);
    return plainToClass(OutcomeResponse, outcome, DEFAULT_TRANSFORM_OPTIONS);
  }

  @Get('list')
  async listOutcome(
    @User() user: UserEntity,
    @Query() query: ListOutcomeQuery,
  ): Promise<OutcomeResponse[]> {
    const outcomes = await this.outcomeService.listOutcome(user, query);
    return plainToClass(OutcomeResponse, outcomes, DEFAULT_TRANSFORM_OPTIONS);
  }
}
