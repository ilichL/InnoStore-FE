import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { User } from '@auth0/auth0-angular';

@Component({
  selector: 'app-transactions-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './transactions-modal.html',
  styleUrl: './transactions-modal.scss',
})
export class TransactionsModal {
  isOpen = input.required<boolean>();
  userDetails = input<User | null | undefined>(null);

  closeModal = output<void>();

  constructor(private readonly router: Router) {}

  protected goToProfile(): void {
    this.closeModal.emit();
    this.router.navigate(['/profile']);
  }
}
