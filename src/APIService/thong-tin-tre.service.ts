import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CRUDService } from './CRUD.service.interface';
import { ThongTinTre } from '../models/ThongTinTre';
import { ApiResponse } from '../models/ApiResponse.interface';
import { access_token } from '../constants/test_api';
import { Account } from '../models';
@Injectable({
  providedIn: 'root'
})
export class ThongTinTreService implements CRUDService<ThongTinTre> {
  private apiUrl = 'http://localhost:8080/api/v1/admin/children';
  constructor(private http: HttpClient) { }

  private getHeaders() {
    const token = access_token;
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
  }

  getAll(): Observable<ThongTinTre[]> {
    return this.http.get<ThongTinTre[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  get(id: number): Observable<ThongTinTre> {
    return this.http.get<ThongTinTre>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  add(t: ThongTinTre): Observable<ThongTinTre> {
    let formData = {
      hoTen: t.hoTen,
      ngaySinh: t.ngaySinh,
      gioiTinh: t.gioiTinh,
      classId: t.classId,
      username: (t.thongTinPhuHuynh as Account).username,
      anh: t.anh
    }
    return this.http.post<ThongTinTre>(this.apiUrl, formData, { headers: this.getHeaders() });
  }

  update(t: ThongTinTre): Observable<ThongTinTre> {
    let formData = {
      hoTen: t.hoTen,
      ngaySinh: t.ngaySinh,
      gioiTinh: t.gioiTinh,
      classId: t.classId,
      username: (t.thongTinPhuHuynh as Account).username,
      anh: t.anh
    }
    return this.http.put<ThongTinTre>(`${this.apiUrl}/${t.id}`, formData, { headers: this.getHeaders() });
  }

  delete(id: number): Observable<null | string> {
    return this.http.delete<null | string>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }
}