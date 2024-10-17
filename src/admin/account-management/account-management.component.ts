import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountUpdateFormComponent } from './account-update-form/account-update-form.component';
import { AccountAddNewFormComponent } from './account-add-new-form/account-add-new-form.component';
import { AccountDeleteConfirmationDialogComponent } from './account-delete-confirmation-dialog/account-delete-confirmation-dialog.component';
import { Account } from '../../model/account';
import { AccountService } from '../../APIService/account.service';

@Component({
  selector: 'app-account-management',
  standalone: true,
  imports: [FormsModule, CommonModule, AccountUpdateFormComponent, AccountAddNewFormComponent, AccountDeleteConfirmationDialogComponent],
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


  constructor(private accountService: AccountService) {
  }
  ngOnInit(): void {
    this.onRefresh();
  }

  loadAccounts() {
    // this.accountService.getAll().subscribe({
    //   next: (data) => {
    //     this.accounts = data || [];
    //   },
    //   error: (error) => {
    //     console.error('Error fetching accounts:', error);
    //   }
    // });
    this.accounts = [
      {
        id: 1,
        username: 'quoc123',
        password: '123',
        role: 'Admin',
        status: 'Enabled',
        giaoVien: {
          id: 1,
          hoTen: '',
          gioiTinh: '',
          soDienThoai: '',
          email: '',
          diaChi: '',
          anh: '',
          chuyenMon: ''
        },
        phuHuynh: {
          id: 1,
          hoTenCha: '',
          hoTenMe: '',
          sdtCha: '',
          sdtMe: '',
          emailCha: '',
          emailMe: '',
          diaChi: ''
        }
      },
    ]
    this.selectedAccount = this.accounts[0];
  }

  onRefresh() {
    this.loadAccounts();
    this.onSearch();
  }

  onSearch() {
    this.isLoading = true;

    this.filteredAccounts = this.accounts.filter(account =>
      account.username.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      account.phuHuynh.hoTenCha.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      account.phuHuynh.hoTenMe.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      account.giaoVien.hoTen.toLowerCase().includes(this.searchTerm.toLowerCase())
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
  handleUpdateAccount(updatedAccount: Account) {
    this.accountService.update(updatedAccount).subscribe({
      next: (data) => {
        this.accounts = this.accounts.map(account => account.id === data.id ? data : account);
      },
      error: (error) => {
        console.error('Error updating account:', error);
      }
    });

    this.openUpdateAccountForm = false;
  }

  handleOpenDeleteAccountConfirmation(account: Account) {
    this.selectedAccount = { ...account };
    this.openDeleteConfirmationDialog = true;
  }
  handleDeleteAccount() {
    this.accountService.delete(this.selectedAccount.id).subscribe({
      next: (data) => {
        this.accounts = this.accounts.filter(account => account.id !== data.id);
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
  handleSaveNewAccount(newAccount: Account) {
    this.accountService.add(newAccount).subscribe({
      next: (data) => {
        this.accounts = [...this.accounts, data];
      },
      error: (error) => {
        console.error('Error adding new account:', error);
      }
    });

    this.openAddAccountForm = false;
  }

  closeForm() {
    this.openUpdateAccountForm = false;
    this.openAddAccountForm = false;
    this.openDeleteConfirmationDialog = false;
  }
}
