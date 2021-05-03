import { Expose } from 'class-transformer';
import { UserRole } from '../constant/user-role.enum';

export default class UserResponse {
  @Expose()
  id!: number;

  @Expose()
  firstName!: string;

  @Expose()
  lastName!: string;

  @Expose()
  role!: UserRole;

  @Expose()
  email!: string;
}
