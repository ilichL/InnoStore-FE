import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID, effect, inject, input, signal } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

import { AVATAR_PLACEHOLDER } from '../../core/constants/ui.constants';
import { TransactionsModal } from '../transactions-modal/transactions-modal';

@Component({
  selector: 'app-user-avatar',
  standalone: true,
  imports: [CommonModule, TransactionsModal],
  templateUrl: './user-avatar.html',
  styleUrl: './user-avatar.scss',
})
export class UserAvatar {
  userPoints = input<number>(100);
  protected readonly isModalOpen = signal(false);
  protected readonly avatarPlaceholder = AVATAR_PLACEHOLDER;
  protected readonly user$ = inject(AuthService).user$;

  constructor(@Inject(PLATFORM_ID) private readonly platformId: object) {
    effect((onCleanup) => {
      if (!isPlatformBrowser(this.platformId) || !this.isModalOpen()) {
        return;
      }

      const handler = this.handleOutsideClick;
      document.addEventListener('click', handler);

      onCleanup(() => {
        document.removeEventListener('click', handler);
      });
    });
  }

  protected onAvatarError(event: Event): void {
    const image = event.target as HTMLImageElement | null;

    if (image && image.src !== this.avatarPlaceholder) {
      image.src = this.avatarPlaceholder;
    }
  }

  protected openModal(event?: Event): void {
    event?.preventDefault();
    event?.stopPropagation();
    this.isModalOpen.set(!this.isModalOpen());
  }

  protected closeModal(): void {
    this.isModalOpen.set(false);
  }

  private handleOutsideClick = (event: MouseEvent): void => {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const target = event.target as HTMLElement | null;
    const dropdown = document.querySelector('.dropdown-content');
    const profileButton = document.querySelector('.profile-link');

    if (!target || !dropdown || !profileButton) {
      return;
    }

    if (!dropdown.contains(target) && !profileButton.contains(target)) {
      this.closeModal();
    }
  };
}
