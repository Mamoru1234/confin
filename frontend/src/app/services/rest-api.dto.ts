export interface TagResponse {
  id: number;
  value: string;
}

export interface ExpenseResponse {
  id: number;
  amount: number;
  currency: string;
  description: string;
  tags: number[];
}
