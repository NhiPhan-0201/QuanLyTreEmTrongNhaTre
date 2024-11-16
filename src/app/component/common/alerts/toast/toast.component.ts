import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css'
})
export class ToastComponent {
  message: string = '';
  type: string = 'info'; // Các loại thông báo: info, success, error, warning
  isVisible: boolean = false;
  appearing: boolean = false;

  toastType = ToastType;

  icons: any = {
    success: "fas fa-check-circle",
    info: "fas fa-info-circle",
    warning: "fas fa-exclamation-circle",
    error: "fas fa-exclamation-circle"
  };

  titles: any = {
    success: "Thành công",
    info: "Thông báo",
    warning: "Cảnh báo",
    error: "Lỗi"
  }

  getIcons(type: string) {
    return this.icons[type];
  }

  showToast(message: string, type: ToastType = ToastType.INFO) {
    this.message = message;
    this.type = type;
    this.appearing = true;
    this.isVisible = true;

    // Tự động ẩn sau 3 giây
    setTimeout(() => {
      this.closeToast();
    }, 3000);
  }

  closeToast() {
    this.appearing = false;
    setTimeout(() => {
      this.isVisible = false;
    }, 300);
  }
}

export enum ToastType {
  INFO = 'info',
  SUCCESS = 'success',
  ERROR = 'error',
  WARNING = 'warning'
}
