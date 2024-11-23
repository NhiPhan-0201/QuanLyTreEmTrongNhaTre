import { Component, OnInit } from '@angular/core';
import { ThoiKhoaBieuService } from '../../../../APIService/ThoiKhoaBieu.service';
import { ThoiKhoaBieu } from '../../../../models/ThoiKhoaBieu';
import { ToastService } from '../../../service/toast.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QuanLiLop } from '../../../../models/QuanLiLop';

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule]
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
      next: (data: any[]) => {
        this.thoiKhoaBieuList = data.map(item => ({
          id: item.id,
          ngay: item.ngay,
          idLop: item.idLop as QuanLiLop,
          quanLiLop: item.idLop,
          hoatDong: item.hoatDong,
          thoiGianBatDau: `${item.thoiGianBatDau[0].toString().padStart(2, '0')}:${item.thoiGianBatDau[1].toString().padStart(2, '0')}`,
          thoiGianKetThuc: `${item.thoiGianKetThuc[0].toString().padStart(2, '0')}:${item.thoiGianKetThuc[1].toString().padStart(2, '0')}`
        }));
        this.isLoading = false;
      },
      error: (err) => {
        if (err.status === 403) {
          this.toastService.showError('Không có quyền truy cập dữ liệu thời khóa biểu');
        } else {
          this.toastService.showError('Không thể tải dữ liệu thời khóa biểu');
        }
        console.error('Lỗi khi lấy thời khóa biểu:', err);
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

    const timeStartParts = updatedItem.thoiGianBatDau.split(':').map(Number);
    const timeEndParts = updatedItem.thoiGianKetThuc.split(':').map(Number);

    const payload: any = {
      id: updatedItem.id,
      ngay: [
        new Date(updatedItem.ngay).getFullYear(),
        new Date(updatedItem.ngay).getMonth() + 1,
        new Date(updatedItem.ngay).getDate()
      ],
      idLop: updatedItem.idLop,
      hoatDong: updatedItem.hoatDong,
      thoiGianBatDau: timeStartParts,
      thoiGianKetThuc: timeEndParts
    };

    this.isLoading = true;
    this.thoiKhoaBieuService.updateThoiKhoaBieu(payload).subscribe({
      next: (data) => {
        this.toastService.showSuccess('Cập nhật thời khóa biểu thành công');
        this.selectedThoiKhoaBieu = null;
        this.getTimetable();
        this.isLoading = false;
      },
      error: (err) => {
        if (err.status === 403) {
          this.toastService.showError('Không có quyền cập nhật thời khóa biểu');
        } else {
          this.toastService.showError('Không thể lưu thời khóa biểu');
        }
        console.error('Lỗi khi lưu thời khóa biểu:', err);
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
          setTimeout(() => {
            this.getTimetable();
          }, 500);
          this.isLoading = false;
        },
        error: (err) => {
          if (err.status === 200) {
            this.toastService.showSuccess('Xóa thời khóa biểu thành công');
            setTimeout(() => {
              this.getTimetable();
            }, 500);
          } else if (err.status === 403) {
            this.toastService.showError('Không có quyền xóa thời khóa biểu');
          } else {
            this.toastService.showError('Không thể xóa thời khóa biểu');
          }
          console.error('Lỗi khi xóa thời khóa biểu:', err);
          this.isLoading = false;
        }
      });
    }
  }
}