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
  openEditForm: boolean = false;
  openDeleteConfirmation: boolean = false;
  openAddForm: boolean = false;

  selectedAccount!: Account;

  accounts!: Account[];
  filteredAccounts!: Account[];

  constructor(private accountService: AccountService) {
  }
  ngOnInit(): void {
    this.loadAccounts();
    this.onSearch();
  }

  loadAccounts() {
    this.accountService.getAccounts().subscribe({
      next: (data) => {
        this.accounts = data || [];
      },
      error: (error) => {
        console.error('Error fetching accounts:', error);
      }
    });
  }

  onSearch() {
    this.isLoading = true;

    this.filteredAccounts = this.accounts.filter(account =>
      account.username.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      account.phuHuynh.hoTenCha.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      account.phuHuynh.hoTenMe.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      account.giaoVien.hoTen.toLowerCase().includes(this.searchTerm.toLowerCase())
    );

    this.isLoading = false;
  }

  updateAccount(account: Account) {
    this.selectedAccount = { ...account };
    this.openEditForm = true;
  }

  deleteAccount(account: Account) {
    this.selectedAccount = { ...account };
    this.openDeleteConfirmation = true;
  }

  addNewAccount() {
    this.openAddForm = true;
  }

  handleDeleteAccount() {
    this.accounts = this.accounts.filter(account => account.id !== this.selectedAccount.id);
    this.onSearch();

    this.openDeleteConfirmation = false;
  }

  handleSaveNewAccount(newAccount: Account) {
    this.accounts.push(newAccount);
    this.onSearch();
    this.openAddForm = false;
  }

  handleUpdateAccount(updatedAccount: Account) {
    const index = this.accounts.findIndex(account => account.id === this.selectedAccount.id);
    if (index !== -1) {
      console.log('accounts', this.accounts);
      this.onSearch();
    }

    this.openEditForm = false;
  }

  closeForm() {
    this.openEditForm = false;
    this.openAddForm = false;
    this.openDeleteConfirmation = false;
  }
}
