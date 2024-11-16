import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  accountId: number | undefined;
  accessToken: string | null;

  constructor(private http: HttpClient, private router: Router) {
    this.accessToken = localStorage.getItem('access_token');
  }

  ngOnInit(): void {
    // Get the accountId from localStorage or another source if necessary
    this.accountId = parseInt(localStorage.getItem('accountID') || '0', 10);
  }

  async navigateToUser(): Promise<void> {
    try {
      const headers = new HttpHeaders({
        'Account-ID': this.accountId?.toString() || '',
        'Authorization': `Bearer ${this.accessToken || ''}`
      });

      const response = await this.http.get<{ redirectUrl: string }>(
        'http://localhost:8080/info',
        { headers, withCredentials: true }
      ).toPromise();

      if (response?.redirectUrl) {
        window.location.href = response.redirectUrl;
      }
    } catch (error) {
      console.error('Đăng nhập thất bại:', error);
    }
  }
  logout() {
    // Clear user data (e.g., remove tokens from localStorage)
    localStorage.removeItem('access_token');
    localStorage.removeItem('accountId');

    // Redirect to the login page
    this.router.navigate(['/login']);
  }
}
