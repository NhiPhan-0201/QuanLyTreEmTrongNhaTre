import { error } from 'console';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Account, NhomLop } from '../../../../../../models';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { validateData } from '../class-management.component';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-class-add-new-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './class-add-new-form.component.html'
})
export class ClassAddNewFormComponent {

  @Input() giaoViens!: Account[];
  @Input() listNhomLop!: NhomLop[];
  @Output() saveLop: EventEmitter<any> = new EventEmitter<any>();
  @Output() closeForm: EventEmitter<any> = new EventEmitter<any>();

  newLopForm!: FormGroup;
  errors: any = {};

  constructor(private fb: FormBuilder) {
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
    if (Object.keys(this.errors).length === 0) {
      if (this.newLopForm.value.idNhomLop === -1) delete this.newLopForm.value.idNhomLop;
      this.saveLop.emit(this.newLopForm.value);
    }
  }

  getKeys(obj: any): string[] {
    return Object.keys(obj);
  }
}
