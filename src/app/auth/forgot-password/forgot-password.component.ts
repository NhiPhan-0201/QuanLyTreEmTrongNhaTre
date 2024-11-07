// src/app/forgot-password/forgot-password.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ForgotService } from '../../../APIService/forgot.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  username: string = '';
  error: string = '';
  success: string = '';
  loading: boolean = false;

  constructor(private forgotService: ForgotService, private router: Router) {}

  handleForgotPassword() {
    this.error = '';
    this.success = '';
    this.loading = true;

    this.forgotService.forgotPassword(this.username).subscribe({
      next: () => {
        this.success = 'Mã OTP đã được gửi đến email của bạn!';
        setTimeout(() => {
          this.router.navigate(['/verify-otp'], { state: { username: this.username } });
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
