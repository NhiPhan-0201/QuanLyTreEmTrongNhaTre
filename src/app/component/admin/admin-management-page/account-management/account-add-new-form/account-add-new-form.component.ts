import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Account } from '../../../../../../models';
import { AccountRole, AccountStatus, Gender } from '../../../../../../constants/enums';
import { validateData } from '../account-management.component';
import { AccountService, UploadService } from '../../../../../../APIService';
import { ToastService } from '../../../../../service';
import { catchError, Observable, switchMap } from 'rxjs';

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
  @Output() saveAccount: EventEmitter<Account> = new EventEmitter<Account>();

  constructor(private fb: FormBuilder, private accountService: AccountService, private uploadService: UploadService, private toastService: ToastService) {
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
        diaChi: '',
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
      setTimeout(() => {
        this.errors = validateData(this.newAccountForm);
      }, 200);
    });
  }
  onImagePicked(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input && input.files && input.files.length > 0) {
      this.anhGiaoVienUploaded = input.files[0];
      this.errors = validateData(this.newAccountForm, this.anhGiaoVienUploaded);
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
    this.errors = validateData(this.newAccountForm, this.anhGiaoVienUploaded);

    if (Object.keys(this.errors).length === 0) {
      let uploadObservable: Observable<Account>;

      if (this.newAccountForm.value.role === this.TEACHER_ROLE && this.anhGiaoVienUploaded) {
        try {
          uploadObservable = this.uploadService.uploadImage(this.anhGiaoVienUploaded).pipe(
            switchMap((res) => {
              this.newAccountForm.get('giaoVien')?.patchValue({ anh: res.link });
              return this.accountService.add(this.newAccountForm.value);
            }),
            catchError((err) => {
              throw err;
            })
          );
        } catch (err) {
          this.toastService.showError('Lỗi khi tải ảnh lên server');
          return;
        }
      } else {
        uploadObservable = this.accountService.add(this.newAccountForm.value);
      }

      uploadObservable.subscribe({
        next: (res) => {
          this.saveAccount.emit(res);
          this.toastService.showSuccess('Cập nhật tài khoản thành công');
          this.close();
        },
        error: (err) => {
          this.toastService.showError('Lỗi khi cập nhật tài khoản');
        }
      });
    }
  }

  close() {
    this.closeForm.emit();
  }
  getKeys(obj: any): string[] {
    return Object.keys(obj);
  }
}
