import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { FeedbackService } from '../../../../APIService/feedback.service';
import { FeedbackCategoryService } from '../../../../APIService/feedback-category.service';

import { YKienPhuHuynhAdmin } from '../../../../models/YKienPhuHuynh';
import { TheLoaiYKien } from '../../../../models/TheLoaiYKien';

@Component({
  selector: 'app-feedback',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class AdminFeedbackComponent implements OnInit {
  feedbacks: YKienPhuHuynhAdmin[] = [];
  categories: TheLoaiYKien[] = [];
  feedbackForm: FormGroup;
  selectedFeedback: YKienPhuHuynhAdmin | null = null;

  constructor(
    private feedbackService: FeedbackService,
    private feedbackCategoryService: FeedbackCategoryService,
    private formBuilder: FormBuilder
  ) {
    this.feedbackForm = this.formBuilder.group({
      page: [0],
      theLoaiId: ['']
    });
  }

  ngOnInit(): void {
    this.loadCategories();
    this.loadFeedbacks();
  }

  // Lấy danh sách thể loại
  loadCategories(): void {
    this.feedbackCategoryService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (error) => {
        console.error('Error fetching categories:', error);
      }
    });
  }

  // Lấy danh sách ý kiến
  loadFeedbacks(): void {
    const page = this.pageControl.value;
    const theLoaiId = this.theLoaiIdControl.value;

    this.feedbackService.getFeedbackByAdmin(page, theLoaiId).subscribe({
      next: (data) => {
        this.feedbacks = data.yKienPhuHuynhs;
      },
      error: (error) => {
        console.error('Error fetching feedbacks:', error);
      }
    });
  }

  onFilterChange(): void {
    this.loadFeedbacks();
  }

  openFeedbackDetails(feedback: YKienPhuHuynhAdmin): void {
    this.selectedFeedback = feedback;
  }

  closeFeedbackDetails(): void {
    this.selectedFeedback = null;
  }

  get pageControl(): FormControl {
    return this.feedbackForm.get('page') as FormControl;
  }

  get theLoaiIdControl(): FormControl {
    return this.feedbackForm.get('theLoaiId') as FormControl;
  }
}
