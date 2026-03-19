export interface TransactionDto {
  id: string;
  createdAt: string;
  amount: number;
  transactionType: number;
}

export interface ProfileTransaction {
  id: string;
  date: string;
  amount: number;
  type: 'income' | 'expense';
  label: string;
  description: string;
}
