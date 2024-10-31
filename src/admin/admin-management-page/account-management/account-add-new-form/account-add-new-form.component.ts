import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Account } from '../../../../models/Account';
import { AccountRole, AccountStatus, Gender } from '../../../../constants/enums';
import { validateData } from '../account-management.component';

@Component({
  selector: 'app-account-add-new-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './account-add-new-form.component.html',
  styleUrl: './account-add-new-form.component.css'
})
export class AccountAddNewFormComponent {
  newAccountForm: FormGroup;

  ADMIN_ROLE = AccountRole.Admin;
  TEACHER_ROLE = AccountRole.GiaoVien;
  PARENT_ROLE = AccountRole.PhuHuynh;

  MALE_GENDER = Gender.Nam;
  FEMALE_GENDER = Gender.Nu;

  ENABLED_STATUS = AccountStatus.Enabled;
  DISABLED_STATUS = AccountStatus.Disabled;

  anhGiaoVienPreview: string | ArrayBuffer | null = null;
  anhGiaoVienUploaded: File | null = null;
  anhGiaoVienFileName: string | null = null;

  errors!: any;

  @Output() closeForm = new EventEmitter<void>();
  @Output() saveAccount: EventEmitter<{ newAccount: Account, anh: File | null }> = new EventEmitter<{ newAccount: Account, anh: File | null }>();

  constructor(private fb: FormBuilder) {
    this.newAccountForm = this.fb.group({
      id: '',
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
      role: [this.ADMIN_ROLE, [Validators.required]],
      status: [this.ENABLED_STATUS, [Validators.required]],
      phuHuynh: this.fb.group({
        hoTenCha: '',
        hoTenMe: '',
        sdtCha: '',
        sdtMe: '',
        emailCha: '',
        emailMe: '',
      }),
      giaoVien: this.fb.group({
        hoTen: '',
        gioiTinh: '',
        soDienThoai: '',
        diaChi: '',
        anh: null,
        chuyenMon: '',
        email: '',
      }),
    });
    this.newAccountForm.get('role')?.valueChanges.subscribe((role) => {
      this.errors = {};
    });
    this.subscribeToFormControls(this.newAccountForm);
  }

  subscribeToFormControls(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach((key) => {
      const control = formGroup.get(key);
      const errorKey = key

      if (control) {
        if (control instanceof FormGroup) {
          this.subscribeToFormControls(control);
        } else {
          if (key === 'password') {
            control.valueChanges.subscribe(() => {
              this.errors = validateData(this.newAccountForm);
              if (this.newAccountForm.get('password')?.value === '') {
                this.errors = { ...this.errors, password: 'Mật khẩu không được để trống' };
              } else {
                this.errors = { ...this.errors, password: '' };
              }
              if (this.newAccountForm.get('password')?.value.length < 6) {
                this.errors = { ...this.errors, password: 'Mật khẩu phải có ít nhất 6 ký tự' };
              } else {
                this.errors = { ...this.errors, password: '' };
              }
            });
          } else {
            this.subscribeToValueChanges(control);
          }
        }
      }
    });
  }

  private subscribeToValueChanges(control: AbstractControl): void {
    control.valueChanges.subscribe(() => {
      this.errors = validateData(this.newAccountForm);
    });
  }
  onImagePicked(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input && input.files && input.files.length > 0) {
      this.anhGiaoVienUploaded = input.files[0];
      this.anhGiaoVienFileName = this.anhGiaoVienUploaded.name;
      let reader = new FileReader();

      reader.onload = (e) => {
        this.anhGiaoVienPreview = reader.result;
      };

      reader.readAsDataURL(this.anhGiaoVienUploaded);
    }
    input.value = '';
  }

  cancelUploadAnh() {
    this.anhGiaoVienFileName = null;
    this.anhGiaoVienPreview = null;
    this.anhGiaoVienUploaded = null;
  }

  save() {
    this.errors = {};
    this.errors = validateData(this.newAccountForm);

    if (Object.keys(this.errors).length === 0) {
      this.saveAccount.emit({ newAccount: this.newAccountForm.value, anh: this.anhGiaoVienUploaded });
    }
  }

  close() {
    this.closeForm.emit();
  }
  getKeys(obj: any): string[] {
    return Object.keys(obj);
  }
}
