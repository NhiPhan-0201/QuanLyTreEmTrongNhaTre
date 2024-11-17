import { error } from 'console';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ThongTinGiaoVien, NhomLop } from '../../../../../../models';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { validateData } from '../class-management.component';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../../../../service';
import { QuanLiLopService } from '../../../../../../APIService';


@Component({
  selector: 'app-class-add-new-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './class-add-new-form.component.html'
})
export class ClassAddNewFormComponent {

  @Input() giaoViens!: ThongTinGiaoVien[];
  @Input() listNhomLop!: NhomLop[];
  @Output() saveLop: EventEmitter<any> = new EventEmitter<any>();
  @Output() closeForm: EventEmitter<any> = new EventEmitter<any>();

  newLopForm!: FormGroup;
  errors: any = {};

  constructor(private fb: FormBuilder, private toastService: ToastService, private quanLiLopService: QuanLiLopService) {
    this.newLopForm = this.fb.group({
      tenLop: [''],
      idGiaoVien: [-1],
      tenPhong: [''],
      viTri: [''],
      idNhomLop: [-1]
    });

    this.subscribeToFormControls(this.newLopForm);
  }

  private subscribeToFormControls(formGroup: FormGroup): void {
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
      this.errors = validateData(this.newLopForm);
    });
  }

  close() {
    this.closeForm.emit();
  }

  save() {
    this.errors = validateData(this.newLopForm);

    if (Object.keys(this.errors).length === 0) {
      if (parseInt(this.newLopForm.value.idGiaoVien) === -1)
        delete this.newLopForm.value.idGiaoVien;
      else
        this.newLopForm.value.idGiaoVien = parseInt(this.newLopForm.value.idGiaoVien);

      if (parseInt(this.newLopForm.value.idNhomLop) === -1)
        delete this.newLopForm.value.idNhomLop;
      else
        this.newLopForm.value.idNhomLop = parseInt(this.newLopForm.value.idNhomLop);

      this.quanLiLopService.add(this.newLopForm.value).subscribe({
        next: (res) => {
          this.saveLop.emit(res);
          this.toastService.showSuccess('Cập nhật lớp học thành công');
          this.close();
        },
        error: (err) => {
          this.toastService.showError('Lỗi khi cập nhật lớp học');
        }
      });
    }

  }

  getKeys(obj: any): string[] {
    return Object.keys(obj);
  }
}
