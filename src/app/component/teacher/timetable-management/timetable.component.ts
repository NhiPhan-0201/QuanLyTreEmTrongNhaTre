import { Component, OnInit } from '@angular/core';
import { ThoiKhoaBieuService } from '../../../../APIService/ThoiKhoaBieu.service';
import { ThoiKhoaBieu } from '../../../../models/ThoiKhoaBieu';
import { ToastService } from '../../../service/toast.service';

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html'
})
export class TimetablesComponent implements OnInit {
  thoiKhoaBieuList: ThoiKhoaBieu[] = [];
  selectedThoiKhoaBieu: ThoiKhoaBieu | null = null;
  isLoading: boolean = false;

  constructor(
    private thoiKhoaBieuService: ThoiKhoaBieuService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.getTimetable();
  }

    // Phương thức để lấy thời khóa biểu từ service
    getTimetable(): void {
      this.isLoading = true;
      this.thoiKhoaBieuService.getThoiKhoaBieu().subscribe({
        next: (data) => {
          this.thoiKhoaBieuList = data;
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Lỗi khi lấy thời khóa biểu:', err);
          this.toastService.showError('Không thể tải dữ liệu thời khóa biểu');
          this.isLoading = false;
        }
      });
    }

  // Phương thức để chỉnh sửa một mục thời khóa biểu
  editTimetable(item: ThoiKhoaBieu): void {
    this.selectedThoiKhoaBieu = { ...item }; // Sao chép dữ liệu mục thời khóa biểu cần chỉnh sửa
    console.log('Editing:', this.selectedThoiKhoaBieu);
  }

  // Phương thức để lưu thời khóa biểu đã chỉnh sửa
  saveTimetable(updatedItem: ThoiKhoaBieu): void {
    if (!updatedItem.id) {
      console.error('Dữ liệu không hợp lệ, thiếu id');
      return;
    }

    this.isLoading = true;
    this.thoiKhoaBieuService.updateThoiKhoaBieu(updatedItem).subscribe({
      next: (data) => {
        this.toastService.showSuccess('Cập nhật thời khóa biểu thành công');
        this.selectedThoiKhoaBieu = null; // Đóng form sau khi lưu
        this.getTimetable(); // Cập nhật lại danh sách
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Lỗi khi lưu thời khóa biểu:', err);
        this.toastService.showError('Không thể lưu thời khóa biểu');
        this.isLoading = false;
      }
    });
  }

  // Phương thức để xóa một mục thời khóa biểu
  deleteTimetable(id: number): void {
    const confirmDelete = confirm('Bạn có chắc chắn muốn xóa thời khóa biểu này?');
    if (confirmDelete) {
      this.isLoading = true;
      this.thoiKhoaBieuService.deleteThoiKhoaBieu(id).subscribe({
        next: () => {
          this.toastService.showSuccess('Xóa thời khóa biểu thành công');
          this.getTimetable(); // Cập nhật lại danh sách
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Lỗi khi xóa thời khóa biểu:', err);
          this.toastService.showError('Không thể xóa thời khóa biểu');
          this.isLoading = false;
        }
      });
    }
  }
}