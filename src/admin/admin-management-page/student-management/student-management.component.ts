import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ThongTinTre } from '../../../models/ThongTinTre';
import { StudentAddNewFormComponent } from './student-add-new-form/student-add-new-form.component';
import { StudentUpdateFormComponent } from './student-update-form/student-update-form.component';
import { StudentDeleteConfirmationDialogComponent } from './student-delete-confirmation-dialog/student-delete-confirmation-dialog.component';

@Component({
  selector: 'app-student-management',
  standalone: true,
  imports: [CommonModule, StudentAddNewFormComponent, StudentUpdateFormComponent, StudentDeleteConfirmationDialogComponent],
  templateUrl: './student-management.component.html',
  styleUrl: './student-management.component.css'
})
export class StudentManagementComponent implements OnInit {

  isLoading: boolean = false;
  students: ThongTinTre[] = [];
  filteredStudents: ThongTinTre[] = [];
  currentPage: number = 1;
  totalPage: number = 1;

  openAddAccountForm: boolean = false;
  openUpdateStudentForm: boolean = false;
  openDeleteConfirmationDialog: boolean = false;
  selectedStudent: ThongTinTre | null = null;

  constructor() { }
  ngOnInit(): void {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
  }

  onSearchStudent(event: Event) {
    if (event.target) {
      const searchValue = (event.target as HTMLInputElement).value;
      this.filteredStudents = this.students.filter(student => {
        return student.hoTen.toLowerCase().includes(searchValue.toLowerCase());
      });

      this.totalPage = Math.ceil(this.filteredStudents.length / 10);
      this.currentPage = 1;
    }
  }

  handleOpenAddStudentForm() {
    this.openAddAccountForm = true;
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
    this.openAddAccountForm = false;
    this.openUpdateStudentForm = false;
    this.openDeleteConfirmationDialog = false;
  }

  handleSaveNewAccount(student: ThongTinTre) {
    console.log('Save new student: ', student);
  }

  handleUpdateAccount(student: ThongTinTre) {
    console.log('Update student: ', student);
  }

  handleDeleteAccount() {
    console.log('Delete student: ');
  }
}
