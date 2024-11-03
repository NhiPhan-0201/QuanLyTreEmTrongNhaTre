import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ThongTinTre } from '../models/ThongTinTre';
import { ApiResponse } from '../models/ApiResponse.interface';

@Injectable({
  providedIn: 'root'
})
export class StudentInfoService {
  private apiUrl = 'http://localhost:8080/api/v1/admin/children';

  constructor(private http: HttpClient) { }

  getStudentById(id: number): Observable<ApiResponse<ThongTinTre>> {
    return this.http.get<ApiResponse<ThongTinTre>>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }
  private getHeaders(): HttpHeaders {
    const token = typeof window !== 'undefined' ? localStorage.getItem('AccessToken') : null;
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    });
  }
}
