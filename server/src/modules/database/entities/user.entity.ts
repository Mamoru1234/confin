import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UserRole } from '../../../constant/user-role.enum';
import { NUMERIC_TRANSFORMER_INSTANCE } from '../transformer/numeric.transformer';

@Entity('users')
export default class UserEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column({
    enum: UserRole,
  })
  role!: UserRole;

  @Column()
  email!: string;

  @Column('bigint', {
    transformer: NUMERIC_TRANSFORMER_INSTANCE,
    default: 0,
  })
  lastForgotPassRequest: number;

  @Column()
  password!: string;
}
