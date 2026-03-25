import { TransactionType } from './transaction-type.enum';

export type TransactionPresentation = {
  type: TransactionType;
  label: string;
  description: string;
  amountPrefix: '+' | '';
  amountClass: 'income' | 'neutral';
  icon: 'up' | 'neutral';
};

export const TRANSACTION_PRESENTATION_MAP: Record<number, TransactionPresentation> = {
  0: {
    type: TransactionType.Unspecified,
    label: 'Transaction',
    description: 'Transaction type is not specified',
    amountPrefix: '',
    amountClass: 'neutral',
    icon: 'neutral',
  },
  1: {
    type: TransactionType.AddForParticipatingInEvent,
    label: 'Accrual',
    description: 'Participation in an event',
    amountPrefix: '+',
    amountClass: 'income',
    icon: 'up',
  },
};

export const DEFAULT_TRANSACTION_PRESENTATION: TransactionPresentation = {
  type: TransactionType.Unspecified,
  label: 'Transaction',
  description: 'Transaction type is not specified',
  amountPrefix: '',
  amountClass: 'neutral',
  icon: 'neutral',
};
