import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ProfileTransaction, TransactionDto } from './profile.models';
import { ProfileTransactionsService } from './profile-transactions.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile {
  private readonly profileTransactionsService = inject(ProfileTransactionsService);

  protected readonly transactions = signal<ProfileTransaction[]>([]);

  constructor() {
    this.init();
  }

  private init(): void {
    this.loadTransactions();
  }

  private loadTransactions(): void {
    this.profileTransactionsService.getTransactions().subscribe({
      next: (response: TransactionDto[]) => {
        const mapped = response.map((t: TransactionDto) => this.mapTransaction(t));
        this.transactions.set(mapped);
      },
      error: (error: unknown) => {
        console.error('FAILED TO LOAD TRANSACTIONS:', error);
        this.transactions.set([]);
      },
    });
  }

  private mapTransaction(transaction: TransactionDto): ProfileTransaction {
    return {
      id: transaction.id,
      date: this.formatDate(transaction.createdAt),
      amount: transaction.amount,
      type: this.mapTransactionVisualType(transaction.transactionType),
      label: this.mapTransactionLabel(transaction.transactionType),
      description: this.mapTransactionDescription(transaction.transactionType),
    };
  }

  private mapTransactionVisualType(transactionType: number): 'income' | 'expense' {
    switch (transactionType) {
      case 1:
        return 'income';
      default:
        return 'income';
    }
  }

  private mapTransactionLabel(transactionType: number): string {
    switch (transactionType) {
      case 1:
        return 'Начисление';
      default:
        return 'Операция';
    }
  }

  private mapTransactionDescription(transactionType: number): string {
    switch (transactionType) {
      case 1:
        return 'Участие в мероприятии';
      default:
        return 'Без описания';
    }
  }

  private formatDate(value: string): string {
    return new Intl.DateTimeFormat('ru-RU', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }).format(new Date(value));
  }
}
