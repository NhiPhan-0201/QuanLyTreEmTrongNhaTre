import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { ThongTinTre } from '../../../../models/ThongTinTre';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Gender } from '../../../../constants/enums';

@Component({
  selector: 'app-student-update-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './student-update-form.component.html',
  styleUrl: './student-update-form.component.css'
})
export class StudentUpdateFormComponent implements OnChanges {

  MALE_GENDER: string = Gender.Nam;
  FEMALE_GENDER: string = Gender.Nu;

  updateStudentForm!: FormGroup;
  anhHocSinhPreview: string | ArrayBuffer | null = null;
  anhHocSinhUploaded: File | null = null;
  anhHocSinhFileName: string = '';

  @Input() student!: ThongTinTre;
  @Output() closeForm: EventEmitter<void> = new EventEmitter<void>();
  @Output() updateStudent: EventEmitter<ThongTinTre> = new EventEmitter<ThongTinTre>();

  constructor(private fb: FormBuilder) {
    this.updateStudentForm = this.fb.group({
      id: [''],
      hoTen: [''],
      gioiTinh: [''],
      ngaySinh: [''],
      anh: [''],
    });

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['student'] && changes['student'].currentValue) {
      this.updateStudentForm.patchValue(this.student);
    }
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
    const updatedStudent: ThongTinTre = {
      id: this.updateStudentForm.value.id,
      hoTen: this.updateStudentForm.value.hoTen,
      gioiTinh: this.updateStudentForm.value.gioiTinh,
      ngaySinh: this.updateStudentForm.value.ngaySinh,
      anh: this.updateStudentForm.value.anh,
    };

    this.updateStudent.emit(updatedStudent);
  }

  close() {
    this.closeForm.emit();
  }
}
