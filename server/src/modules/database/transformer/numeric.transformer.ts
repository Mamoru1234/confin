import { ValueTransformer } from 'typeorm';

export class NumericTransformer implements ValueTransformer {
  from(value?: string): number {
    if (value == null) {
      return value as any;
    }
    return +value;
  }

  to(value?: number): string {
    if (value == null) {
      return value as any;
    }
    return value + '';
  }
}

export const NUMERIC_TRANSFORMER_INSTANCE = new NumericTransformer();
