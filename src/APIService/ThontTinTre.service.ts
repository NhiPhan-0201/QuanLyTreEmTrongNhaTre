import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CRUDService } from './CRUD.service.interface';
import { ThongTinTre } from '../models/ThongTinTre';

@Injectable({
  providedIn: 'root'
})
export class ThongTinTreService implements CRUDService<ThongTinTre> {
  private apiUrl = 'http://localhost:8080/api/v1/admin';
  constructor(private http: HttpClient) { }

  private getHeaders() {
    const token = localStorage.getItem('AccessToken');
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
  }

  add(thongTinTre: ThongTinTre): Observable<ThongTinTre> {
    return this.http.post<ThongTinTre>(`${this.apiUrl}/create-child-information`, thongTinTre, {
      headers: this.getHeaders()
    });
  }
  getAll(): Observable<ThongTinTre[]> {
    return this.http.get<ThongTinTre[]>(this.apiUrl + '/getAll-children', {
      headers: this.getHeaders()
    });
  }

  get(id: number): Observable<ThongTinTre> {
    return this.http.get<ThongTinTre>(`${this.apiUrl}/children/${id}`, {
      headers: this.getHeaders()
    });
  }

  update(thongTinTre: ThongTinTre): Observable<ThongTinTre> {
    return this.http.put<ThongTinTre>(`${this.apiUrl}/children/${thongTinTre.id}`, thongTinTre, {
      headers: this.getHeaders()
    });
  }

  delete(id: number): Observable<ThongTinTre> {
    return this.http.delete<ThongTinTre>(`${this.apiUrl}/children/${id}`, {
      headers: this.getHeaders()
    });
  }
}