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
        // console.log('API Response:', data);
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
      this.feedbackCategoryService.addCategory(newCategory).subscribe({
        next: () => {
          this.loadCategories();
          this.categoryForm.reset();
        },
        error: (error) => {
          console.error('Error adding category:', error);
        }
      });
    }
  }

  onDelete(id: number) {
    this.feedbackCategoryService.deleteCategory(id).subscribe({
      next: () => {
        this.loadCategories();
      },
      error: (error) => {
        console.error('Error deleting category:', error);
      }
    });
  }
}
