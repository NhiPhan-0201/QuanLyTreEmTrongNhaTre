import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authUrl = 'http://localhost:8080/api/v1/auth/authenticate';

  constructor(private http: HttpClient, private router: Router) { }

  login(username: string, password: string) {
    return this.http.post(this.authUrl, { username, password }).pipe(
      catchError((error) => {
        console.error('Login error:', error);  // Thêm log ở đây
        return throwError(() => new Error('Login failed.'));
      })
    );
  }

  saveTokens(accessToken: string, refreshToken: string, accountId: string) {
    localStorage.setItem('access_token', accessToken);
    localStorage.setItem('refresh_token', refreshToken);
    localStorage.setItem('accountID', accountId);

    console.log('Tokens saved:', { accessToken, refreshToken, accountId });
  }
}
