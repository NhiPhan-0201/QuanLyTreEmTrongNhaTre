import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ThongTinHocSinh } from '../../../../models/ThongTinHocSinh';

@Component({
  selector: 'app-student-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './student-info.component.html',
  styleUrl: './student-info.component.css'
})
export class GiaovienThongtinhocsinhComponent {
  studentDetail: ThongTinHocSinh | null = null;

  constructor(private router: Router) {}

  ngOnInit(): void {
    if (typeof window !== 'undefined' && localStorage.getItem('studentDetail')) {
      const storedData = localStorage.getItem('studentDetail');
      if (storedData) {
        this.studentDetail = JSON.parse(storedData);
      }
    }
  }

  goBack(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('studentDetail'); // Xóa dữ liệu khỏi localStorage khi trở về
    }
    this.router.navigate(['/teacher/manage']);
  }
}
