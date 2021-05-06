import {
  IsArray,
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export default class CreateOutcomeRequest {
  @IsInt()
  @IsPositive()
  amount: number;

  @IsString()
  @MinLength(2)
  @MaxLength(10)
  currency: string;

  @IsString()
  @MinLength(2)
  @MaxLength(1000)
  description: string;

  @IsInt()
  @IsPositive()
  @Min(10000)
  timestamp: number;

  @IsOptional()
  @IsArray()
  @IsInt({
    each: true,
  })
  @IsPositive({
    each: true,
  })
  tags: number[];
}
