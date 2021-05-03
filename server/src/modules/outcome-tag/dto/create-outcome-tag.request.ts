import { IsDefined, IsString, MinLength } from 'class-validator';

export default class CreateOutcomeTagRequest {
  @IsDefined()
  @IsString()
  @MinLength(2)
  value: string;
}
