import { Component } from '@angular/core';
import { ThongBaoLop } from '../../../../models/ThongBaoLop';

@Component({
  selector: 'app-notifications-send-page',
  templateUrl: './notifications-send-page.component.html',
  styleUrls: ['./notifications-send-page.component.css']
})
export class NotificationsSendPageComponent {
  newNotification: ThongBaoLop = { id: 0, idLop: 0, tieuDe: '', noiDung: '' };
  classes = [
    { name: 'Lớp 1', checked: false },
    { name: 'Lớp 2', checked: false },
    { name: 'Lớp 3', checked: false },
    { name: 'Lớp 4', checked: false },
    { name: 'Lớp 5', checked: false }
  ];

  sendNotification() {
    const selectedClasses = this.classes
      .filter((cls) => cls.checked)
      .map((cls) => cls.name);
  
    if (!this.newNotification.tieuDe || !this.newNotification.noiDung) {
      alert('Vui lòng nhập đầy đủ thông tin.');
      return;
    }
  
    if (selectedClasses.length === 0) {
      alert('Vui lòng chọn ít nhất một lớp để gửi thông báo.');
      return;
    }
  
    console.log('Gửi thông báo:', {
      tieuDe: this.newNotification.tieuDe,
      noiDung: this.newNotification.noiDung,
      classes: selectedClasses,
    });
  
    alert('Thông báo đã được gửi thành công!');
    this.resetForm();
  }
  
  onInputChange(field: 'tieuDe' | 'noiDung', event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.newNotification[field] = value;
  }
  
  onCheckboxChange(index: number, event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    this.classes[index].checked = checked;
  }

  resetForm() {
    this.newNotification = { id: 0, idLop: 0, tieuDe: '', noiDung: '' };
    this.classes.forEach(cls => (cls.checked = false));
  }
}
