import { map } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { StudentAddNewFormComponent } from './student-add-new-form/student-add-new-form.component';
import { StudentUpdateFormComponent } from './student-update-form/student-update-form.component';
import { StudentDeleteConfirmationDialogComponent } from './student-delete-confirmation-dialog/student-delete-confirmation-dialog.component';
import { PhuHuynhTreService, UploadService } from '../../../../../APIService';
import { switchMap } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { ThongTinTre, QuanLiLop, Account, ThongTinPhuHuynh, PhuHuynhTre } from '../../../../../models';
import { AccountRole, AccountStatus, Gender } from '../../../../../constants/enums';
import { QuanLiLopService, AccountService, ThongTinTreService } from '../../../../../APIService';
import { ToastService } from '../../../../service';
import { error } from 'console';

@Component({
  selector: 'app-student-management',
  standalone: true,
  imports: [CommonModule, StudentAddNewFormComponent, StudentUpdateFormComponent, StudentDeleteConfirmationDialogComponent],
  templateUrl: './student-management.component.html',
  styleUrl: './student-management.component.css'
})
export class StudentManagementComponent implements OnInit {

  searchValue: string = '';

  isLoading: boolean = false;
  classes: QuanLiLop[] = [];
  parents: Account[] = [];
  students: ThongTinTre[] = [];
  students_parents: PhuHuynhTre[] = [];
  filteredStudents: ThongTinTre[] = [];
  currentPage: number = 1;
  totalPage: number = 1;
  rowPerPage: number = 5;


  openAddStudentForm: boolean = false;
  openUpdateStudentForm: boolean = false;
  openDeleteConfirmationDialog: boolean = false;
  selectedStudent: ThongTinTre | null = null;

  constructor(private thongTinTreService: ThongTinTreService, private quanLiLopService: QuanLiLopService,
    private accountService: AccountService, private uploadService: UploadService, private toastService: ToastService, private phuHuynhTreService: PhuHuynhTreService) { }
  ngOnInit(): void {
    this.onLoad();
  }

  onLoad() {
    this.isLoading = true;
    this.loadLop();
  }

  loadLop() {
    this.isLoading = true;
    this.quanLiLopService.getAll().subscribe({
      next: (res) => {
        this.classes = res
        this.loadParents();
      },
      error: (error) => {
        console.error(error);
        this.toastService.showError('Lỗi khi tải danh sách lớp');
      }
    });
  }

  loadParents() {
    this.accountService.getParents().subscribe({
      next: (res) => {
        this.parents = res
        this.loadStudentParents();
      },
      error: (error) => {
        console.error(error);
        this.toastService.showError('Lỗi khi tải danh sách phụ huynh');
      }
    })
  }

  loadStudentParents() {
    this.phuHuynhTreService.getAll().subscribe({
      next: (res) => {
        this.students_parents = res
        this.loadStudents();
      },
      error: (err) => {
        console.error(err);
        this.toastService.showError('Lỗi khi tải danh sách phụ huynh trẻ');
      }
    });
  }


  loadStudents() {
    this.thongTinTreService.getAll().subscribe({
      next: (res) => {
        this.students = res
        this.mapStudentClasses();
        this.mapStudentParents();
        this.onSearchStudent();
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
        this.toastService.showError('Lỗi khi tải danh sách học sinh');
      }
    });
  }

  mapStudentClasses() {
    this.students.map((s) => {
      s.quanLiLop = this.classes.find((c) => c.id === s.classId);
      return s;
    })
  }

  mapStudentParents() {
    this.students.map((s) => {
      let phuHuynhTre = this.students_parents.find((p) => p.tre.id === s.id);
      if (phuHuynhTre) {
        let phuHuynh = this.parents.find((p) => p.phuHuynh?.id === phuHuynhTre.phuHuynh.id);
        s.thongTinPhuHuynh = phuHuynh;
        s.phuHuynhId = phuHuynh?.id || -1;
      }
    });
  }

  onSearchStudent = (event?: Event) => {
    if (event?.target) {
      this.searchValue = (event.target as HTMLInputElement).value;
    }

    this.filteredStudents = this.students.filter(student => {
      return student.hoTen.toLowerCase().includes(this.searchValue.toLowerCase());
    });

    this.totalPage = Math.ceil(this.filteredStudents.length / this.rowPerPage);
    if (event)
      this.currentPage = 1;
  }

  handleOpenAddStudentForm() {
    this.openAddStudentForm = true;
  }
  handleOpenUpdateStudentForm(student: ThongTinTre) {
    this.selectedStudent = student;
    this.openUpdateStudentForm = true;
  }
  handleOpenDeleteStudentConfirmation(student: ThongTinTre) {
    this.selectedStudent = student;
    this.openDeleteConfirmationDialog = true;
  }

  handlePageChange(page: number) {
    this.currentPage = page;
  }

  closeForm() {
    this.openAddStudentForm = false;
    this.openUpdateStudentForm = false;
    this.openDeleteConfirmationDialog = false;
  }
  mapStudentParentsBeforeSave(student: any) {
    let phuHuynh = this.parents.find((p) => p.id === student.phuHuynhId);
    student.thongTinPhuHuynh = phuHuynh;
    return student;
  }

  handleSaveNewStudent(student: ThongTinTre) {
    this.students.push(student);
    this.filteredStudents.push(student);
  }

  handleUpdateStudent(student: ThongTinTre) {
    this.students = this.students.map(s => s.id === student.id ? student : s);
    this.filteredStudents = this.filteredStudents.map(s => s.id === student.id ? student : s);
  }


  handleDeleteStudent() {
    if (this.selectedStudent) {
      this.thongTinTreService.delete(this.selectedStudent.id).subscribe({
        next: () => {
          this.students = this.students.filter(s => s.id !== this.selectedStudent?.id);
          this.selectedStudent = null;
          this.onSearchStudent();

          this.closeForm();
        },
        error: (err) => {
          this.toastService.showError('Xóa học sinh thất bại');
        }
      });
    }
  }
}

export function validateData(formGroup: FormGroup, anh: File | null): any {
  let errors: any = {};

  if (!formGroup.value.hoTen) {
    errors.hoTen = 'Họ tên không được để trống';
  }
  if (!formGroup.value.gioiTinh) {
    errors.gioiTinh = 'Giới tính không được để trống';
  }
  if (!formGroup.value.ngaySinh) {
    errors.ngaySinh = 'Ngày sinh không được để trống';
  }

  if (!formGroup.value.classId) {
    errors.classId = 'Lớp không được để trống';
  }

  if (formGroup.value.phuHuynhId === -1) {
    errors.phuHuynhId = 'Phụ huynh không được để trống';
  }

  if (!anh) {
    errors.anh = 'Ảnh không được để trống';
  }

  return errors;
}
