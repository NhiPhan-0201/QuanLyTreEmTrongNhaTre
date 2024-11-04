import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { validateData } from '../class-management.component';
import { Account, NhomLop, QuanLiLop } from '../../../../../../models';

@Component({
  selector: 'app-class-update-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './class-update-form.component.html',
  styleUrl: './class-update-form.component.css'
})
export class ClassUpdateFormComponent implements OnChanges {
  @Input() selectedLop!: QuanLiLop;
  @Input() giaoViens!: Account[];
  @Input() listNhomLop!: NhomLop[];
  @Output() saveLop: EventEmitter<any> = new EventEmitter<any>();
  @Output() closeForm: EventEmitter<any> = new EventEmitter<any>();

  updateLopForm!: FormGroup;
  errors: any = {};


  constructor(private fb: FormBuilder) { }

  ngOnChanges() {
    this.updateLopForm = this.fb.group({
      tenLop: [this.selectedLop.tenLop, [Validators.required]],
      idGiaoVien: [this.selectedLop.thongTinGiaoVien?.id || -1, [Validators.required]],
      tenPhong: [this.selectedLop.tenPhong, [Validators.required]],
      viTri: [this.selectedLop.viTri, [Validators.required]],
      idNhomLop: [this.selectedLop.idNhomLop || -1, [Validators.nullValidator]]
    });

    this.subscribeToFormControls(this.updateLopForm);
  }

  private subscribeToFormControls(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach((key) => {
      const control = formGroup.get(key);
      const errorKey = key

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
    if (Object.keys(this.errors).length === 0) {
      this.saveLop.emit(this.updateLopForm.value);
    }
  }

  getKeys(obj: any) {
    return Object.keys(obj);
  }
}
