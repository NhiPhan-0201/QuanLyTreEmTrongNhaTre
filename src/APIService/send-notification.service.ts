import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ThongBaoTruong } from '../models/ThongBaoTruong';
import { ThongBaoLop } from '../models/ThongBaoLop';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private apiUrl = 'http://localhost:8080/api/v1';

  constructor(private http: HttpClient) {}

  private getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  private createHeaders(): HttpHeaders {
    const token = this.getToken();
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json');
      
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

  sendSchoolNotification(notification: ThongBaoTruong): Observable<any> {
    const headers = this.createHeaders();
    return this.http.post(`${this.apiUrl}/thong-bao-truong/them`, notification, {
      headers,
      withCredentials: true
    });
  }

  sendClassNotification(notification: ThongBaoLop): Observable<any> {
    const headers = this.createHeaders();
    return this.http.post(`${this.apiUrl}/admin/create-class-announcement`, notification, {
      headers,
      withCredentials: true
    });
  }

  getClasses(): Observable<any[]> {
    const headers = this.createHeaders();
    return this.http.get<any[]>(`${this.apiUrl}/quan-li-lop`, {
      headers,
      withCredentials: true
    });
  }
}
