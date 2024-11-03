import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Account, NhomLop } from '../../../../models';

@Component({
  selector: 'app-class-add-new-form',
  standalone: true,
  imports: [],
  templateUrl: './class-add-new-form.component.html',
  styleUrl: './class-add-new-form.component.css'
})
export class ClassAddNewFormComponent {

  @Input() giaoViens!: Account[];
  @Input() listNhomLop!: NhomLop[];
  @Output() saveLop: EventEmitter<any> = new EventEmitter<any>();
  @Output() closeForm: EventEmitter<any> = new EventEmitter<any>();
}
