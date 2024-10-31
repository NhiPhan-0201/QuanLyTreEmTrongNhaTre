import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CRUDService } from './CRUD.service.interface';
import { ThongTinTre } from '../models/ThongTinTre';
import { ApiResponse } from '../models/ApiResponse.interface';

@Injectable({
  providedIn: 'root'
})
export class ThongTinTreService implements CRUDService<ThongTinTre> {
  private apiUrl = 'http://localhost:8080/api/v1/admin/children';
  constructor(private http: HttpClient) { }

  private getHeaders() {
    const token = localStorage.getItem('AccessToken');
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
  }

  getAll(): Observable<ApiResponse<ThongTinTre[]>> {
    return this.http.get<ApiResponse<ThongTinTre[]>>(this.apiUrl, { headers: this.getHeaders() });
  }

  get(id: number): Observable<ApiResponse<ThongTinTre>> {
    return this.http.get<ApiResponse<ThongTinTre>>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  add(t: ThongTinTre): Observable<ApiResponse<ThongTinTre>> {
    return this.http.post<ApiResponse<ThongTinTre>>(this.apiUrl, t, { headers: this.getHeaders() });
  }

  update(t: ThongTinTre): Observable<ApiResponse<ThongTinTre>> {
    return this.http.put<ApiResponse<ThongTinTre>>(`${this.apiUrl}/${t.id}`, t, { headers: this.getHeaders() });
  }

  delete(id: number): Observable<ApiResponse<{ DT: ThongTinTre | null, EM: string }>> {
    return this.http.delete<ApiResponse<{ DT: ThongTinTre | null, EM: string }>>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }
}