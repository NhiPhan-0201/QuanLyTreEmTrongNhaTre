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

  editTimetable(item: ThoiKhoaBieu): void {
    this.selectedThoiKhoaBieu = { ...item };
    console.log('Editing:', this.selectedThoiKhoaBieu);
  }


  saveTimetable(updatedItem: ThoiKhoaBieu): void {
    if (!updatedItem.id) {
      console.error('Dữ liệu không hợp lệ, thiếu id');
      return;
    }

    this.isLoading = true;
    this.thoiKhoaBieuService.updateThoiKhoaBieu(updatedItem).subscribe({
      next: (data) => {
        this.toastService.showSuccess('Cập nhật thời khóa biểu thành công');
        this.selectedThoiKhoaBieu = null;
        this.getTimetable();
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Lỗi khi lưu thời khóa biểu:', err);
        this.toastService.showError('Không thể lưu thời khóa biểu');
        this.isLoading = false;
      }
    });
  }

  deleteTimetable(id: number): void {
    const confirmDelete = confirm('Bạn có chắc chắn muốn xóa thời khóa biểu này?');
    if (confirmDelete) {
      this.isLoading = true;
      this.thoiKhoaBieuService.deleteThoiKhoaBieu(id).subscribe({
        next: () => {
          this.toastService.showSuccess('Xóa thời khóa biểu thành công');
          this.getTimetable();
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