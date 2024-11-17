import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { validateData } from '../class-management.component';
import { ThongTinGiaoVien, NhomLop, QuanLiLop } from '../../../../../../models';
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
  @Input() giaoViens!: ThongTinGiaoVien[];
  @Input() listNhomLop!: NhomLop[];
  @Output() saveLop: EventEmitter<any> = new EventEmitter<any>();
  @Output() closeForm: EventEmitter<any> = new EventEmitter<any>();

  updateLopForm!: FormGroup;
  errors: any = {};


  constructor(private fb: FormBuilder, private toastService: ToastService, private quanLiLopService: QuanLiLopService) { }

  ngOnChanges() {
    this.updateLopForm = this.fb.group({
      id: [this.selectedLop.id],
      tenLop: [this.selectedLop.tenLop],
      idGiaoVien: [this.selectedLop.idGiaoVien || -1],
      tenPhong: [this.selectedLop.tenPhong],
      viTri: [this.selectedLop.viTri],
      idNhomLop: [this.selectedLop.idNhomLop || -1]
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
      if (parseInt(this.updateLopForm.value.idGiaoVien) === -1)
        delete this.updateLopForm.value.idGiaoVien;
      else
        this.updateLopForm.value.idGiaoVien = parseInt(this.updateLopForm.value.idGiaoVien);

      if (parseInt(this.updateLopForm.value.idNhomLop) === -1)
        delete this.updateLopForm.value.idNhomLop;
      else
        this.updateLopForm.value.idNhomLop = parseInt(this.updateLopForm.value.idNhomLop);

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
