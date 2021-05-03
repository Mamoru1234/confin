import { EntityTarget } from 'typeorm/common/EntityTarget';
import { EntityManager } from 'typeorm/entity-manager/EntityManager';
import { FindManyOptions } from 'typeorm/find-options/FindManyOptions';
import { DeepPartial, FindOneOptions } from 'typeorm';

export abstract class AbstractDao<T> {
  abstract target: EntityTarget<T>;
  
  find(txn: EntityManager, options?: FindManyOptions<T>) {
    return txn.getRepository(this.target).find(options);
  }

  findOne(txn: EntityManager, options?: FindOneOptions<T>) {
    return txn.getRepository(this.target).findOne(options);
  }

  save(txn: EntityManager, data: DeepPartial<T>) {
    return txn.getRepository(this.target).save(data);
  }
}
