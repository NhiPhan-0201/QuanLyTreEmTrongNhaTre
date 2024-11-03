import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ThongTinGiaoVien } from '../models/ThongTinGiaoVien'; // Đường dẫn đến interface

@Injectable({
  providedIn: 'root'
})
export class TeacherInfoService {
  private apiUrl = 'http://localhost:8080/api/v1/giao-vien/tre/{treId}';

  constructor(private http: HttpClient) { }

  getTeacherInfo(treId: number): Observable<ThongTinGiaoVien> {
    return this.http.get<ThongTinGiaoVien>(`${this.apiUrl}/${treId}`, { headers: this.getHeaders() });
  }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }
}
