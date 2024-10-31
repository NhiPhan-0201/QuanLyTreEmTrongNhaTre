import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { ThongTinTre } from '../../../../models/ThongTinTre';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Gender } from '../../../../constants/enums';
import { convertUrlToFile } from '../../../../utils/fileUtils';
import { QuanLiLop } from '../../../../models/QuanLiLop';
import { Account } from '../../../../models/Account';

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

  anhHocSinhPreview!: string | ArrayBuffer | null;
  anhHocSinhUploaded!: File | null;
  oldFileChanged!: boolean;
  oldFileUrl!: string;

  @Input() student!: ThongTinTre | null;
  @Input() classes: QuanLiLop[] = [];
  @Input() parents: Account[] = [];
  @Output() closeForm: EventEmitter<void> = new EventEmitter<void>();
  @Output() updateStudent: EventEmitter<{ student: ThongTinTre; anh: { file: File | null, oldFileChanged: boolean } }> = new EventEmitter<{ student: ThongTinTre; anh: { file: File | null, oldFileChanged: boolean } }>();

  constructor(private fb: FormBuilder) {
    this.updateStudentForm = this.fb.group({
      id: [''],
      hoTen: [''],
      gioiTinh: [''],
      ngaySinh: [''],
      classId: [''],
      anh: [''],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    const studentChange = changes['student'];

    if (studentChange && studentChange.currentValue && this.student) {
      this.updateStudentForm.patchValue(this.student);

      this.oldFileUrl = this.student.anh || '';
      this.anhHocSinhPreview = this.oldFileUrl === '' ? null : this.oldFileUrl;
      this.oldFileChanged = false;
      this.anhHocSinhUploaded = null;
    }
  }


  onImagePicked(event: Event) {

    const input = event.target as HTMLInputElement;
    if (input && input.files && input.files.length > 0) {
      this.anhHocSinhUploaded = input.files[0];
      this.oldFileChanged = true;
      let reader = new FileReader();

      reader.onload = (e) => {
        this.anhHocSinhPreview = reader.result;
      };

      reader.readAsDataURL(this.anhHocSinhUploaded);
    }
    input.value = '';
  }

  cancelUploadAnh() {
    this.anhHocSinhPreview = this.oldFileUrl || null;
    this.oldFileChanged = false;
    this.anhHocSinhUploaded = null;
  }

  save() {
    this.updateStudent.emit({ student: this.updateStudentForm.value, anh: { file: this.anhHocSinhUploaded, oldFileChanged: this.oldFileChanged } });
  }

  close() {
    this.closeForm.emit();
  }

  validate() {
    return this.updateStudentForm.valid;
  }
}
