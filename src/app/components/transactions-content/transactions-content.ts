import { Component, computed, inject, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService, User } from '@auth0/auth0-angular';
import { ChevronRightIcon } from '../icons/chevron-right-icon/chevron-right-icon';
import { ArrowUpIcon } from '../icons/arrow-up-icon/arrow-up-icon';
import { ArrowDownIcon } from '../icons/arrow-down-icon/arrow-down-icon';

interface Transaction {
  id: number;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  date: string;
}

@Component({
  selector: 'app-transactions-content',
  standalone: true,
  imports: [CommonModule, RouterLink, ChevronRightIcon, ArrowUpIcon, ArrowDownIcon],
  templateUrl: './transactions-content.html',
  styleUrl: './transactions-content.scss',
})
export class TransactionsContent {
  userDetails = input<User | null | undefined>(null);

  private authService = inject(AuthService);

  protected readonly userName = computed(() => this.userDetails()?.name || 'Пользователь');
  protected readonly userTitle = computed(() => this.userDetails()?.email || '');

  protected readonly transactions = signal<Transaction[]>([
    {
      id: 1,
      description: 'Покупка эко-бутылки',
      amount: 40,
      type: 'expense',
      date: '2024-01-15',
    },
    {
      id: 2,
      description: 'Прохождение профессионального курса',
      amount: 50,
      type: 'income',
      date: '2024-01-10',
    },
  ]);

  protected logout(): void {
    this.authService.logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  }
}
