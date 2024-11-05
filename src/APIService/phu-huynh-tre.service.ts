import { PhuHuynhTre } from './../models';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { } from '../models';
import { CRUDService } from './CRUD.service.interface';
import { access_token } from '../constants/test_api';

@Injectable({
  providedIn: 'root'
})

export class PhuHuynhTreService implements CRUDService<PhuHuynhTre> {
  private apiUrl = 'http://localhost:8080/api/v1/quan-li-lop';

  constructor(private http: HttpClient) { }

  // Lấy token
  private getHeaders() {
    const token = access_token;
    return {
      'Authorization': `Bearer ${token}`
    };
  }

  getAll(): Observable<PhuHuynhTre[]> {
    return this.http.get<PhuHuynhTre[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  get(id: number): Observable<PhuHuynhTre> {
    return this.http.get<PhuHuynhTre>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  add(item: PhuHuynhTre): Observable<PhuHuynhTre> {
    return this.http.post<PhuHuynhTre>(this.apiUrl, item, { headers: this.getHeaders() });
  }

  update(item: PhuHuynhTre): Observable<PhuHuynhTre> {
    return this.http.put<PhuHuynhTre>(`${this.apiUrl}/${item.id}`, item, { headers: this.getHeaders() });
  }

  delete(id: number): Observable<string | null> {
    return this.http.delete<string | null>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }
}
