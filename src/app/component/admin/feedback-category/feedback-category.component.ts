import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FeedbackCategoryService } from '../../../../APIService/feedback-category.service';
import { TheLoaiYKien } from '../../../../models/TheLoaiYKien';
import { ToastService } from '../../../../app/service/toast.service';

@Component({
  selector: 'app-feedback-category',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './feedback-category.component.html',
  styleUrls: ['./feedback-category.component.css']
})
export class FeedbackCategoryComponent implements OnInit {
  categoryForm: FormGroup;
  categories: TheLoaiYKien[] = [];
  filteredCategories: TheLoaiYKien[] = [];
  categoryToDelete: number | null = null;
  categoryToEdit: TheLoaiYKien | null = null;
  showPopup: boolean = false;
  showFormPopup: boolean = false;
  isEditMode: boolean = false;
  searchQuery: string = '';

  constructor(
    private fb: FormBuilder,
    private feedbackCategoryService: FeedbackCategoryService,
    private toastService: ToastService
  ) {
    this.categoryForm = this.fb.group({
      tenTheLoai: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories() {
    this.feedbackCategoryService.getCategories().subscribe({
      next: (data) => {
        this.categories = data || [];
        this.filteredCategories = this.categories;
      },
      error: () => {
        this.toastService.showError('Lỗi khi lấy danh sách thể loại');
      }
    });
  }

  onSubmit() {
    if (this.categoryForm.valid) {
      const newCategory: TheLoaiYKien = this.categoryForm.value;

      if (this.isEditMode && this.categoryToEdit) {
        this.feedbackCategoryService.updateCategory(this.categoryToEdit.id, newCategory).subscribe({
          next: () => {
            this.loadCategories();
            this.resetForm();
            this.toastService.showSuccess('Cập nhật thể loại thành công');
          },
          error: () => {
            this.toastService.showError('Lỗi khi cập nhật thể loại');
          }
        });
      } else {
        this.feedbackCategoryService.addCategory(newCategory).subscribe({
          next: () => {
            this.loadCategories();
            this.resetForm();
            this.toastService.showSuccess('Thêm thể loại mới thành công');
          },
          error: () => {
            this.toastService.showError('Lỗi khi thêm thể loại');
          }
        });
      }
    }
    this.showFormPopup = false;
  }

  openEditCategory(category: TheLoaiYKien) {
    this.categoryToEdit = category;
    this.categoryForm.patchValue({
      tenTheLoai: category.tenTheLoai
    });
    this.isEditMode = true;
    this.showFormPopup = true;
  }

  openDeletePopup(categoryId: number) {
    this.categoryToDelete = categoryId;
    this.showPopup = true;
  }

  confirmDelete() {
    if (this.categoryToDelete !== null) {
      this.feedbackCategoryService.deleteCategory(this.categoryToDelete).subscribe({
        next: () => {
          this.loadCategories();
          this.cancelDelete();
          this.toastService.showSuccess('Xóa thể loại thành công');
        },
        error: () => {
          this.toastService.showError('Lỗi khi xóa thể loại');
        }
      });
    }
  }

  cancelDelete() {
    this.showPopup = false;
    this.categoryToDelete = null;
  }

  openAddCategory() {
    this.resetForm();
    this.isEditMode = false;
    this.showFormPopup = true;
  }

  closeForm() {
    this.resetForm();
    this.showFormPopup = false;
  }

  private resetForm() {
    this.categoryForm.reset();
    this.categoryToEdit = null;
    this.isEditMode = false;
  }

  searchCategories() {
    this.filteredCategories = this.categories.filter(category =>
      category.tenTheLoai.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }
}
