import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import TagEntity from './tag.entity';
import UserEntity from './user.entity';
import { NUMERIC_TRANSFORMER_INSTANCE } from '../transformer/numeric.transformer';

@Entity('outcome_item')
export default class OutcomeEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  amount: number;

  @Column()
  currency: string;

  @Column()
  description: string;

  @ManyToOne(() => UserEntity)
  @JoinColumn({
    name: 'user_id',
  })
  user: UserEntity;

  @Column('bigint', {
    transformer: NUMERIC_TRANSFORMER_INSTANCE,
  })
  timestamp: number;

  @ManyToMany(() => TagEntity)
  @JoinTable({
    name: 'outcome_item_tags',
    joinColumns: [
      {
        name: 'outcome_item_id',
      },
    ],
    inverseJoinColumns: [
      {
        name: 'tag_id',
      },
    ],
  })
  tags: TagEntity[];
}
