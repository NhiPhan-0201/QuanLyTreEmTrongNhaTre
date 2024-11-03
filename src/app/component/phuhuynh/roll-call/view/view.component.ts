import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { stat } from 'node:fs';

@Component({
  selector: 'app-view',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './view.component.html',
  styleUrl: './view.component.css'
})
export class ViewComponent {
  constructor(private router: Router) {}

  navigateTo(path: string) {
    this.router.navigate([`/${path}`]);
  }

  isModalOpen = false;
  firstName = '';
  lastName = '';
  gender = 'male';
  reason = '';
  date = '';

  attendanceData: { [key: string]: string } = {
    '2024-09-17': 'Có mặt',
    '2024-09-18': 'Vắng có phép',
    '2024-09-19': 'Vắng không phép'
  };


  openRegisterForm() {
    this.isModalOpen = true;
  }

  closeRegisterForm() {
    this.isModalOpen = false;
  }

  submitForm() {
    // Xử lý logic gửi form ở đây
    console.log('Form data:', {
      firstName: this.firstName,
      lastName: this.lastName,
      gender: this.gender,
      reason: this.reason,
      date: this.date,
    });
    this.closeRegisterForm();
  }

  getStatusText(date: string): string {
    return this.attendanceData[date] || ''; // Trả về trạng thái nếu tồn tại, ngược lại trả về chuỗi rỗng
  }
}
