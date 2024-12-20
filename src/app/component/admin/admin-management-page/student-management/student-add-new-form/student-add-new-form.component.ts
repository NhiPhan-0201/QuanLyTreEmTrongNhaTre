import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Account } from '../../../../../../models';
import { Gender } from '../../../../../../constants/enums';
import { QuanLiLop, ThongTinTre } from '../../../../../../models';
import { CommonModule } from '@angular/common';
import { validateData } from '../student-management.component';
import { ThongTinTreService, UploadService } from '../../../../../../APIService';
import { ToastService } from '../../../../../service';
import { catchError, Observable, switchMap } from 'rxjs';

@Component({
  selector: 'app-student-add-new-form',
  templateUrl: './student-add-new-form.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule]
})
export class StudentAddNewFormComponent {
  @Input() classes: QuanLiLop[] = [];
  @Input() parents: Account[] = [];
  @Output() closeForm = new EventEmitter<void>();
  @Output() saveStudent = new EventEmitter<ThongTinTre>();

  newStudentForm: FormGroup;
  filteredParents: Account[] = [];
  errors!: any;

  MALE_GENDER = Gender.Nam;
  FEMALE_GENDER = Gender.Nu;

  anhHocSinhPreview: string | ArrayBuffer | null = null;
  anhHocSinhUploaded: File | null = null;
  anhHocSinhFileName: string | null = null;

  constructor(private fb: FormBuilder, private uploadService: UploadService, private studentService: ThongTinTreService, private toastService: ToastService) {
    this.newStudentForm = this.fb.group({
      hoTen: ['', Validators.required],
      gioiTinh: ['', Validators.required],
      ngaySinh: ['', Validators.required],
      anh: [null],
      classId: [1, Validators.required],
      phuHuynhId: [-1, Validators.required],
      thongTinPhuHuynh: null
    });
    this.subscribeToFormControls(this.newStudentForm);
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
        this.errors = validateData(this.newStudentForm, this.anhHocSinhUploaded);
      }, 100);
    });
  }

  onImagePicked(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input && input.files && input.files.length > 0) {
      this.anhHocSinhUploaded = input.files[0];
      this.errors = validateData(this.newStudentForm, this.anhHocSinhUploaded);
      const reader = new FileReader();
      reader.onload = () => {
        this.anhHocSinhPreview = reader.result;
      };
      reader.readAsDataURL(this.anhHocSinhUploaded);
    }
  }

  cancelUploadAnh() {
    this.anhHocSinhFileName = null;
    this.anhHocSinhPreview = null;
    this.anhHocSinhUploaded = null;
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

  save() {
    this.errors = validateData(this.newStudentForm, this.anhHocSinhUploaded);

    if (Object.keys(this.errors).length === 0) {
      let uploadObservable: Observable<ThongTinTre>;

      this.newStudentForm.patchValue({ thongTinPhuHuynh: this.parents.find(parent => parent.id === this.newStudentForm.value.phuHuynhId) });

      if (this.anhHocSinhUploaded) {
        try {
          uploadObservable = this.uploadService.uploadImage(this.anhHocSinhUploaded).pipe(
            switchMap((res) => {
              this.newStudentForm.patchValue({ anh: res.link });
              return this.studentService.add(this.newStudentForm.value);
            }),
            catchError((err) => {
              throw err;
            })
          );
        } catch (err) {
          this.errors.anh = 'Có lỗi xảy ra khi tải ảnh lên';
          this.toastService.showError('Có lỗi xảy ra khi tải ảnh lên');
          return;
        }
      } else {
        uploadObservable = this.studentService.add(this.newStudentForm.value);
      }

      uploadObservable.subscribe({
        next: (res) => {
          this.saveStudent.emit(res);
          this.toastService.showSuccess('Thêm học sinh thành công');
          this.closeForm.emit();
        },
        error: (err) => {
          console.log(err)
          this.toastService.showError('Có lỗi xảy ra khi thêm học sinh');
        }
      });
    }
  }

  close() {
    this.closeForm.emit();
  }
}
