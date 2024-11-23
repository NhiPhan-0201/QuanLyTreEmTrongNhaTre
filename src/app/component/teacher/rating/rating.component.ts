import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EvaluationService } from '../../../../APIService/rating.service'; // Đảm bảo đường dẫn đúng
import { DanhGiaTreEm } from '../../../../models/DanhGiaTreEm';
import { ToastService } from '../../../service/toast.service';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule]
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

  getEvaluations(): void {
    this.isLoading = true;
    this.evaluationService.getEvaluations().subscribe({
        next: (data) => {
            this.evaluations = data;
            this.isLoading = false;
            console.log('Loaded evaluations:', this.evaluations);
          },
      error: (err) => {
        console.error('Lỗi khi lấy danh sách đánh giá:', err);
        this.toastService.showError('Không thể tải dữ liệu đánh giá');
        this.isLoading = false;
      }
    });
  }

  editEvaluation(item: DanhGiaTreEm): void {
    this.selectedEvaluation = { ...item };
    console.log('Editing:', this.selectedEvaluation);
  }

  saveEvaluation(updatedItem: DanhGiaTreEm): void {
    if (!updatedItem.id) {
      console.error('Dữ liệu không hợp lệ, thiếu id');
      return;
    }

    this.isLoading = true;
    this.evaluationService.updateEvaluation(updatedItem).subscribe({
      next: (data) => {
        this.toastService.showSuccess('Cập nhật đánh giá thành công');
        this.selectedEvaluation = null;
        this.getEvaluations();
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Lỗi khi lưu đánh giá:', err);
        this.toastService.showError('Không thể lưu đánh giá');
        this.isLoading = false;
      }
    });
  }

  deleteEvaluation(id: number): void {
    const confirmDelete = confirm('Bạn có chắc chắn muốn xóa đánh giá này?');
    if (confirmDelete) {
      this.isLoading = true;
      this.evaluationService.deleteEvaluation(id).subscribe({
        next: () => {
          this.toastService.showSuccess('Xóa đánh giá thành công');
          this.getEvaluations();
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
