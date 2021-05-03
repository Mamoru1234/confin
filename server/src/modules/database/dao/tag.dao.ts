import { AbstractDao } from './abstract.dao';
import TagEntity from '../entities/tag.entity';

export default class TagDao extends AbstractDao<TagEntity> {
  target = TagEntity;
}
