import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  private apiUrl = 'http://localhost:8080/api/v1/upload';

  constructor(private http: HttpClient) { }

  // Lấy token
  private getHeaders() {
    const token = localStorage.getItem('access_token');
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
  }

  // Upload file
  uploadImage(file: File): Observable<{ DT: string, EM: string }> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<{ DT: string, EM: string }>(this.apiUrl + '/image', formData, {
      headers: this.getHeaders()
    });
  }
}