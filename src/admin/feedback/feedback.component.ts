import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { FeedbackService } from '../../APIService/feedback.service';
import { FeedbackCategoryService } from '../../APIService/feedback-category.service';

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

export class FeedbackComponent implements OnInit {
  feedbacks: any[] = [];
  categories: any[] = [];
  feedbackForm: FormGroup;
  selectedFeedback: any = null;

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

  // Lấy danh sách thể loại từ FeedbackCategoryService
  loadCategories(): void {
    this.feedbackCategoryService.getCategories().subscribe(
      (data) => {
        this.categories = data.DT;
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
  }

  // Lấy danh sách phản hồi từ FeedbackService
  loadFeedbacks(): void {
    const page = this.pageControl.value;
    const theLoaiId = this.theLoaiIdControl.value;

    this.feedbackService.getFeedbackByAdmin(page, theLoaiId).subscribe(
      (data) => {
        this.feedbacks = data.DT.yKienPhuHuynhs;
      },
      (error) => {
        console.error('Error fetching feedbacks:', error);
      }
    );
  }

  // Khi thay đổi thể loại hoặc trang, tải lại phản hồi
  onFilterChange(): void {
    this.loadFeedbacks();
  }

  openFeedbackDetails(feedback: any): void {
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