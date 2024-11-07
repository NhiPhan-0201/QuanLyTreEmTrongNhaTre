// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class  VerifyService {
  private verifyOtpUrl = 'http://localhost:8080/api/v1/auth/verify-otp';

  constructor(private http: HttpClient) {}

  verifyOtp(username: string, otp: string, newPassword: string) {
    const params = new HttpParams()
      .set('username', username)
      .set('otp', otp)
      .set('newPassword', newPassword);
    return this.http.post(this.verifyOtpUrl, null, { params }).pipe(
      catchError((error) => {
        return throwError(() => new Error(error.error || 'Có lỗi xảy ra, vui lòng thử lại.'));
      })
    );
  }
}
