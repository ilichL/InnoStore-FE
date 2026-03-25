import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';

import { TransactionsContent } from '../../components/transactions-content/transactions-content';
import {
  DEFAULT_TRANSACTION_PRESENTATION,
  TRANSACTION_PRESENTATION_MAP,
} from '../../core/constants/transaction-presentation.constants';
import { ProfileTransaction, TransactionDto } from './profile.models';
import { ProfileTransactionsService } from './profile-transactions.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, TransactionsContent],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile {
  private readonly profileTransactionsService = inject(ProfileTransactionsService);

  protected readonly transactions = signal<ProfileTransaction[]>([]);
  protected readonly isLoading = signal(false);
  protected readonly hasError = signal(false);

  constructor() {
    this.loadTransactions();
  }

  private loadTransactions(): void {
    this.isLoading.set(true);
    this.hasError.set(false);

    this.profileTransactionsService.getTransactions().subscribe({
      next: (response: TransactionDto[]) => {
        this.transactions.set(response.map((transaction) => this.mapTransaction(transaction)));
        this.isLoading.set(false);
      },
      error: (error: unknown) => {
        console.error('FAILED TO LOAD TRANSACTIONS:', error);
        this.transactions.set([]);
        this.hasError.set(true);
        this.isLoading.set(false);
      },
    });
  }

  private mapTransaction(transaction: TransactionDto): ProfileTransaction {
    const presentation = this.getTransactionPresentation(transaction.transactionType);

    return {
      id: transaction.id,
      date: this.formatDate(transaction.createdAt),
      amount: transaction.amount,
      type: presentation.type,
      label: presentation.label,
      description: presentation.description,
      amountPrefix: presentation.amountPrefix,
      amountClass: presentation.amountClass,
      icon: presentation.icon,
    };
  }

  private getTransactionPresentation(transactionType: number) {
    return TRANSACTION_PRESENTATION_MAP[transactionType] ?? DEFAULT_TRANSACTION_PRESENTATION;
  }

  private formatDate(value: string): string {
    return new Intl.DateTimeFormat('ru-RU', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }).format(new Date(value));
  }
}
