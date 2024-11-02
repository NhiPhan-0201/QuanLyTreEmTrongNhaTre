import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ThongBaoLop } from '../../models/ThongBaoLop';

// Định nghĩa component NotificationsComponent
@Component({
  selector: 'app-notification-page',
  templateUrl: './notifications-page.component.html',
  styleUrls: ['./notifications-page.component.css']
})
export class NotificationsComponent {
  notifications: ThongBaoLop[] = [
    { id: 1, idLop: 1, tieuDe: 'Tiêu đề 1', noiDung: 'Nội dung thông báo 1' },
    { id: 2, idLop: 1, tieuDe: 'Tiêu đề 2', noiDung: 'Nội dung thông báo 2' },
    { id: 3, idLop: 2, tieuDe: 'Tiêu đề 3', noiDung: 'Nội dung thông báo 3' },
    { id: 4, idLop: 3, tieuDe: 'Tiêu đề 4', noiDung: 'Nội dung thông báo 4' },
    { id: 5, idLop: 2, tieuDe: 'Tiêu đề 5', noiDung: 'Nội dung thông báo 5' },
  ];
  
  classes = [
    { name: 'Lớp 1' },
    { name: 'Lớp 2' },
    { name: 'Lớp 3' },
    { name: 'Lớp 4' },
    { name: 'Lớp 5' },
  ];

  classListVisible = false;

  toggleClassList() {
    this.classListVisible = !this.classListVisible;
  }
}

// Định nghĩa module cho NotificationsComponent
@NgModule({
  declarations: [NotificationsComponent],
  imports: [
    CommonModule
  ],
  exports: [NotificationsComponent] // Xuất component nếu cần sử dụng ở nơi khác
})
export class NotificationsModule { }
