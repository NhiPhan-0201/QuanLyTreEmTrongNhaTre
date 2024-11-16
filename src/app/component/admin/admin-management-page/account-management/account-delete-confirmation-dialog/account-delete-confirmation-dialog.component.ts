import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-account-delete-confirmation-dialog',
  standalone: true,
  imports: [],
  templateUrl: './account-delete-confirmation-dialog.component.html'
})
export class AccountDeleteConfirmationDialogComponent {

  @Output() closeDialog = new EventEmitter<void>();
  @Output() deleteAccount = new EventEmitter<void>();

  constructor() { }

  close() {
    this.closeDialog.emit();
  }

  delete() {
    this.deleteAccount.emit();
  }
}
