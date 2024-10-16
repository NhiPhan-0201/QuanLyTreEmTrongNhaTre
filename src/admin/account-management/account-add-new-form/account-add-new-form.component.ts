import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Account } from '../../../model/account';

@Component({
  selector: 'app-account-add-new-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './account-add-new-form.component.html',
  styleUrl: './account-add-new-form.component.css'
})
export class AccountAddNewFormComponent {
  newAccountForm: FormGroup;

  @Output() closeForm = new EventEmitter<void>();
  @Output() saveAccount = new EventEmitter<Account>();

  constructor(private fb: FormBuilder) {
    this.newAccountForm = this.fb.group({
    });
  }


  save() {
    this.saveAccount.emit(this.newAccountForm.value);
  }

  close() {
    this.closeForm.emit();
  }
}
