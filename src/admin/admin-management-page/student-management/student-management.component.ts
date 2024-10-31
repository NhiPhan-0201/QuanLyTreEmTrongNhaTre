import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ThongTinTre } from '../../../models/ThongTinTre';
import { StudentAddNewFormComponent } from './student-add-new-form/student-add-new-form.component';
import { StudentUpdateFormComponent } from './student-update-form/student-update-form.component';
import { StudentDeleteConfirmationDialogComponent } from './student-delete-confirmation-dialog/student-delete-confirmation-dialog.component';
import { ThongTinTreService } from '../../../APIService/ThontTinTre.service';
import { UploadService } from '../../../APIService/upload.service';
import { switchMap } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { QuanLiLopService } from '../../../APIService/QuanLiLop.service';
import { QuanLiLop } from '../../../models/QuanLiLop';
import { error } from 'node:console';
import { AccountService } from '../../../APIService/Account.service';
import { Account } from '../../../models/Account';
import { AccountRole, AccountStatus, Gender } from '../../../constants/enums';

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
  filteredStudents: ThongTinTre[] = [];
  currentPage: number = 1;
  totalPage: number = 1;


  openAddStudentForm: boolean = false;
  openUpdateStudentForm: boolean = false;
  openDeleteConfirmationDialog: boolean = false;
  selectedStudent: ThongTinTre | null = null;

  constructor(private thongTinTreService: ThongTinTreService, private quanLiLopService: QuanLiLopService, private accountService: AccountService, private uploadService: UploadService) { }
  ngOnInit(): void {
    this.onLoad();
  }

  onLoad() {
    this.isLoading = true;
    this.quanLiLopService.getAll().subscribe({
      next: (res) => {
        this.classes = res.data
        this.loadParents();
      },
      error: (error) => {
        this.classes = this.generateMockClasses();
        this.loadParents();
      }
    });
  }

  loadParents() {
    this.accountService.getParents().subscribe({
      next: (res) => {
        this.parents = res.data;
        this.loadStudents();
      },
      error: (error) => {
        this.parents = this.generateMockParents();
        this.loadStudents();
      }
    })
  }

  loadStudents() {
    this.thongTinTreService.getAll().subscribe({
      next: (res) => {
        this.students = res.data;
        this.students.map((s) => {
          s.quanLiLop = this.classes.find((c) => c.id = s.classId);
          return s;
        })
        this.onSearchStudent();
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Lỗi khi tải students:', err);
        this.students = this.generateMockStudents();
        this.isLoading = false;
        this.onSearchStudent();
      }
    });
  }

  generateMockClasses(): QuanLiLop[] {
    let classes: QuanLiLop[] = [];
    for (let i = 0; i < 10; i++) {
      let j = i + 1;
      classes.push({
        id: j,
        idGiaoVien: j,
        tenLop: "Lớp " + (j),
        tenPhong: "Phòng " + (j),
        viTri: "",
        idNhomLop: j
      })
    }
    return classes;
  }

  generateMockParents(): Account[] {
    let parents: Account[] = [];
    for (let i = 0; i < 10; i++) {
      parents.push({
        id: i,
        username: `phuhuynh${i}`,
        password: '123456',
        role: AccountRole.PhuHuynh,
        status: AccountStatus.Enabled,
        phuHuynhId: i,
        phuHuynh: {
          id: i,
          diaChi: `Địa chỉ ${i}`,
          ...(i % 2 === 0
            ? { hoTenCha: `Phụ huynh ${i}` }
            : { hoTenMe: `Phụ huynh ${i}` })
        }
      });
    }
    return parents;
  }

  generateMockStudents(): ThongTinTre[] {
    let students: ThongTinTre[] = [];
    for (let i = 0; i < 100; i++) {
      students.push({
        id: i,
        hoTen: `Học sinh ${i}`,
        gioiTinh: i % 2 === 0 ? Gender.Nam : Gender.Nu,
        ngaySinh: Date.now().toString(),
        anh: 'https://picsum.photos/' + (i + 100),
        classId: i % 10 + 1,
        quanLiLop: this.classes.find((c) => c.id == i % 10 + 1)
      });
    }
    return students;
  }

  onSearchStudent = (event?: Event) => {
    if (event?.target) {
      this.searchValue = (event.target as HTMLInputElement).value;
    }

    this.filteredStudents = this.students.filter(student => {
      return student.hoTen.toLowerCase().includes(this.searchValue.toLowerCase());
    });

    this.totalPage = Math.ceil(this.filteredStudents.length / 10);
    this.currentPage = 1;
  }

  handleOpenAddStudentForm() {
    this.openAddStudentForm = true;
  }
  handleOpenUpdateStudentForm(student: ThongTinTre) {
    console.log(student)
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

  handleSaveNewStudent({ student, anh }: { student: ThongTinTre; anh?: File | null }) {
    let upload$ = anh
      ? this.uploadService.uploadImage(anh).pipe(
        switchMap((data) => {
          student.anh = data.DT;
          return this.thongTinTreService.add(student);
        })
      )
      : this.thongTinTreService.add(student);

    upload$.subscribe((data) => {
      this.students.push(data.data);
      this.onSearchStudent();
      this.closeForm();
    });
  }

  handleUpdateStudent({ student, anh: { file, oldFileChanged } }: { student: ThongTinTre; anh: { file: File | null, oldFileChanged: boolean } }) {
    console.log(student)
    const upload$ = file && oldFileChanged
      ? this.uploadService.uploadImage(file).pipe(
        switchMap((data) => {
          student.anh = data.DT;
          return this.thongTinTreService.update(student);
        })
      )
      : this.thongTinTreService.update(student);

    upload$.subscribe((res) => {
      const index = this.students.findIndex(s => s.id === res.data.id);
      this.students[index] = res.data;
      this.onSearchStudent();
      this.closeForm();
    });
  }


  handleDeleteStudent() {
    if (this.selectedStudent) {
      this.thongTinTreService.delete(this.selectedStudent.id).subscribe(() => {
        this.students = this.students.filter(s => s.id !== this.selectedStudent?.id);
        this.selectedStudent = null;
        this.onSearchStudent();
        this.closeForm();
      });
    }
  }
}

export function validateData(formGroup: FormGroup): any {
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
}