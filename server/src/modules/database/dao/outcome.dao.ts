import { AbstractDao } from './abstract.dao';
import OutcomeEntity from '../entities/outcome.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export default class OutcomeDao extends AbstractDao<OutcomeEntity> {
  target = OutcomeEntity;
}
