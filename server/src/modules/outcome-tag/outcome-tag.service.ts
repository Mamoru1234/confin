import { Injectable } from '@nestjs/common';
import TagEntity from '../database/entities/tag.entity';
import CreateOutcomeTagRequest from './dto/create-outcome-tag.request';
import TagDao from '../database/dao/tag.dao';
import { Connection } from 'typeorm';
import UserEntity from '../database/entities/user.entity';

@Injectable()
export default class OutcomeTagService {
  constructor(
    private readonly tagDao: TagDao,
    private readonly connection: Connection,
  ) {}

  createTag(
    user: UserEntity,
    request: CreateOutcomeTagRequest,
  ): Promise<TagEntity> {
    return this.tagDao.save(this.connection.manager, {
      value: request.value,
      namespace: `outcome:${user.id}`,
    });
  }

  listTags(user: UserEntity): Promise<TagEntity[]> {
    return this.tagDao.find(this.connection.manager, {
      where: {
        namespace: `outcome:${user.id}`,
      },
    });
  }

  async deleteTag(user: UserEntity, tagId: number): Promise<void> {
    await this.tagDao.delete(this.connection.manager, {
      namespace: `outcome:${user.id}`,
      id: tagId,
    });
  }
}
