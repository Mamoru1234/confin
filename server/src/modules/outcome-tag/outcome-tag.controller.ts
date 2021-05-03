import { BadRequestException, Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { User } from '../../decorators/user.decorator';
import UserEntity from '../database/entities/user.entity';
import { OutcomeTagResponse } from './dto/outcome-tag.response';
import CreateOutcomeTagRequest from './dto/create-outcome-tag.request';
import OutcomeTagService from './outcome-tag.service';
import { plainToClass } from 'class-transformer';
import { DEFAULT_TRANSFORM_OPTIONS } from '../../constant/class-transform.options';
import AppAuthGuard from '../../guards/app-auth.guard';

@Controller('outcome-tag')
@UseGuards(AppAuthGuard)
export default class OutcomeTagController {
  constructor(private readonly outcomeTagService: OutcomeTagService) {}

  @Get('list')
  async listTags(@User() user: UserEntity): Promise<OutcomeTagResponse[]> {
    const tags = await this.outcomeTagService.listTags(user);
    return plainToClass(OutcomeTagResponse, tags, DEFAULT_TRANSFORM_OPTIONS);
  }

  @Post()
  async createTag(
    @Body() request: CreateOutcomeTagRequest,
    @User() user: UserEntity,
  ): Promise<OutcomeTagResponse> {
    const tag = await this.outcomeTagService.createTag(user, request);
    return plainToClass(OutcomeTagResponse, tag, DEFAULT_TRANSFORM_OPTIONS);
  }

  @Delete('/:tagId')
  async deleteTag(
    @User() user: UserEntity,
    @Param('tagId') tagId: string,
  ): Promise<void> {
    if (Number.isNaN(+tagId)) {
      throw new BadRequestException('Invalid tag id');
    }
    await this.outcomeTagService.deleteTag(user, +tagId);
  }
}
