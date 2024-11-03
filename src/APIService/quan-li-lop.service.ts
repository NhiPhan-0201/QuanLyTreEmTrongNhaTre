import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { QuanLiLop } from '../models/QuanLiLop';
import { ApiResponse } from '../models/ApiResponse.interface';
import { CRUDService } from './CRUD.service.interface';

@Injectable({
  providedIn: 'root'
})

export class QuanLiLopService implements CRUDService<QuanLiLop> {
  private apiUrl = 'http://localhost:8080/api/v1/quan-li-lop';

  constructor(private http: HttpClient) { }

  // Lấy token
  private getHeaders() {
    const token = localStorage.getItem('access_token');
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
  }


  getAll(): Observable<ApiResponse<QuanLiLop[]>> {
    return this.http.get<ApiResponse<QuanLiLop[]>>(this.apiUrl, {
      headers: this.getHeaders()
    });
  }

  get(id: number): Observable<ApiResponse<QuanLiLop>> {
    return this.http.get<ApiResponse<QuanLiLop>>(this.apiUrl + `/${id}`, {
      headers: this.getHeaders()
    });
  }

  add(item: QuanLiLop): Observable<ApiResponse<QuanLiLop>> {
    return this.http.post<ApiResponse<QuanLiLop>>(this.apiUrl, item, {
      headers: this.getHeaders()
    });
  }

  update(item: QuanLiLop): Observable<ApiResponse<QuanLiLop>> {
    return this.http.put<ApiResponse<QuanLiLop>>(this.apiUrl, item, {
      headers: this.getHeaders()
    });
  }

  delete(id: number): Observable<ApiResponse<string | null>> {
    return this.http.delete<ApiResponse<string | null>>(this.apiUrl + `/${id}`, {
      headers: this.getHeaders()
    });
  }
}