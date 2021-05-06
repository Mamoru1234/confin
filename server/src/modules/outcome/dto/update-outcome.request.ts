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

export default class UpdateOutcomeRequest {
  @IsOptional()
  @IsInt()
  @IsPositive()
  amount?: number;

  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(10)
  currency?: string;

  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(1000)
  description?: string;

  @IsOptional()
  @IsInt()
  @IsPositive()
  @Min(10000)
  timestamp?: number;

  @IsOptional()
  @IsArray()
  @IsInt({
    each: true,
  })
  @IsPositive({
    each: true,
  })
  tags?: number[];
}
