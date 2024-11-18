import { Component, OnInit } from '@angular/core';
import { EvaluationService } from '../../../../APIService/rating.service'; // Đảm bảo đường dẫn đúng
import { DanhGiaTreEm } from '../../../../models/DanhGiaTreEm';
import { ToastService } from '../../../service/toast.service';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html'
})
export class RatingComponent implements OnInit {
  evaluations: DanhGiaTreEm[] = [];
  selectedEvaluation: DanhGiaTreEm | null = null;
  isLoading: boolean = false;

  constructor(
    private evaluationService: EvaluationService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.getEvaluations();
  }

  // Phương thức để lấy danh sách đánh giá
  getEvaluations(): void {
    this.isLoading = true;
    this.evaluationService.getEvaluations().subscribe({
      next: (data) => {
        this.evaluations = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Lỗi khi lấy danh sách đánh giá:', err);
        this.toastService.showError('Không thể tải dữ liệu đánh giá');
        this.isLoading = false;
      }
    });
  }

  // Phương thức để chỉnh sửa một đánh giá
  editEvaluation(item: DanhGiaTreEm): void {
    this.selectedEvaluation = { ...item }; // Sao chép dữ liệu đánh giá cần chỉnh sửa
    console.log('Editing:', this.selectedEvaluation);
  }

  // Phương thức để lưu đánh giá đã chỉnh sửa
  saveEvaluation(updatedItem: DanhGiaTreEm): void {
    if (!updatedItem.id) {
      console.error('Dữ liệu không hợp lệ, thiếu id');
      return;
    }

    this.isLoading = true;
    this.evaluationService.updateEvaluation(updatedItem).subscribe({
      next: (data) => {
        this.toastService.showSuccess('Cập nhật đánh giá thành công');
        this.selectedEvaluation = null; // Đóng form sau khi lưu
        this.getEvaluations(); // Cập nhật lại danh sách
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Lỗi khi lưu đánh giá:', err);
        this.toastService.showError('Không thể lưu đánh giá');
        this.isLoading = false;
      }
    });
  }

  // Phương thức để xóa một đánh giá
  deleteEvaluation(id: number): void {
    const confirmDelete = confirm('Bạn có chắc chắn muốn xóa đánh giá này?');
    if (confirmDelete) {
      this.isLoading = true;
      this.evaluationService.deleteEvaluation(id).subscribe({
        next: () => {
          this.toastService.showSuccess('Xóa đánh giá thành công');
          this.getEvaluations(); // Cập nhật lại danh sách
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Lỗi khi xóa đánh giá:', err);
          this.toastService.showError('Không thể xóa đánh giá');
          this.isLoading = false;
        }
      });
    }
  }
}
