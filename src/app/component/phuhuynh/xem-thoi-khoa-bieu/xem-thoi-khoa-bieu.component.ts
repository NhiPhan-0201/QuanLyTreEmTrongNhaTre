import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThoiKhoaBieuService } from '../../../../APIService/ThoiKhoaBieu.service';

export interface QuanLiLop {
  id: number;
  tenLop: string;
  tenPhong: string;
  viTri: string;
  idGiaoVien?: number;
}

export interface ThoiKhoaBieu {
  id: number;
  ngay: Date;
  idLop: number;
  hoatDong: string;
  thoiGianBatDau: string;
  thoiGianKetThuc: string;
}

@Component({
  selector: 'app-xem-thoi-khoa-bieu',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './xem-thoi-khoa-bieu.component.html',
  styleUrls: ['./xem-thoi-khoa-bieu.component.css']
})
export class ThoiKhoaBieuComponent implements OnInit {
  thoiKhoaBieuList: ThoiKhoaBieu[] = []; 
  filteredThoiKhoaBieuList: ThoiKhoaBieu[] = [];
  selectedDate: string = ''; 

  constructor(private thoiKhoaBieuService: ThoiKhoaBieuService) {}

  ngOnInit(): void {
    this.loadThoiKhoaBieu();
  }

  loadThoiKhoaBieu(): void {
    this.thoiKhoaBieuService.getThoiKhoaBieu().subscribe(
      (data: ThoiKhoaBieu[]) => {
        this.thoiKhoaBieuList = data;
        this.filteredThoiKhoaBieuList = this.thoiKhoaBieuList; 
      },
      (error) => {
        console.error('Lỗi khi tải thời khóa biểu:', error);
      }
    );
  }

  formatDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('vi-VN', options);
  }

  formatTime(time: Date): string {
    return time.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
  }

  filterByDate(): void {
    if (this.selectedDate) {
      const selectedDateObj = new Date(this.selectedDate);
      this.filteredThoiKhoaBieuList = this.thoiKhoaBieuList.filter(item => 
        item.ngay.toDateString() === selectedDateObj.toDateString()
      );
    } else {
      this.filteredThoiKhoaBieuList = this.thoiKhoaBieuList;
    }
  }
}
