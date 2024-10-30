import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ThongTinTre } from '../../../../models/ThongTinTre';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Gender } from '../../../../constants/enums';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-student-add-new-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './student-add-new-form.component.html',
  styleUrl: './student-add-new-form.component.css'
})
export class StudentAddNewFormComponent {
  MALE_GENDER: string = Gender.Nam;
  FEMALE_GENDER: string = Gender.Nu;

  newStudentForm!: FormGroup;
  anhHocSinhPreview: string | ArrayBuffer | null = null;
  anhHocSinhUploaded!: File | null;
  anhHocSinhFileName: string = '';

  @Output() closeForm: EventEmitter<void> = new EventEmitter<void>();
  @Output() saveStudent: EventEmitter<{ student: ThongTinTre; anh: File | null }> = new EventEmitter<{ student: ThongTinTre; anh: File | null }>();

  constructor(private fb: FormBuilder) {
    this.newStudentForm = this.fb.group({
      hoTen: [''],
      gioiTinh: [''],
      ngaySinh: [''],
      anh: [''],
    });
  }

  onImagePicked(event: Event) {

    const input = event.target as HTMLInputElement;
    if (input && input.files && input.files.length > 0) {
      this.anhHocSinhUploaded = input.files[0];
      this.anhHocSinhFileName = this.anhHocSinhUploaded.name;
      let reader = new FileReader();

      reader.onload = (e) => {
        this.anhHocSinhPreview = reader.result;
      };

      reader.readAsDataURL(this.anhHocSinhUploaded);
    }
    input.value = '';
  }

  cancelUploadAnh() {
    this.anhHocSinhUploaded = null;
    this.anhHocSinhPreview = null;
    this.anhHocSinhFileName = '';
  }

  save() {
    const newStudent: ThongTinTre = {
      id: -1,
      hoTen: this.newStudentForm.value.hoTen,
      gioiTinh: this.newStudentForm.value.gioiTinh,
      ngaySinh: this.newStudentForm.value.ngaySinh,
      anh: this.anhHocSinhFileName,
    };

    this.saveStudent.emit({ student: newStudent, anh: this.anhHocSinhUploaded });
  }

  close() {
    this.closeForm.emit();
  }
}
