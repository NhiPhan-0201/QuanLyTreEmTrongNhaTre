import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-class-delete-confirmation-dialog',
  standalone: true,
  imports: [],
  templateUrl: './class-delete-confirmation-dialog.component.html'
})
export class ClassDeleteConfirmationDialogComponent {

  @Output() closeDialog = new EventEmitter<void>();
  @Output() deleteLop = new EventEmitter<void>();

  constructor() { }

  close() {
    this.closeDialog.emit();
  }

  delete() {
    this.deleteLop.emit();
  }
}
