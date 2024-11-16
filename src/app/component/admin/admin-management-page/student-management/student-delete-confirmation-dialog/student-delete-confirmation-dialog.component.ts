import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-student-delete-confirmation-dialog',
  standalone: true,
  imports: [],
  templateUrl: './student-delete-confirmation-dialog.component.html',
  styleUrl: './student-delete-confirmation-dialog.component.css'
})
export class StudentDeleteConfirmationDialogComponent {

  @Output() closeDialog: EventEmitter<void> = new EventEmitter<void>();
  @Output() deleteStudent: EventEmitter<void> = new EventEmitter<void>();

  delete() {
    this.deleteStudent.emit();
  }

  close() {
    this.closeDialog.emit();
  }
}
