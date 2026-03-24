import { CommonModule } from '@angular/common';
import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';

import { ChevronRightIcon } from '../icons/chevron-right-icon/chevron-right-icon';
import { ArrowUpIcon } from '../icons/arrow-up-icon/arrow-up-icon';
import { ArrowDownIcon } from '../icons/arrow-down-icon/arrow-down-icon';
import { ProfileTransaction } from '../../pages/profile/profile.models';

@Component({
  selector: 'app-transactions-content',
  standalone: true,
  imports: [CommonModule, RouterLink, ChevronRightIcon, ArrowUpIcon, ArrowDownIcon],
  templateUrl: './transactions-content.html',
  styleUrl: './transactions-content.scss',
})
export class TransactionsContent {
  userDetails = input<any>(null);
  transactions = input<ProfileTransaction[]>([]);

  private authService = inject(AuthService);

  protected readonly userName = computed(() => this.userDetails()?.name || 'Пользователь');
  protected readonly userTitle = computed(() => this.userDetails()?.email || '');

  protected logout(): void {
    this.authService.logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  }
}
