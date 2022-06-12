import { Injectable } from '@nestjs/common';
import UserEntity from '../database/entities/user.entity';
import CreateOutcomeRequest from './dto/create-outcome.request';
import OutcomeEntity from '../database/entities/outcome.entity';
import TagDao from '../database/dao/tag.dao';
import { Between, In, LessThanOrEqual, MoreThanOrEqual } from 'typeorm';
import TagEntity from '../database/entities/tag.entity';
import OutcomeDao from '../database/dao/outcome.dao';
import { ListOutcomeQuery } from './dto/list-outcome.query';
import UpdateOutcomeRequest from './dto/update-outcome.request';
import { EntityManager } from 'typeorm/entity-manager/EntityManager';
import { FindOptionsWhere } from 'typeorm/find-options/FindOptionsWhere';

@Injectable()
export default class OutcomeService {
  constructor(
    private readonly tagDao: TagDao,
    private readonly entityManager: EntityManager,
    private readonly outcomeDao: OutcomeDao,
  ) {}

  create(
    user: UserEntity,
    request: CreateOutcomeRequest,
  ): Promise<OutcomeEntity> {
    return this.entityManager.transaction(async (txn) => {
      let tags: TagEntity[] = [];
      if (request.tags) {
        tags = await this.tagDao.find(txn, {
          where: {
            namespace: `outcome:${user.id}`,
            id: In(request.tags),
          },
        });
      }
      return this.outcomeDao.save(txn, {
        user,
        amount: request.amount,
        currency: request.currency,
        description: request.description,
        timestamp: request.timestamp,
        tags,
      });
    });
  }

  update(
    user: UserEntity,
    outcomeId: number,
    request: UpdateOutcomeRequest,
  ): Promise<OutcomeEntity> {
    return this.entityManager.transaction(async (txn) => {
      const update: any = {};
      if (request.tags) {
        update.tags = await this.tagDao.find(txn, {
          where: {
            namespace: `outcome:${user.id}`,
            id: In(request.tags),
          },
        });
      }
      (Object.keys(request) as (keyof UpdateOutcomeRequest)[]).forEach(
        (key) => {
          if (request[key] != null) {
            update[key] = request[key] as any;
          }
        },
      );
      await this.outcomeDao.update(
        txn,
        {
          user,
          id: outcomeId,
        },
        update,
      );
      return this.outcomeDao.findOne(txn, {
        where: {
          id: outcomeId,
          user,
        },
        relations: ['tags'],
      });
    });
  }

  listOutcome(
    user: UserEntity,
    query: ListOutcomeQuery,
  ): Promise<OutcomeEntity[]> {
    const where: FindOptionsWhere<OutcomeEntity> = {
      user,
    };
    if (query.minTimestamp) {
      where.timestamp = MoreThanOrEqual(query.minTimestamp);
    }
    if (query.maxTimestamp) {
      if (where.timestamp) {
        where.timestamp = Between(query.minTimestamp, query.maxTimestamp);
      } else {
        where.timestamp = LessThanOrEqual(query.maxTimestamp);
      }
    }
    return this.outcomeDao.find(this.entityManager, {
      where,
      relations: ['tags'],
      order: {
        timestamp: 'ASC',
      },
    });
  }

  async deleteOutcome(user: UserEntity, outcomeId: number): Promise<void> {
    await this.outcomeDao.delete(this.entityManager, {
      user,
      id: outcomeId,
    });
  }
}
