import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CRUDService } from './interfaces/CRUD.service.interface';
import { ThongTinTre } from '../models/ThongTinTre';
import { ApiResponse } from '../models/ApiResponse.interface';
import { Account } from '../models';
import AutoRevokeService from './interfaces/auto-revoke.service.interface';
@Injectable({
  providedIn: 'root'
})
export class ThongTinTreService extends AutoRevokeService implements CRUDService<ThongTinTre> {
  private apiUrl = 'http://localhost:8080/api/v1/admin/children';

  constructor(protected _http: HttpClient) {
    super(_http);
  }

  getAll(): Observable<ThongTinTre[]> {
    return this.http.get<ThongTinTre[]>(this.apiUrl);
  }

  get(id: number): Observable<ThongTinTre> {
    return this.http.get<ThongTinTre>(`${this.apiUrl}/${id}`);
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
    return this.http.post<ThongTinTre>(this.apiUrl, formData);
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
    return this.http.put<ThongTinTre>(`${this.apiUrl}/${t.id}`, formData);
  }

  delete(id: number): Observable<null | string> {
    return this.http.delete<null | string>(`${this.apiUrl}/${id}`);
  }
}
