import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { ThongBaoLop } from '../../../../models/ThongBaoLop';

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

  filteredNotifications: ThongBaoLop[] = [];
  searchTerm: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 10;
  newNotification: ThongBaoLop = { id: 0, idLop: 0, tieuDe: '', noiDung: '' }; // Đối tượng thông báo mới
  isSendingNotification: boolean = false; // Kiểm soát chế độ gửi thông báo
  searchQuery: string = '';
  
  classes = [
  { name: 'Lớp 1', checked: false },
  { name: 'Lớp 2', checked: false },
  { name: 'Lớp 3', checked: false },
  { name: 'Lớp 4', checked: false },
  { name: 'Lớp 5', checked: false },
  ];

  classListVisible = false;
  activeMenu: string = 'all'; 

  ngOnInit() {
    this.filteredNotifications = this.notifications.slice(); // Lưu danh sách thông báo ban đầu
    this.updatePagination();
  }

  toggleClassList() {
    this.classListVisible = !this.classListVisible;
  }

  selectMenu(menu: string) {
    this.activeMenu = menu;
    // if (menu !== 'classList') {
    //   this.classListVisible = false;
    // }
    this.isSendingNotification = false;
    this.updatePagination();
    //this.classListVisible = menu === 'classList';
  }

  searchNotifications() {
    if (this.searchQuery) {
      this.filteredNotifications = this.notifications.filter(notification =>
        notification.tieuDe.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.filteredNotifications = this.notifications.slice();
    }
    this.updatePagination();
  }

  updatePagination() {
    this.currentPage = 1; // Reset lại trang hiện tại sau khi tìm kiếm
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  get totalPages() {
    return Math.ceil(this.filteredNotifications.length / this.itemsPerPage);
  }

  get paginatedNotifications() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.filteredNotifications.slice(start, end);
  }

  toggleSendNotificationMode() {
    this.isSendingNotification = !this.isSendingNotification;
    if (!this.isSendingNotification) {
      this.cancelSend(); // Reset thông tin khi hủy gửi thông báo
    }
  }

  sendNotification() {
    if (this.newNotification.tieuDe && this.newNotification.noiDung) {
      // Thêm thông báo mới vào danh sách
      this.notifications.push({ ...this.newNotification, id: this.notifications.length + 1 }); // Giả sử không cần idLop
      this.resetNewNotification(); // Reset thông tin thông báo
      this.updatePagination(); // Cập nhật phân trang nếu cần
    } else {
      alert('Vui lòng nhập tiêu đề và nội dung thông báo.');
    }
  }

  cancelSend() {
    this.resetNewNotification(); // Reset thông tin thông báo
    this.isSendingNotification = false; // Quay lại chế độ xem thông báo
  }

  resetNewNotification() {
    this.newNotification = { id: 0, idLop: 0, tieuDe: '', noiDung: '' }; // Reset thông tin thông báo
    this.classes.forEach(classItem => classItem.checked = false); // Reset trạng thái checkbox
  }
}

@NgModule({
  declarations: [NotificationsComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [NotificationsComponent] 
})
export class NotificationsModule { }