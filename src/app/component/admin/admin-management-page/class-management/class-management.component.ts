import { Component, OnInit } from '@angular/core';
import { Account, NhomLop, QuanLiLop } from '../../../../../models';
import { NhomLopService, QuanLiLopService, AccountService } from '../../../../../APIService';
import { FormGroup } from '@angular/forms';
import { ClassAddNewFormComponent } from './class-add-new-form/class-add-new-form.component';
import { ClassUpdateFormComponent } from './class-update-form/class-update-form.component';
import { ClassDeleteConfirmationDialogComponent } from './class-delete-confirmation-dialog/class-delete-confirmation-dialog.component';
import { CommonModule } from '@angular/common';
import { AccountRole, AccountStatus } from '../../../../../constants/enums';

@Component({
  selector: 'app-class-management',
  standalone: true,
  imports: [ClassAddNewFormComponent, ClassUpdateFormComponent, ClassDeleteConfirmationDialogComponent, CommonModule],
  templateUrl: './class-management.component.html',
  styleUrl: './class-management.component.css'
})
export class ClassManagementComponent implements OnInit {
  searchTerm: string = '';
  isLoading: boolean = false;
  openUpdateLopForm: boolean = false;
  openDeleteConfirmationDialog: boolean = false;
  openAddLopForm: boolean = false;

  selectedLop!: QuanLiLop;

  list_nhomLop!: NhomLop[];
  list_giaoVienAccount!: Account[];
  list_lop!: QuanLiLop[];
  filtered_list_lop!: QuanLiLop[];

  currentPage: number = 1;
  totalPage: number = 1;
  rowPerPage: number = 5;

  constructor(private classService: QuanLiLopService, private accountService: AccountService, private classGroupService: NhomLopService) { }

  ngOnInit(): void {
    this.loadListLop();
  }

  loadListLop() {
    this.isLoading = true;
    this.list_lop = [];
    this.classService.getAll().subscribe({
      next: (res) => {
        this.list_lop = res;
        this.loadGiaoVien();
      },
      error: (error) => {
        console.error('Lỗi khi tải list_lop:', error);
        this.list_lop = this.generateMockClasses();
        this.loadGiaoVien();
      }
    });
  }

  loadGiaoVien() {
    this.isLoading = true;
    this.accountService.getTeachers().subscribe({
      next: (res) => {
        this.list_giaoVienAccount = res;
        this.list_lop = this.list_lop.map(lop => { return { ...lop, thongTinGiaoVien: this.list_giaoVienAccount.find(gv => gv.id === lop.idGiaoVien)?.giaoVien } });
        this.loadNhomLop();
      },
      error: (error) => {
        console.error('Lỗi khi tải list_giaoVienAccount:', error);
        this.list_giaoVienAccount = this.generateMockGiaoVienAccounts();
        this.list_lop = this.list_lop.map(lop => { return { ...lop, thongTinGiaoVien: this.list_giaoVienAccount.find(gv => gv.id === lop.idGiaoVien)?.giaoVien } });
        this.loadNhomLop();
      }
    });
  }

  loadNhomLop() {
    this.isLoading = true;
    this.classGroupService.getAll().subscribe({
      next: (res) => {
        this.list_nhomLop = res;
        this.list_lop = this.list_lop.map(lop => { return { ...lop, nhomLop: this.list_nhomLop.find(nl => nl.id === lop.idNhomLop) } });
        this.isLoading = false;
        this.onSearch();
      },
      error: (error) => {
        console.error('Lỗi khi tải list_nhomLop:', error);
        this.list_nhomLop = this.generateMockClassGroups();
        this.list_lop = this.list_lop.map(lop => { return { ...lop, nhomLop: this.list_nhomLop.find(nl => nl.id === lop.idNhomLop) } });
        this.isLoading = false;
        this.onSearch();
      }
    });
  }

  private generateMockClassGroups() {
    const mockClassGroups: NhomLop[] = [];
    for (let i = 0; i < 10; i++) {
      mockClassGroups.push({
        id: i,
        tenNhom: `Nhóm lớp ${i}`
      });
    }
    return mockClassGroups;
  }

  private generateMockGiaoVienAccounts() {
    const mockGiaoVienAccounts: Account[] = [];
    for (let i = 0; i < 10; i++) {
      mockGiaoVienAccounts.push({
        id: i,
        role: AccountRole.GiaoVien,
        status: AccountStatus.Enabled,
        username: `giaovien${i}`,
        giaoVien: {
          id: i,
          hoTen: `Giáo viên ${i}`,
          email: `giaovien${i}@example.com`,
          soDienThoai: `098765432${i}`,
          diaChi: `Địa chỉ ${i}`,
          gioiTinh: i % 2 === 0 ? 'Nam' : 'Nữ',
          anh: `https://randomuser.me/api/portraits`,
          chuyenMon: `Chuyên môn ${i}`
        }
      });
    }
    return mockGiaoVienAccounts;
  }

  private generateMockClasses() {
    const mockClasses: QuanLiLop[] = [];
    for (let i = 0; i < 10; i++) {
      mockClasses.push({
        id: i,
        tenLop: `Lớp ${i}`,
        idGiaoVien: i,
        idNhomLop: i,
        tenPhong: `Phòng ${i}`,
        viTri: `Tầng ${i}`,
      });
    }
    return mockClasses;
  }


  onSearch(event?: Event) {
    if (event) {
      this.searchTerm = (event.target as HTMLInputElement).value;
    } else {
      this.searchTerm = '';
    }

    this.isLoading = true;

    this.filtered_list_lop = this.list_lop.filter(lop =>
      lop.tenLop.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      lop.tenPhong.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      lop.viTri.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      lop.thongTinGiaoVien?.hoTen.toLowerCase().includes(this.searchTerm.toLowerCase())
    );

    this.totalPage = Math.ceil(this.filtered_list_lop.length / this.rowPerPage);

    if (event) {
      this.currentPage = 1;
    }
    this.isLoading = false;
  }

  handlePageChange(page: number) {
    this.currentPage = page;
  }

  handleOpenUpdateLopForm(lop: QuanLiLop) {
    this.selectedLop = { ...lop };
    this.openUpdateLopForm = true;
  }
  handleUpdateLop(updatedLop: QuanLiLop) {
    this.classService.update(updatedLop).subscribe({
      next: (res) => {
        this.list_lop = this.list_lop.map(lop => lop.id === res.id ? res : lop);
        this.onSearch();
        this.closeForm();
      },
      error: (error) => {
        console.error('Error updating lop:', error);
      }
    });
  }

  handleOpenDeleteLopConfirmation(lop: QuanLiLop) {
    this.selectedLop = { ...lop };
    this.openDeleteConfirmationDialog = true;
  }
  handleDeleteLop() {
    this.classService.delete(this.selectedLop.id).subscribe({
      next: (_) => {
        this.list_lop = this.list_lop.filter(lop => lop.id !== this.selectedLop.id);
      },
      error: (error) => {
        console.error('Error deleting lop:', error);
      }
    });
    this.openDeleteConfirmationDialog = false;
  }

  handleOpenAddLopForm() {
    this.openAddLopForm = true;
  }
  handleSaveNewLop(newLop: QuanLiLop) {
    this.classService.add(newLop).subscribe({
      next: (res) => {
        this.list_lop.push(res);
        this.onSearch();
        this.closeForm();
      },
      error: (error) => {
        console.error('Error saving new lop:', error);
      }
    });
  }

  closeForm() {
    this.openUpdateLopForm = false;
    this.openAddLopForm = false;
    this.openDeleteConfirmationDialog = false;
  }
}

export function validateData(formGroup: FormGroup) {
  const errors: any = {};
  const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
  const phoneNumberPattern = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;


  return errors;
}
