import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { VerifyService } from '../../../APIService/verify.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-verify-otp',
  standalone: true,  // <-- Add this line
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './verify-otp.component.html',
  styleUrls: ['./verify-otp.component.css']
})
export class VerifyOtpComponent implements OnInit {
  username: string = '';
  otp: string = '';
  newPassword: string = '';
  error: string = '';
  success: string = '';
  loading: boolean = false;

  constructor(
    private verifyService: VerifyService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const state = this.router.getCurrentNavigation()?.extras.state as { username: string };
    if (state && state.username) {
      this.username = state.username;
    }
  }

  handleVerifyOtp() {
    this.error = '';
    this.success = '';
    this.loading = true;

    this.verifyService.verifyOtp(this.username, this.otp, this.newPassword).subscribe({
      next: () => {
        this.success = 'Mật khẩu đã được đặt lại thành công!';
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: (err) => {
        this.error = err.message;
      },
      complete: () => {
        this.loading = false;
      }
    });
  }
}
