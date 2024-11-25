import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ThongBaoTruong } from '../../../../models/ThongBaoTruong';
import { ThongBaoLop } from '../../../../models/ThongBaoLop';
import { NotificationService } from '../../../../APIService/send-notification.service';
import { ToastService } from '../../../service/toast.service';

@Component({
  selector: 'app-notifications-send-page',
  templateUrl: './notifications-send-page.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule]
})
export class NotificationsSendPageComponent implements OnInit {
  classes: any[] = [];
  selectedClassId: number | null = null;
  notificationType: 'school' | 'class' = 'school';
  
  newNotification = {
    id: 0,
    tieuDe: '',
    noiDung: '',
    idLop: 0
  };

  constructor(
    private notificationService: NotificationService,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.loadClasses();
  }

  loadClasses() {
    this.notificationService.getClasses().subscribe({
      next: (data) => {
        this.classes = data;
      },
      error: (error) => {
        console.error('Error loading classes:', error);
        this.toastService.showError('Không thể tải danh sách lớp');
      }
    });
  }

  sendNotification() {
    if (!this.newNotification.tieuDe || !this.newNotification.noiDung) {
      this.toastService.showError('Vui lòng nhập đầy đủ thông tin.');
      return;
    }

    if (this.notificationType === 'class' && !this.selectedClassId) {
      this.toastService.showError('Vui lòng chọn lớp để gửi thông báo.');
      return;
    }

    if (this.notificationType === 'school') {
      const schoolNotification: ThongBaoTruong = {
        id: this.newNotification.id,
        tieuDe: this.newNotification.tieuDe,
        noiDung: this.newNotification.noiDung
      };
      this.sendSchoolNotification(schoolNotification);
    } else {
      const classNotification: ThongBaoLop = {
        id: this.newNotification.id,
        idLop: this.selectedClassId!,
        tieuDe: this.newNotification.tieuDe,
        noiDung: this.newNotification.noiDung
      };
      this.sendClassNotification(classNotification);
    }
  }

  private sendSchoolNotification(notification: ThongBaoTruong) {
    this.notificationService.sendSchoolNotification(notification).subscribe({
      next: (response) => {
        this.toastService.showSuccess('Thông báo trường đã được gửi thành công!');
        this.resetForm();
      },
      error: (error) => {
        console.error('Error sending school notification:', error);
        this.toastService.showError('Có lỗi xảy ra khi gửi thông báo.');
      }
    });
  }

  private sendClassNotification(notification: ThongBaoLop) {
    this.notificationService.sendClassNotification(notification).subscribe({
      next: (response) => {
        this.toastService.showSuccess('Thông báo lớp đã được gửi thành công!');
        this.resetForm();
      },
      error: (error) => {
        console.error('Error sending class notification:', error);
        this.toastService.showError('Có lỗi xảy ra khi gửi thông báo.');
      }
    });
  }

  resetForm() {
    this.newNotification = {
      id: 0,
      tieuDe: '',
      noiDung: '',
      idLop: 0
    };
    this.selectedClassId = null;
  }
}
