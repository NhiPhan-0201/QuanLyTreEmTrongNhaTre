import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DiemDanhService } from '../../../../../APIService/DiemDanhService.service';
import { XinNghiService } from '../../../../../APIService/xinnghi.service';

@Component({
  selector: 'app-view',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent {
  attendanceData: { [key: string]: string } = {};
  firstName = '';
  lastName = '';
  gender = 'male';
  reason = '';
  date = '';
  isModalOpen = false;

  constructor(
    private router: Router,
    private diemDanhService: DiemDanhService,
    private xinNghiService: XinNghiService
  ) {}

  navigateTo(path: string) {
    this.router.navigate([`/${path}`]);
  }

  loadAttendanceData() {
    const studentId = 'student-id';
    this.diemDanhService.getAttendanceByStudentId(studentId).subscribe(data => {
      this.attendanceData = data.reduce((acc: any, curr: any) => {
        acc[curr.date] = curr.status;
        return acc;
      }, {});
    });
  }

  openRegisterForm() {
    this.isModalOpen = true;
  }

  closeRegisterForm() {
    this.isModalOpen = false;
  }

  submitForm() {
    const leaveRequest = {
      id_tre: '1',
      ngay_thang_nam: this.date,
      ly_do: this.reason
    };

    this.xinNghiService.submitLeaveRequest(leaveRequest).subscribe(
      response => {
        console.log('Đăng ký nghỉ thành công:', response);
        this.loadAttendanceData();
        this.closeRegisterForm();
      },
      error => {
        console.error('Lỗi khi đăng ký nghỉ:', error);
      }
    );
  }

  getStatusText(date: string): string {
    return this.attendanceData[date] || '';
  }
}
