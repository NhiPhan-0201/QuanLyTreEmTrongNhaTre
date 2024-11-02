import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Account } from '../../../../models/Account';
import { AccountRole, AccountStatus, Gender } from '../../../../constants/enums';
import { validateData } from '../account-management.component';
import { convertUrlToFile } from '../../../../utils/fileUtils';

@Component({
  selector: 'app-account-update-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './account-update-form.component.html',
  styleUrls: ['./account-update-form.component.css']
})
export class AccountUpdateFormComponent implements OnChanges {

  updateAccountForm!: FormGroup;

  ADMIN_ROLE = AccountRole.Admin;
  TEACHER_ROLE = AccountRole.GiaoVien;
  PARENT_ROLE = AccountRole.PhuHuynh;

  MALE_GENDER = Gender.Nam;
  FEMALE_GENDER = Gender.Nu;

  ENABLED_STATUS = AccountStatus.Enabled;
  DISABLED_STATUS = AccountStatus.Disabled;

  anhGiaoVienPreview: string | ArrayBuffer | null = null;
  anhGiaoVienUploaded: File | null = null;
  oldFileChanged: boolean = false;
  oldFileUrl!: string;

  errors: any = {};

  @Input() account!: Account;
  @Output() closeForm: EventEmitter<void> = new EventEmitter<void>();
  @Output() saveAccount: EventEmitter<{ updatedAccount: Account, anh: { file: File | null, oldFileChanged: boolean } }> = new EventEmitter<{ updatedAccount: Account, anh: { file: File | null, oldFileChanged: boolean } }>();

  constructor(private fb: FormBuilder) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['account'] && this.account) {
      this.updateAccountForm = this.fb.group({
        id: [this.account.id],
        username: [this.account.username, Validators.required],
        password: [''],
        confirmPassword: [''],
        role: [this.account.role, Validators.required],
        status: [this.account.status, Validators.required],
        phuHuynh: this.fb.group({
          hoTenCha: [this.account.phuHuynh?.hoTenCha],
          hoTenMe: [this.account.phuHuynh?.hoTenMe],
          sdtCha: [this.account.phuHuynh?.sdtCha],
          sdtMe: [this.account.phuHuynh?.sdtMe],
          emailCha: [this.account.phuHuynh?.emailCha],
          emailMe: [this.account.phuHuynh?.emailMe],
          diaChi: [this.account.phuHuynh?.diaChi],
        }),
        giaoVien: this.fb.group({
          hoTen: [this.account.giaoVien?.hoTen],
          gioiTinh: [this.account.giaoVien?.gioiTinh],
          soDienThoai: [this.account.giaoVien?.soDienThoai],
          diaChi: [this.account.giaoVien?.diaChi],
          anh: [this.account.giaoVien?.anh],
          chuyenMon: [this.account.giaoVien?.chuyenMon],
          email: [this.account.giaoVien?.email],
        }),
      });

      this.oldFileUrl = this.account.giaoVien?.anh || '';
      this.anhGiaoVienPreview = this.oldFileUrl;

      this.subscribeToFormControls(this.updateAccountForm);
    }
  }

  private subscribeToFormControls(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach((key) => {
      const control = formGroup.get(key);
      const errorKey = key

      if (control) {
        if (control instanceof FormGroup) {
          this.subscribeToFormControls(control);
        } else {
          this.subscribeToValueChanges(control);
        }
      }
    });
  }

  private subscribeToValueChanges(control: AbstractControl): void {
    control.valueChanges.subscribe(() => {
      this.errors = validateData(this.updateAccountForm);
    });
  }

  onImagePicked(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input && input.files && input.files.length > 0) {
      this.anhGiaoVienUploaded = input.files[0];
      this.oldFileChanged = true;
      let reader = new FileReader();

      reader.onload = (e) => {
        this.anhGiaoVienPreview = reader.result;
      };

      reader.readAsDataURL(this.anhGiaoVienUploaded);
    }
    input.value = '';
  }

  cancelUploadAnh() {
    this.anhGiaoVienPreview = this.oldFileUrl;
    this.anhGiaoVienUploaded = null;
    this.oldFileChanged = false;
    this.updateAccountForm.get('giaoVien.anh')?.setValue(this.oldFileUrl);
  }

  deleteAnh() {
    this.anhGiaoVienPreview = null;
    this.anhGiaoVienUploaded = null;
    this.oldFileChanged = true;
    this.updateAccountForm.get('giaoVien.anh')?.setValue('');
  }

  save() {
    this.errors = {};
    this.errors = validateData(this.updateAccountForm);

    if (Object.keys(this.errors).length === 0) {
      this.saveAccount.emit({ updatedAccount: this.updateAccountForm.value, anh: { file: this.anhGiaoVienUploaded, oldFileChanged: this.oldFileChanged } });
    }
  }

  close() {
    this.closeForm.emit();
  }

  getKeys(obj: any): string[] {
    return Object.keys(obj);
  }
}
