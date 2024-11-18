import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DanhGiaTreEm } from '../models/DanhGiaTreEm';

@Injectable({
  providedIn: 'root'
})
export class EvaluationService {

  private apiUrl = 'http://localhost:8080/api/v1/danh-gia-tre-em/admin';

  constructor(private http: HttpClient) {}

  private getToken(): string | null {
    return localStorage.getItem('access_token');
    // Hoặc sessionStorage.getItem('auth_token');
  }

  private createHeaders(): HttpHeaders {
    const token = this.getToken();
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.append('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

  // Lấy danh sách đánh giá
  getEvaluations(): Observable<DanhGiaTreEm[]> {
    return this.http.get<DanhGiaTreEm[]>(`${this.apiUrl}`);
  }

  // Cập nhật đánh giá học sinh
  updateEvaluation(updatedItem: DanhGiaTreEm): Observable<DanhGiaTreEm> {
    return this.http.put<DanhGiaTreEm>(`${this.apiUrl}/${updatedItem.id}`, updatedItem);
  }

  // Xóa một đánh giá
  deleteEvaluation(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
