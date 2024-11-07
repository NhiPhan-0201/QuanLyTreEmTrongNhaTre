import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ThongTinHocSinh } from '../../../models/ThongTinHocSinh';

@Component({
  selector: 'app-giaovien-thongtinhocsinh',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './giaovien-thongtinhocsinh.component.html',
  styleUrl: './giaovien-thongtinhocsinh.component.css'
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
    this.router.navigate(['/giaovien-management']);
  }
}
