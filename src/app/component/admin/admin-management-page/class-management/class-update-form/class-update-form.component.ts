import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { validateData } from '../class-management.component';
import { Account, NhomLop, QuanLiLop } from '../../../../../../models';
import { QuanLiLopService } from '../../../../../../APIService';
import { ToastService } from '../../../../../service';

@Component({
  selector: 'app-class-update-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './class-update-form.component.html'
})
export class ClassUpdateFormComponent implements OnChanges {
  @Input() selectedLop!: QuanLiLop;
  @Input() giaoViens!: Account[];
  @Input() listNhomLop!: NhomLop[];
  @Output() saveLop: EventEmitter<any> = new EventEmitter<any>();
  @Output() closeForm: EventEmitter<any> = new EventEmitter<any>();

  updateLopForm!: FormGroup;
  errors: any = {};


  constructor(private fb: FormBuilder, private toastService: ToastService, private quanLiLopService: QuanLiLopService) { }

  ngOnChanges() {
    this.updateLopForm = this.fb.group({
      tenLop: [this.selectedLop.tenLop, [Validators.required]],
      idGiaoVien: [this.selectedLop.idGiaoVien || -1, [Validators.required]],
      tenPhong: [this.selectedLop.tenPhong, [Validators.required]],
      viTri: [this.selectedLop.viTri, [Validators.required]],
      idNhomLop: [this.selectedLop.idNhomLop || -1, [Validators.nullValidator]]
    });

    this.subscribeToFormControls(this.updateLopForm);
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
      this.errors = validateData(this.updateLopForm);
    });
  }

  close() {
    this.closeForm.emit();
  }

  save() {
    this.errors = validateData(this.updateLopForm);

    if (Object.keys(this.errors).length === 0) {
      this.quanLiLopService.update(this.updateLopForm.value).subscribe({
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

  getKeys(obj: any) {
    return Object.keys(obj);
  }
}
