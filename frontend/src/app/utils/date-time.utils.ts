export function zeroPadding(value: number): string {
  return `00${value}`.slice(-2);
}
export function formatDateTime(date: string, time?: string): Date {
  const [year, month, day] = date.split('-').map((it: string) => +it);
  if (!time) {
    return new Date(year, month, day);
  }
  const [hour, minute] = time.split(':').map((it: string) => +it);
  return new Date(year, month, day, hour, minute);
}
