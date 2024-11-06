import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { access_token } from '../constants/test_api';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  private apiUrl = 'http://localhost:8080/api/v1/upload';

  constructor(private http: HttpClient) { }

  // Lấy token
  private getHeaders() {
    const token = access_token;
    return {
      'Authorization': `Bearer ${token}`
    };
  }


  // Upload file
  uploadImage(file: File): Observable<{ link: string }> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<{ link: string }>(`${this.apiUrl}/image`, formData, {
      headers: new HttpHeaders(this.getHeaders())
    });
  }
}
