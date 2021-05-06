import { AbstractDao } from './abstract.dao';
import TagEntity from '../entities/tag.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export default class TagDao extends AbstractDao<TagEntity> {
  target = TagEntity;
}
