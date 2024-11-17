import { ThongTinGiaoVien } from '../models/ThongTinGiaoVien';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CRUDService } from './interfaces/CRUD.service.interface';
import { ThongTinTre } from '../models/ThongTinTre';
import AutoRevokeService from './interfaces/auto-revoke.service.interface';
@Injectable({
  providedIn: 'root'
})
export class ThongTinGiaoVienService extends AutoRevokeService implements CRUDService<ThongTinGiaoVien> {
  private apiUrl = 'http://localhost:8080/api/v1/admin/children';

  constructor(protected _http: HttpClient) {
    super(_http);
  }

  getAll(): Observable<ThongTinGiaoVien[]> {
    return this.http.get<ThongTinGiaoVien[]>(this.apiUrl);
  }

  get(id: number): Observable<ThongTinGiaoVien> {
    return this.http.get<ThongTinGiaoVien>(this.apiUrl + `/${id}`);
  }

  add(item: ThongTinGiaoVien, options = {}): Observable<ThongTinGiaoVien> {
    let formData = {
      hoTen: item.hoTen,
      email: item.email,
      soDienThoai: item.soDienThoai,
      diaChi: item.diaChi
    };

    return this.http.post<ThongTinGiaoVien>(this.apiUrl, formData);
  }


  update(item: ThongTinGiaoVien, options = {}): Observable<ThongTinGiaoVien> {
    let formData = {
      hoTen: item.hoTen,
      email: item.email,
      soDienThoai: item.soDienThoai,
      diaChi: item.diaChi
    };

    return this.http.put<ThongTinGiaoVien>(`${this.apiUrl}/${item.id}`, formData);
  }

  delete(id: number): Observable<null | string> {
    return this.http.delete<null | string>(this.apiUrl + `/${id}`);
  }
}
