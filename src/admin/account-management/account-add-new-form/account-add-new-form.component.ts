import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Account } from '../../../model/account';
import { AccountRole, AccountStatus, Gender } from '../../../constants/enums';

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

  errors: object = {};

  @Output() closeForm = new EventEmitter<void>();
  @Output() saveAccount = new EventEmitter<Account>();

  constructor(private fb: FormBuilder) {
    this.newAccountForm = this.fb.group({
      id: '',
      username: '',
      password: '',
      confirmPassword: '',
      role: this.ADMIN_ROLE,
      status: this.ENABLED_STATUS,
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
        anh: '',
        chuyenMon: '',
        email: '',
      }),
    });
  }


  save() {
    this.saveAccount.emit(this.newAccountForm.value);
  }

  close() {
    this.closeForm.emit();
  }

  validateData() {

    this.errors = {};
    let data = this.newAccountForm.value;

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
    } else {
      this.errors = { ...this.errors, password: 'Mật khẩu không được để trống' };
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
