import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ThoiKhoaBieu } from '../../../../models/ThoiKhoaBieu';
import { HttpClient } from '@angular/common/http';

// Đầu tiên, khai báo component
@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.css']
})
export class TimetablesComponent implements OnInit {
  thoiKhoaBieuList: ThoiKhoaBieu[] = []; // Danh sách thời khóa biểu

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getTimetable(); // Gọi phương thức để lấy thời khóa biểu khi component khởi tạo
  }

  // Phương thức để lấy thời khóa biểu từ API
  getTimetable(): void {
    this.http.get<ThoiKhoaBieu[]>('URL_API_XEM_THOI_KHOA_BIEU').subscribe(data => {
      this.thoiKhoaBieuList = data; // Gán dữ liệu nhận được cho biến thoiKhoaBieuList
    });
  }

  // Phương thức để chỉnh sửa một mục thời khóa biểu
  editTimetable(item: ThoiKhoaBieu): void {
    console.log('Editing:', item);
    // Thực hiện logic để chỉnh sửa
  }

  // Phương thức để xóa một mục thời khóa biểu
  deleteTimetable(id: number): void {
    const confirmDelete = confirm('Bạn có chắc chắn muốn xóa thời khóa biểu này?');
    if (confirmDelete) {
      this.http.delete(`URL_API_XOA_THOI_KHOA_BIEU/${id}`).subscribe(() => {
        this.thoiKhoaBieuList = this.thoiKhoaBieuList.filter(item => item.id !== id);
        console.log('Deleted:', id);
      });
    }
  }
}

// Sau đó, khai báo NgModule
@NgModule({
  declarations: [
    TimetablesComponent // Sử dụng TimetablesComponent ở đây
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TimetablesComponent // Xuất khẩu component
  ]
})
export class TimetableModule { }