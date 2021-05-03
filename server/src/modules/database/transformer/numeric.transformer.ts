import { ValueTransformer } from 'typeorm';

export class NumericTransformer implements ValueTransformer {
  from(value?: string): number {
    if (value == null) {
      return value as any;
    }
    return +value;
  }

  to(value: any): string {
    if (typeof value === 'object') {
      return value;
    }
    if (value == null) {
      return value as any;
    }
    return value + '';
  }
}

export const NUMERIC_TRANSFORMER_INSTANCE = new NumericTransformer();
