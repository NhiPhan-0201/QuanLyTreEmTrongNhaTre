import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FeedbackService } from '../../../APIService/Fbservice.service';

@Component({
  selector: 'app-feedback',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class feedbackComponent {
  theLoaiId: number = 1;
  tieuDe: string = '';
  noiDung: string = '';
  hinhAnh: string = '';

  constructor(
    private router: Router,
    private feedbackService: FeedbackService
  ) {}

  navigateTo(path: string) {
    this.router.navigate([`/${path}`]);
  }

  sendFeedback() {
    const feedbackData = {
      theLoaiId: this.theLoaiId,
      tieuDe: this.tieuDe,
      noiDung: this.noiDung,
      hinhAnh: this.hinhAnh
    };

    this.feedbackService.sendFeedback(feedbackData).subscribe(
      response => {
        console.log('Feedback sent successfully:', response);
        // Reset form sau khi gửi
        this.tieuDe = '';
        this.noiDung = '';
        this.hinhAnh = '';
      },
      error => {
        console.error('Error sending feedback:', error);
      }
    );
  }
}
