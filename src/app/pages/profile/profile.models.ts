import { TransactionType } from '../../core/constants/transaction-type.enum';

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
  type: TransactionType;
  label: string;
  description: string;
  amountPrefix: '+' | '';
  amountClass: 'income' | 'neutral';
  icon: 'up' | 'neutral';
}
