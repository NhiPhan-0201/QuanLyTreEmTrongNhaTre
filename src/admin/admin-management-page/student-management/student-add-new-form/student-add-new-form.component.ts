import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ThongTinTre } from '../../../../models/ThongTinTre';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Gender } from '../../../../constants/enums';
import { CommonModule } from '@angular/common';
import { QuanLiLop } from '../../../../models/QuanLiLop';
import { Account } from '../../../../models/Account';

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
  anhHocSinhUploaded!: File;
  anhHocSinhFileName: string = '';

  @Input() classes: QuanLiLop[] = [];
  @Input() parents: Account[] = [];
  @Output() closeForm: EventEmitter<void> = new EventEmitter<void>();
  @Output() saveStudent: EventEmitter<{ student: ThongTinTre; anh: File }> = new EventEmitter<{ student: ThongTinTre; anh: File }>();

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
      this.newStudentForm.patchValue({ anh: this.anhHocSinhFileName });
      let reader = new FileReader();

      reader.onload = (e) => {
        this.anhHocSinhPreview = reader.result;
      };

      reader.readAsDataURL(this.anhHocSinhUploaded);
    }
    input.value = '';
  }

  save() {
    this.saveStudent.emit({ student: this.newStudentForm.value, anh: this.anhHocSinhUploaded });
  }

  close() {
    this.closeForm.emit();
  }
}
