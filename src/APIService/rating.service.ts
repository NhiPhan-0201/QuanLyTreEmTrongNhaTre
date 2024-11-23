import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DanhGiaTreEm } from '../models/DanhGiaTreEm';

@Injectable({
  providedIn: 'root'
})
export class EvaluationService {

  private baseUrl = 'http://localhost:8080/api/v1/danh-gia-tre-em';
  private adminUrl = `${this.baseUrl}/admin`;

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

  getEvaluations(): Observable<DanhGiaTreEm[]> {
    const headers = this.createHeaders();
    return this.http.get<DanhGiaTreEm[]>(this.adminUrl, { 
      headers,
      withCredentials: true 
    });
  }

  updateEvaluation(updatedItem: DanhGiaTreEm): Observable<DanhGiaTreEm> {
    const headers = this.createHeaders();
    return this.http.put<DanhGiaTreEm>(
      this.baseUrl,
      updatedItem,
      { 
        headers,
        withCredentials: true
      }
    );
  }

  deleteEvaluation(id: number): Observable<void> {
    const headers = this.createHeaders();
    return this.http.delete<void>(
      `${this.baseUrl}/${id}`, 
      { 
        headers,
        withCredentials: true
      }
    );
  }
}
