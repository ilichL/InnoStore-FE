import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { ArrowUpIcon } from '../../components/icons/arrow-up-icon/arrow-up-icon';
import { ArrowDownIcon } from '../../components/icons/arrow-down-icon/arrow-down-icon';

interface Transaction {
  id: number;
  label: 'Списание' | 'Начисление';
  description: string;
  amount: number;
  type: 'income' | 'expense';
  date: string;
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ArrowUpIcon, ArrowDownIcon],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile {
  private authService = inject(AuthService);

  protected readonly user$ = this.authService.user$;

  protected readonly transactions = signal<Transaction[]>([
    {
      id: 1,
      label: 'Списание',
      description: 'Покупка эко-бутылки',
      amount: 40,
      type: 'expense',
      date: '2024-01-15',
    },
    {
      id: 2,
      label: 'Начисление',
      description: 'Прохождение профессионального курса',
      amount: 50,
      type: 'income',
      date: '2024-01-10',
    },
    {
      id: 3,
      label: 'Начисление',
      description: 'Организация мероприятия',
      amount: 40,
      type: 'income',
      date: '2024-01-05',
    },
    {
      id: 4,
      label: 'Начисление',
      description: 'Организация мероприятия',
      amount: 40,
      type: 'income',
      date: '2024-01-05',
    },
    {
      id: 5,
      label: 'Начисление',
      description: 'Организация мероприятия',
      amount: 40,
      type: 'income',
      date: '2024-01-05',
    },
    {
      id: 6,
      label: 'Начисление',
      description: 'Организация мероприятия',
      amount: 40,
      type: 'income',
      date: '2024-01-05',
    },
    {
      id: 7,
      label: 'Начисление',
      description: 'Организация мероприятия',
      amount: 40,
      type: 'income',
      date: '2024-01-05',
    },
    {
      id: 8,
      label: 'Начисление',
      description: 'Организация мероприятия',
      amount: 40,
      type: 'income',
      date: '2024-01-05',
    },
  ]);
}
