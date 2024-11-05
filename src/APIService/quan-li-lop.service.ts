import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { QuanLiLop } from '../models/QuanLiLop';
import { ApiResponse } from '../models/ApiResponse.interface';
import { CRUDService } from './CRUD.service.interface';
import { access_token } from '../constants/test_api';

@Injectable({
  providedIn: 'root'
})

export class QuanLiLopService implements CRUDService<QuanLiLop> {
  private apiUrl = 'http://localhost:8080/api/v1/quan-li-lop';

  constructor(private http: HttpClient) { }

  // Lấy token
  private getHeaders() {
    const token = access_token;
    return {
      'Authorization': `Bearer ${token}`
    };
  }


  getAll(): Observable<QuanLiLop[]> {
    return this.http.get<QuanLiLop[]>(this.apiUrl, {
      headers: this.getHeaders()
    });
  }

  get(id: number): Observable<QuanLiLop> {
    return this.http.get<QuanLiLop>(this.apiUrl + `/${id}`, {
      headers: this.getHeaders()
    });
  }

  add(item: QuanLiLop): Observable<QuanLiLop> {
    return this.http.post<QuanLiLop>(this.apiUrl, item, {
      headers: this.getHeaders()
    });
  }

  update(item: QuanLiLop): Observable<QuanLiLop> {
    return this.http.put<QuanLiLop>(this.apiUrl, item, {
      headers: this.getHeaders()
    });
  }

  delete(id: number): Observable<string | null> {
    return this.http.delete<string | null>(this.apiUrl + `/${id}`, {
      headers: this.getHeaders()
    });
  }
}
