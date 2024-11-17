import { Component, OnInit } from '@angular/core';
import { ThongTinGiaoVien, NhomLop, QuanLiLop } from '../../../../../models';
import { NhomLopService, QuanLiLopService, ThongTinGiaoVienService } from '../../../../../APIService';
import { FormGroup } from '@angular/forms';
import { ClassAddNewFormComponent } from './class-add-new-form/class-add-new-form.component';
import { ClassUpdateFormComponent } from './class-update-form/class-update-form.component';
import { ClassDeleteConfirmationDialogComponent } from './class-delete-confirmation-dialog/class-delete-confirmation-dialog.component';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../../../service';

@Component({
  selector: 'app-class-management',
  standalone: true,
  imports: [ClassAddNewFormComponent, ClassUpdateFormComponent, ClassDeleteConfirmationDialogComponent, CommonModule],
  templateUrl: './class-management.component.html'
})
export class ClassManagementComponent implements OnInit {
  searchTerm: string = '';
  isLoading: boolean = false;
  openUpdateLopForm: boolean = false;
  openDeleteConfirmationDialog: boolean = false;
  openAddLopForm: boolean = false;

  selectedLop!: QuanLiLop;

  list_nhomLop!: NhomLop[];
  list_giaoVien!: ThongTinGiaoVien[];
  list_lop!: QuanLiLop[];
  filtered_list_lop!: QuanLiLop[];

  currentPage: number = 1;
  totalPage: number = 1;
  rowPerPage: number = 5;

  constructor(private toastService: ToastService, private classService: QuanLiLopService, private thongTinGiaoVienService: ThongTinGiaoVienService, private classGroupService: NhomLopService) { }

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
        this.toastService.showError('Lỗi khi tải danh sách lớp');
      }
    });
  }

  loadGiaoVien() {
    this.isLoading = true;
    this.thongTinGiaoVienService.getAll().subscribe({
      next: (res) => {
        this.list_giaoVien = res;
        this.loadNhomLop();
      },
      error: (error) => {
        this.toastService.showError('Lỗi khi tải danh sách giáo viên');
      }
    });
  }

  mapGiaoVien_Lop(idGiaoVien: number) {
    return this.list_giaoVien.find(gv => gv.id === idGiaoVien);
  }

  loadNhomLop() {
    this.isLoading = true;
    this.classGroupService.getAll().subscribe({
      next: (res) => {
        this.list_nhomLop = res;
        console.log('list_lop:', this.list_lop);
        this.isLoading = false;
        this.onSearch();
      },
      error: (error) => {
        console.error('Lỗi khi tải list_nhomLop:', error);
        this.isLoading = false;
      }
    });
  }

  mapLop_NhomLop(idNhomLop: number | undefined) {
    if (!idNhomLop) return undefined;
    return this.list_nhomLop.find(nl => nl.id === idNhomLop);
  }

  onSearch(event?: Event) {
    if (event) {
      this.currentPage = 1;
      this.searchTerm = (event.target as HTMLInputElement).value;
    }

    this.isLoading = true;

    this.filtered_list_lop = this.list_lop.filter(lop =>
      lop.tenLop.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      lop.tenPhong.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      lop.viTri.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      lop.thongTinGiaoVien?.hoTen.toLowerCase().includes(this.searchTerm.toLowerCase())
    );

    this.totalPage = Math.ceil(this.filtered_list_lop.length / this.rowPerPage);
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
    console.log('updatedLop:', updatedLop);
    this.list_lop = this.list_lop.map(lop => {
      if (lop.id === updatedLop.id) {
        return updatedLop;
      }
      return lop;
    });
    this.filtered_list_lop = this.filtered_list_lop.map(lop => {
      if (lop.id === updatedLop.id) {
        return updatedLop;
      }
      return lop;
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
    this.list_lop.push(newLop);
    this.filtered_list_lop.push(newLop);
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

  if (!formGroup.get('tenLop')?.value) {
    errors.tenLop = 'Tên lớp không được để trống';
  }

  if (!formGroup.get('idGiaoVien')?.value || parseInt(formGroup.get('idGiaoVien')?.value) === -1) {
    errors.idGiaoVien = 'Giáo viên không được để trống';
  }

  if (!formGroup.get('tenPhong')?.value) {
    errors.tenPhong = 'Tên phòng không được để trống';
  }

  if (!formGroup.get('viTri')?.value) {
    errors.viTri = 'Vị trí không được để trống';
  }

  return errors;
}
