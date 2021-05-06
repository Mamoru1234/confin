import { IsInt, IsOptional, IsPositive } from 'class-validator';
import { Transform } from 'class-transformer';

export class ListOutcomeQuery {
  @IsOptional()
  @Transform(({ value }) => +value)
  @IsInt()
  @IsPositive()
  minTimestamp: number;

  @IsOptional()
  @Transform(({ value }) => +value)
  @IsInt()
  @IsPositive()
  maxTimestamp: number;
}
