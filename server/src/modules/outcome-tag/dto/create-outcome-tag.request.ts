import { IsDefined, IsString, MaxLength, MinLength } from 'class-validator';

export default class CreateOutcomeTagRequest {
  @IsDefined()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  value: string;
}
