import { filter } from 'rxjs/operators';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { ThongTinTre } from '../../../../../../models/ThongTinTre';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Gender } from '../../../../../../constants/enums';
import { QuanLiLop } from '../../../../../../models/QuanLiLop';
import { Account } from '../../../../../../models/Account';
import { validateData } from '../student-management.component';
import { catchError, Observable, switchMap } from 'rxjs';
import { ThongTinTreService, UploadService } from '../../../../../../APIService';
import { ToastService } from '../../../../../service';

@Component({
  selector: 'app-student-update-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './student-update-form.component.html'
})
export class StudentUpdateFormComponent implements OnChanges {

  MALE_GENDER: string = Gender.Nam;
  FEMALE_GENDER: string = Gender.Nu;

  updateStudentForm!: FormGroup;
  errors: any = {};
  filteredParents: Account[] = [];
  oldParentAccount!: Account;

  anhHocSinhPreview!: string | ArrayBuffer | null;
  anhHocSinhUploaded!: File | null;
  oldFileChanged!: boolean;
  oldFileUrl!: string;


  @Input() student!: ThongTinTre | null;
  @Input() classes: QuanLiLop[] = [];
  @Input() parents: Account[] = [];
  @Output() closeForm: EventEmitter<void> = new EventEmitter<void>();
  @Output() updateStudent: EventEmitter<ThongTinTre> = new EventEmitter<ThongTinTre>();

  constructor(private fb: FormBuilder, private uploadService: UploadService, private studentService: ThongTinTreService, private toastService: ToastService) {
    this.updateStudentForm = this.fb.group({
      id: ['', Validators.required],
      hoTen: ['', Validators.required],
      gioiTinh: ['', Validators.required],
      ngaySinh: ['', Validators.required],
      classId: [-1, Validators.required],
      anh: ['', Validators.required],
      phuHuynhId: [-1, Validators.required],
      thongTinPhuHuynh: null
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    const studentChange = changes['student'];

    if (studentChange && studentChange.currentValue && this.student) {
      this.updateStudentForm.patchValue({ ...this.student, classId: this.student.classId || -1 });

      this.oldFileUrl = this.student.anh || '';
      this.anhHocSinhPreview = this.oldFileUrl === '' ? null : this.oldFileUrl;
      this.oldFileChanged = false;
      this.anhHocSinhUploaded = null;
    }

    this.oldParentAccount = studentChange.currentValue?.thongTinPhuHuynh || null;
    this.subscribeToFormControls(this.updateStudentForm);
  }

  subscribeToFormControls(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach((key) => {
      const control = formGroup.get(key);

      if (control) {
        if (control instanceof FormGroup) {
          this.subscribeToFormControls(control);
        } else {
          this.subscribeToValueChanges(control);
        }
      }
    });
  }

  private subscribeToValueChanges(control: AbstractControl): void {
    control.valueChanges.subscribe(() => {
      setTimeout(() => {
        this.errors = validateData(this.updateStudentForm, this.anhHocSinhUploaded);
      }, 100);
    });
  }


  onImagePicked(event: Event) {

    const input = event.target as HTMLInputElement;
    if (input && input.files && input.files.length > 0) {
      this.anhHocSinhUploaded = input.files[0];
      this.errors = validateData(this.updateStudentForm, this.anhHocSinhUploaded);
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
    this.errors = validateData(this.updateStudentForm, this.anhHocSinhUploaded, this.oldFileChanged);
    if (Object.keys(this.errors).length === 0) {
      let uploadObservable: Observable<ThongTinTre>;

      this.updateStudentForm.patchValue({ thongTinPhuHuynh: this.parents.find((parent) => parent.id === this.updateStudentForm.value.phuHuynhId) });

      if (this.anhHocSinhUploaded) {
        try {
          uploadObservable = this.uploadService.uploadImage(this.anhHocSinhUploaded).pipe(
            switchMap((res) => {
              this.updateStudentForm.patchValue({ anh: res.link });
              return this.studentService.update(this.updateStudentForm.value);
            }),
            catchError((err) => {
              throw err;
            })
          );
        } catch (err) {
          this.errors = { ...this.errors, anh: 'Có lỗi xảy ra khi tải ảnh lên' };
          this.toastService.showError('Lỗi khi tải ảnh lên server');
          return;
        }
      } else {
        uploadObservable = this.studentService.update(this.updateStudentForm.value);
      }

      uploadObservable.subscribe({
        next: (res) => {
          this.updateStudent.emit(res);
          this.close();
          this.toastService.showSuccess('Cập nhật học sinh thành công');
        },
        error: (err) => {
          this.toastService.showError('Lỗi khi cập nhật thông tin học sinh');
        }
      });
    } else {
      this.toastService.showError('Vui lòng kiểm tra lại thông tin');
      console.log(this.errors);
    }
  }

  parseInt(value: any): number {
    return parseInt(value);
  }

  onSearchParent(event: Event) {
    if (event.target) {
      const term = (event.target as HTMLInputElement).value.toLowerCase();
      if (term !== '') {
        this.filteredParents = this.parents.filter(account =>
          account.phuHuynh?.hoTenCha?.toLowerCase().includes(term) ||
          account.phuHuynh?.hoTenMe?.toLowerCase().includes(term) ||
          account.username.toLowerCase().includes(term)
        ).slice(0, 5);
      } else {
        this.filteredParents = [];
      }
    }
  }

  close() {
    this.closeForm.emit();
  }

  validate() {
    return this.updateStudentForm.valid;
  }
}
