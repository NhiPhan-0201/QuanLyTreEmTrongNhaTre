import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ForgotService {
  private forgotPasswordUrl = 'http://localhost:8080/api/v1/auth/forgot-password';

  constructor(private http: HttpClient) {}

  forgotPassword(username: string) {
    const params = new HttpParams().set('username', username);
    return this.http.post(this.forgotPasswordUrl, null, { params }).pipe(
      catchError((error) => {
        console.error(error);
        return throwError(() => new Error(error.error || 'Có lỗi xảy ra, vui lòng thử lại.'));
      })
    );
  }
}
