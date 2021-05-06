import { EntityTarget } from 'typeorm/common/EntityTarget';
import { EntityManager } from 'typeorm/entity-manager/EntityManager';
import { FindManyOptions } from 'typeorm/find-options/FindManyOptions';
import { DeepPartial, FindConditions, FindOneOptions } from 'typeorm';

export abstract class AbstractDao<T> {
  abstract target: EntityTarget<T>;

  find(txn: EntityManager, options?: FindManyOptions<T>) {
    return txn.getRepository(this.target).find(options);
  }

  delete(txn: EntityManager, criteria: FindConditions<T>) {
    return txn.getRepository(this.target).delete(criteria);
  }

  findOne(txn: EntityManager, options?: FindOneOptions<T>) {
    return txn.getRepository(this.target).findOne(options);
  }

  save(txn: EntityManager, data: DeepPartial<T>) {
    return txn.getRepository(this.target).save(data);
  }

  update(txn: EntityManager, condition: FindConditions<T>, data: DeepPartial<T>) {
    return txn.getRepository(this.target).update(condition, data);
  }
}
