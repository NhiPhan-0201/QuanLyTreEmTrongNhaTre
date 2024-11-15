// src/app/login/login.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../APIService/login.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  error: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  handleLogin() {
    this.authService.login(this.username, this.password).subscribe({
      next: (response: any) => {
        const { access_token, refresh_token, idAccount } = response;
        this.authService.saveTokens(access_token, refresh_token, idAccount);
        this.router.navigate(['/home']);
      },
      error: () => {
        this.error = 'Đăng nhập không thành công. Vui lòng kiểm tra lại thông tin.';
      }
    });
  }

  handleForgotPassword() {
    this.router.navigate(['/forgot-password']);
  }
  isPasswordVisible: boolean = false;

    togglePasswordVisibility() {
      this.isPasswordVisible = !this.isPasswordVisible;
  }

}
