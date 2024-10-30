import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AccountUpdateFormComponent } from './account-update-form/account-update-form.component';
import { AccountAddNewFormComponent } from './account-add-new-form/account-add-new-form.component';
import { AccountDeleteConfirmationDialogComponent } from './account-delete-confirmation-dialog/account-delete-confirmation-dialog.component';
import { Account } from '../../../models/Account';
import { AccountService } from '../../../APIService/account.service';
import { UploadService } from '../../../APIService/upload.service';
import { switchMap } from 'rxjs';
import { AccountRole, Gender } from '../../../constants/enums';

@Component({
  selector: 'app-account-management',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, AccountUpdateFormComponent, AccountAddNewFormComponent, AccountDeleteConfirmationDialogComponent],
  templateUrl: './account-management.component.html',
  styleUrls: ['./account-management.component.css']
})
export class AccountManagementComponent implements OnInit {
  searchTerm: string = '';
  isLoading: boolean = false;
  openUpdateAccountForm: boolean = false;
  openDeleteConfirmationDialog: boolean = false;
  openAddAccountForm: boolean = false;

  selectedAccount!: Account;

  accounts!: Account[];
  filteredAccounts!: Account[];

  giaoVienAccounts!: Account[];
  currentGiaoVienAccountsPage: number = 1;
  totalGiaoVienAccountsPage!: number;

  phuHuynhAccounts!: Account[];
  currentPhuHuynhAccountsPage: number = 1;
  totalPhuHuynhAccountsPage!: number;

  constructor(private accountService: AccountService, private uploadService: UploadService) {
  }

  ngOnInit(): void {
    this.onRefresh();
  }

  loadAccounts() {
    this.isLoading = true;
    this.accountService.getAll().subscribe({
      next: (res) => {
        this.accounts = res.data;
      },
      error: (error) => {
        console.error('Error fetching accounts:', error);
      }
    });
  }

  onRefresh() {
    this.loadAccounts();
    this.onSearch();
  }

  onSearch(event?: Event) {
    if (event) {
      this.searchTerm = (event.target as HTMLInputElement).value;
    }

    this.isLoading = true;

    this.filteredAccounts = this.accounts.filter(account =>
      account.username.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      account.phuHuynh?.hoTenCha?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      account.phuHuynh?.hoTenMe?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      account.giaoVien?.hoTen.toLowerCase().includes(this.searchTerm.toLowerCase())
    );

    this.giaoVienAccounts = this.filteredAccounts.filter(account => account.role === 'GiaoVien');
    this.totalGiaoVienAccountsPage = Math.ceil(this.giaoVienAccounts.length / 5) || 1;
    this.giaoVienAccounts = this.giaoVienAccounts.slice((this.currentGiaoVienAccountsPage - 1) * 5, this.currentGiaoVienAccountsPage * 5);

    this.phuHuynhAccounts = this.filteredAccounts.filter(account => account.role === 'PhuHuynh');
    this.totalPhuHuynhAccountsPage = Math.ceil(this.phuHuynhAccounts.length / 5) || 1;
    this.phuHuynhAccounts = this.phuHuynhAccounts.slice((this.currentPhuHuynhAccountsPage - 1) * 5, this.currentPhuHuynhAccountsPage * 5);

    this.isLoading = false;
  }

  prevPhuHuynhAccountsPage() {
    if (this.currentPhuHuynhAccountsPage > 1) {
      this.currentPhuHuynhAccountsPage--;
      this.onSearch();
    }
  }
  nextPhuHuynhAccountsPage() {
    if (this.currentPhuHuynhAccountsPage < this.totalPhuHuynhAccountsPage) {
      this.currentPhuHuynhAccountsPage++;
      this.onSearch();
    }
  }

  prevGiaoVienAccountsPage() {
    if (this.currentGiaoVienAccountsPage > 1) {
      this.currentGiaoVienAccountsPage--;
      this.onSearch();
    }
  }
  nextGiaoVienAccountsPage() {
    if (this.currentGiaoVienAccountsPage < this.totalGiaoVienAccountsPage) {
      this.currentGiaoVienAccountsPage++;
      this.onSearch();
    }
  }

  handleOpenUpdateAccountForm(account: Account) {
    this.selectedAccount = { ...account };
    this.openUpdateAccountForm = true;
  }
  handleUpdateAccount({ updatedAccount, anh }: { updatedAccount: Account, anh: File | null }) {
    let upload$ = updatedAccount.role === 'GiaoVien' && anh
      ? this.uploadService.uploadImage(anh).pipe(
        switchMap((res) => {
          updatedAccount.giaoVien!.anh = res.DT;
          return this.accountService.update(updatedAccount);
        })
      )
      : this.accountService.update(updatedAccount);

    upload$.subscribe({
      next: (res) => {
        this.accounts = this.accounts.map(account => account.id === res.data.id ? res.data : account);
        this.onSearch();
        this.closeForm();
      },
      error: (error) => {
        console.error('Error updating account:', error);
      }
    });
  }

  handleOpenDeleteAccountConfirmation(account: Account) {
    this.selectedAccount = { ...account };
    this.openDeleteConfirmationDialog = true;
  }
  handleDeleteAccount() {
    this.accountService.delete(this.selectedAccount.id).subscribe({
      next: (_) => {
        this.accounts = this.accounts.filter(account => account.id !== this.selectedAccount.id);
      },
      error: (error) => {
        console.error('Error deleting account:', error);
      }
    });
    this.openDeleteConfirmationDialog = false;
  }

  handleOpenAddAccountForm() {
    this.openAddAccountForm = true;
  }
  handleSaveNewAccount({ newAccount, anh }: { newAccount: Account, anh: File | null }) {
    let upload$ = newAccount.role === 'GiaoVien' && anh
      ? this.uploadService.uploadImage(anh).pipe(
        switchMap((res) => {
          newAccount.giaoVien!.anh = res.DT;
          return this.accountService.add(newAccount);
        })
      )
      : this.accountService.add(newAccount);

    upload$.subscribe({
      next: (res) => {
        this.accounts.push(res.data);
        this.onSearch();
        this.closeForm();
      },
      error: (error) => {
        console.error('Error saving new account:', error);
      }
    });
  }

  closeForm() {
    this.openUpdateAccountForm = false;
    this.openAddAccountForm = false;
    this.openDeleteConfirmationDialog = false;
  }
}

export function validateData(formGroup: FormGroup) {
  const errors: any = {};
  const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
  const phoneNumberPattern = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;

  if (!formGroup.get('username')?.value) {
    errors.username = 'Tên đăng nhập không được để trống';
  }
  if (!formGroup.get('password')?.value && !formGroup.get('id')?.value) {
    errors.password = 'Mật khẩu không được để trống';
  }

  if (formGroup.get('password')?.value !== formGroup.get('confirmPassword')?.value) {
    errors.confirmPassword = 'Mật khẩu không khớp';
  }

  switch (formGroup.get('role')?.value) {
    case AccountRole.GiaoVien:
      if (!formGroup.get('giaoVien.hoTen')?.value) {
        errors.hoTen = 'Họ tên không được để trống';
      }
      if (!formGroup.get('giaoVien.gioiTinh')?.value) {
        errors.gioiTinh = 'Giới tính không được để trống';
      }
      if (!formGroup.get('giaoVien.soDienThoai')?.value) {
        errors.soDienThoai = 'Số điện thoại không được để trống';
      }
      if (!formGroup.get('giaoVien.email')?.value) {
        errors.email = 'Email không được để trống';
      } else if (!emailPattern.test(formGroup.get('giaoVien.email')?.value)) {
        errors.email = 'Email không hợp lệ';
      }
      break;
    case AccountRole.PhuHuynh:
      if (formGroup.get('phuHuynh.sdtCha')?.value && phoneNumberPattern.test(formGroup.get('phuHuynh.sdtCha')?.value)) {
        errors.sdtCha = 'Số điện thoại không hợp lệ';
      }
      if (formGroup.get('phuHuynh.sdtMe')?.value && phoneNumberPattern.test(formGroup.get('phuHuynh.sdtMe')?.value)) {
        errors.sdtMe = 'Số điện thoại không hợp lệ';
      }
      if (formGroup.get('phuHuynh.emailCha')?.value && !emailPattern.test(formGroup.get('phuHuynh.emailCha')?.value)) {
        errors.emailCha = 'Email không hợp lệ';
      }
      if (formGroup.get('phuHuynh.emailMe')?.value && !emailPattern.test(formGroup.get('phuHuynh.emailMe')?.value)) {
        errors.emailMe = 'Email không hợp lệ';
      }
      if (!formGroup.get('phuHuynh.diaChi')?.value) {
        errors.diaChi = 'Địa chỉ không được để trống';
      }
      break;
    default:
      break;
  }
  return errors;
}