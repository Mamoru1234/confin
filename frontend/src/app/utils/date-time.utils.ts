import { DateTime } from 'luxon';

export function zeroPadding(value: number): string {
  return `00${value}`.slice(-2);
}
export function formatDateTime(date: string, time?: string): DateTime {
  console.log(date, time);
  if (!time) {
    return DateTime.fromSQL(date);
  }
  return DateTime.fromSQL(`${date} ${time}:00`);
}
