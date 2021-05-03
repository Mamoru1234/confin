import { Expose } from 'class-transformer';

export class OutcomeTagResponse {
  @Expose()
  id: number;

  @Expose()
  value: string;
}
