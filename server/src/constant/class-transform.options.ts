import { ClassTransformOptions } from 'class-transformer';

export const DEFAULT_TRANSFORM_OPTIONS: ClassTransformOptions = {
  excludeExtraneousValues: true,
  strategy: 'excludeAll',
};
