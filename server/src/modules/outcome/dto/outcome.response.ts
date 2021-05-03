import { Expose, Transform } from 'class-transformer';

export default class OutcomeResponse {
  @Expose()
  id: number;

  @Expose()
  amount: number;

  @Expose()
  currency: string;

  @Expose()
  description: string;

  @Expose()
  @Transform(({ obj, key }) => {
    const value = obj[key];
    if (!value) {
      return null;
    }
    return value.map((it) => it.id);
  })
  tags: number[];
}
