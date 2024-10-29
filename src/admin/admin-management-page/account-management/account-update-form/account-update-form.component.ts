import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Account } from '../../../../models/Account';
import { AccountRole, AccountStatus, Gender } from '../../../../constants/enums';

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

  errors: object = {};

  anhGiaoVienPreview: string | ArrayBuffer | null = null;
  anhGiaoVienUploaded: File | null = null;
  anhGiaoVienFileName: string | null = null;


  @Input() account!: Account;
  @Output() closeForm = new EventEmitter<void>();
  @Output() saveAccount = new EventEmitter<Account>();

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
    }
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
    this.anhGiaoVienPreview = null;
    this.anhGiaoVienUploaded = null;
    this.anhGiaoVienFileName = null;
  }

  deleteAnh() {
    this.anhGiaoVienPreview = null;
    this.anhGiaoVienUploaded = null;
    this.anhGiaoVienFileName = null;
  }

  save() {

    if (Object.keys(this.errors).length > 0) {
      return;
    }

    let data = this.updateAccountForm.value;
    this.saveAccount.emit(data);
  }

  close() {
    this.closeForm.emit();
  }

  validateData() {

    this.errors = {};
    let data = this.updateAccountForm.value;

    if (!data.username) {
      this.errors = { ...this.errors, username: 'Username không được để trống' };
    }
    if (data.password !== '') {
      if (data.password.length < 6) {
        this.errors = { ...this.errors, password: 'Mật khẩu phải có ít nhất 6 kí tự' };
      }
      if (data.password !== data.confirmPassword) {
        this.errors = { ...this.errors, confirmPassword: 'Mật khẩu không khớp' };
      }
    }

    if (data.role === this.PARENT_ROLE) {

      let fatherInfoDefined = data.phuHuynh.hoTenCha || data.phuHuynh.sdtCha || data.phuHuynh.emailCha;
      let motherInfoDefined = data.phuHuynh.hoTenMe || data.phuHuynh.sdtMe || data.phuHuynh.emailMe;

      if (fatherInfoDefined && !data.phuHuynh.hoTenCha) {
        this.errors = { ...this.errors, hoTenCha: 'Họ tên cha không được để trống' };
      }

      if (motherInfoDefined && !data.phuHuynh.hoTenMe) {
        this.errors = { ...this.errors, hoTenMe: 'Họ tên mẹ không được để trống' };
      }

      if (fatherInfoDefined && !data.phuHuynh.sdtCha) {
        this.errors = { ...this.errors, sdtCha: 'Số điện thoại cha không được để trống' };
      } else if (!/((09|03|07|08|05)+([0-9]{8})\b)/g.test(data.phuHuynh.sdtCha)) {
        this.errors = { ...this.errors, sdtCha: 'Số điện thoại không hợp lệ' };
      }


      if (motherInfoDefined && !data.phuHuynh.sdtMe) {
        this.errors = { ...this.errors, sdtMe: 'Số điện thoại mẹ không được để trống' };
      } else if (!/((09|03|07|08|05)+([0-9]{8})\b)/g.test(data.phuHuynh.sdtMe)) {
        this.errors = { ...this.errors, sdtMe: 'Số điện thoại không hợp lệ' };
      }


      if (fatherInfoDefined && !data.phuHuynh.emailCha) {
        this.errors = { ...this.errors, emailCha: 'Email cha không được để trống' };
      } else if (!/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/g.test(data.phuHuynh.emailCha)) {
        this.errors = { ...this.errors, emailCha: 'Email không hợp lệ' };
      }


      if (motherInfoDefined && !data.phuHuynh.emailMe) {
        this.errors = { ...this.errors, emailMe: 'Email mẹ không được để trống' };
      } else if (!/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/g.test(data.phuHuynh.emailMe)) {
        this.errors = { ...this.errors, emailMe: 'Email không hợp lệ' };
      }


      if ((fatherInfoDefined || motherInfoDefined) && !data.diaChi) {
        this.errors = { ...this.errors, diaChi: 'Địa chỉ không được để trống' };
      }
      if (!fatherInfoDefined && !motherInfoDefined) {
        this.errors = { ...this.errors, phuHuynh: 'Thông tin cha hoặc mẹ không được để trống' };
      }
    }

    if (data.role === this.TEACHER_ROLE) {
      if (!data.giaoVien.hoTen) {
        this.errors = { ...this.errors, hoTen: 'Họ tên không được để trống' };
      }
      if (!data.giaoVien.soDienThoai) {
        this.errors = { ...this.errors, soDienThoai: 'Số điện thoại không được để trống' };
      } else {
        if (!/((09|03|07|08|05)+([0-9]{8})\b)/g.test(data.giaoVien.soDienThoai)) {
          this.errors = { ...this.errors, soDienThoai: 'Số điện thoại không hợp lệ' };
        }
      }
      if (!data.giaoVien.email) {
        this.errors = { ...this.errors, email: 'Email không được để trống' };
      } else {
        if (!/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/g.test(data.giaoVien.email)) {
          this.errors = { ...this.errors, email: 'Email không hợp lệ' };
        }
      }

      if (!data.giaoVien.gioiTinh) {
        this.errors = { ...this.errors, gioiTinh: 'Giới tính không được để trống' };
      }
    }
  }
}
