import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Account } from '../../../model/account';

@Component({
  selector: 'app-account-update-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './account-update-form.component.html',
  styleUrls: ['./account-update-form.component.css']
})
export class AccountUpdateFormComponent implements OnChanges {

  updateAccountForm: FormGroup;

  @Input() account!: Account;
  @Output() closeForm = new EventEmitter<void>();
  @Output() saveAccount = new EventEmitter<Account>();

  constructor(private fb: FormBuilder) {
    this.updateAccountForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required]
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['account']) {
      this.updateAccountForm = this.fb.group({
      });
    }
  }


  save() {
    if (this.updateAccountForm.invalid) {
      console.log(this.updateAccountForm);
    }
    this.saveAccount.emit(this.updateAccountForm.value);
  }

  close() {
    this.closeForm.emit();
  }
}
