import { ValueTransformer } from 'typeorm';

export class DateTransformer implements ValueTransformer {
  from(value?: string): Date {
    if (value == null) {
      return null;
    }
    return new Date(+value);
  }

  to(value?: Date): string {
    if (value == null) {
      return null;
    }
    console.log('DateTransformer  to', value.getTime().toString());
    return value.getTime().toString();
  }
}

export const DATE_TRANSFORMER_INSTANCE = new DateTransformer();
