import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ThongTinTre } from '../../../models/ThongTinTre';
import { StudentAddNewFormComponent } from './student-add-new-form/student-add-new-form.component';
import { StudentUpdateFormComponent } from './student-update-form/student-update-form.component';
import { StudentDeleteConfirmationDialogComponent } from './student-delete-confirmation-dialog/student-delete-confirmation-dialog.component';
import { ThongTinTreService } from '../../../APIService/ThontTinTre.service';
import { UploadService } from '../../../APIService/upload.service';
import { switchMap } from 'rxjs';

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
  students: ThongTinTre[] = [];
  filteredStudents: ThongTinTre[] = [];
  currentPage: number = 1;
  totalPage: number = 1;

  openAddStudentForm: boolean = false;
  openUpdateStudentForm: boolean = false;
  openDeleteConfirmationDialog: boolean = false;
  selectedStudent: ThongTinTre | null = null;

  constructor(private thongTinTreService: ThongTinTreService, private uploadService: UploadService) { }
  ngOnInit(): void {
    this.isLoading = true;
    this.thongTinTreService.getAll().subscribe((data) => {
      this.students = data;
      this.onSearchStudent();
      this.isLoading = false;
    });
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
      this.students.push(data);
      this.onSearchStudent();
      this.closeForm();
    });
  }

  handleUpdateStudent({ student, anh }: { student: ThongTinTre; anh?: File | null }) {
    const upload$ = anh
      ? this.uploadService.uploadImage(anh).pipe(
        switchMap((data) => {
          student.anh = data.DT;
          return this.thongTinTreService.update(student);
        })
      )
      : this.thongTinTreService.update(student);

    upload$.subscribe((data) => {
      const index = this.students.findIndex(s => s.id === data.id);
      this.students[index] = data;
      this.onSearchStudent();
      this.closeForm();
    });
  }


  handleDeleteStudent() {
    if (this.selectedStudent) {
      this.thongTinTreService.delete(this.selectedStudent.id).subscribe(() => {
        this.students = this.students.filter(s => s.id !== this.selectedStudent?.id);
        this.onSearchStudent();
        this.closeForm();
      });
    }
  }
}
