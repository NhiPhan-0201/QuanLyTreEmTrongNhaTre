import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { FeedbackCategoryService } from '../../APIService/feedback-category.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-feedback-category',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './feedback-category.component.html',
  styleUrls: ['./feedback-category.component.css']
})
export class FeedbackCategoryComponent implements OnInit {
  categoryForm: FormGroup;
  categories: any[] = [];
  categoryToDelete: number | null = null;
  categoryToEdit: any | null = null;
  showPopup: boolean = false;
  showFormPopup: boolean = false; // Biến kiểm soát hiển thị popup form
  isEditMode: boolean = false;

  constructor(
    private fb: FormBuilder,
    private feedbackCategoryService: FeedbackCategoryService
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
        this.categories = data.DT || [];
      },
      error: (error) => {
        console.error('Error fetching categories:', error);
      }
    });
  }

  onSubmit() {
    if (this.categoryForm.valid) {
      const newCategory = this.categoryForm.value;

      if (this.isEditMode && this.categoryToEdit) {
        this.feedbackCategoryService.updateCategory(this.categoryToEdit.id, newCategory).subscribe({
          next: () => {
            this.loadCategories();
            this.categoryForm.reset();
            this.categoryToEdit = null;
            this.isEditMode = false;
            this.showFormPopup = false; // Ẩn popup sau khi cập nhật
          },
          error: (error) => {
            console.error('Error updating category:', error);
          }
        });
      } else {
        this.feedbackCategoryService.addCategory(newCategory).subscribe({
          next: () => {
            this.loadCategories();
            this.categoryForm.reset();
            this.showFormPopup = false; // Ẩn popup sau khi thêm
          },
          error: (error) => {
            console.error('Error adding category:', error);
          }
        });
      }
    }
  }

  openEditCategory(category: any) {
    this.categoryToEdit = category;
    this.categoryForm.patchValue({
      tenTheLoai: category.tenTheLoai
    });
    this.isEditMode = true;
    this.showFormPopup = true; // Hiện popup khi sửa
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
          this.categoryToDelete = null;
          this.showPopup = false;
        },
        error: (error) => {
          console.error('Error deleting category:', error);
        }
      });
    }
  }

  cancelDelete() {
    this.showPopup = false;
    this.categoryToDelete = null;
  }

  // Phương thức mở form thêm mới
  openAddCategory() {
    this.categoryForm.reset();
    this.isEditMode = false;
    this.showFormPopup = true; // Hiện popup khi thêm mới
  }

  closeForm() {
    this.showFormPopup = false; // Ẩn popup
    this.categoryToEdit = null; // Đặt lại ID
  }
}
