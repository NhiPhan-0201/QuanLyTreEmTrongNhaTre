import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { FeedbackCategoryService } from '../../../../APIService/feedback-category.service';
import { TheLoaiYKien } from '../../../../models/TheLoaiYKien';

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
  categories: TheLoaiYKien[] = [];
  categoryToDelete: number | null = null;
  categoryToEdit: TheLoaiYKien | null = null;
  showPopup: boolean = false;
  showFormPopup: boolean = false;
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
        this.categories = data || [];
      },
      error: (error) => {
        console.error('Error fetching categories:', error);
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
          },
          error: (error) => {
            console.error('Error updating category:', error);
          }
        });
      } else {
        this.feedbackCategoryService.addCategory(newCategory).subscribe({
          next: () => {
            this.loadCategories();
            this.resetForm();
          },
          error: (error) => {
            console.error('Error adding category:', error);
          }
        });
      }
    }
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
}
