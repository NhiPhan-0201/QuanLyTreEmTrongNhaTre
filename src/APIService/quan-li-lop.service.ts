import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { QuanLiLop } from '../models/QuanLiLop';
import { ApiResponse } from '../models/ApiResponse.interface';
import { CRUDService } from './interfaces/CRUD.service.interface';
import AutoRevokeService from './interfaces/auto-revoke.service.interface';

@Injectable({
  providedIn: 'root'
})

export class QuanLiLopService extends AutoRevokeService implements CRUDService<QuanLiLop> {
  private apiUrl = 'http://localhost:8080/api/v1/quan-li-lop';


  constructor(protected _http: HttpClient) {
    super(_http);
  }


  getAll(): Observable<QuanLiLop[]> {
    return this.http.get<QuanLiLop[]>(this.apiUrl);
  }

  get(id: number): Observable<QuanLiLop> {
    return this.http.get<QuanLiLop>(this.apiUrl + `/${id}`);
  }

  add(item: QuanLiLop): Observable<QuanLiLop> {
    let formData = {
      tenLop: item.tenLop,
      idGiaoVien: item.idGiaoVien,
      tenPhong: item.tenPhong,
      viTri: item.viTri,
      ...(item.idNhomLop ? { idNhomLop: item.idNhomLop } : {})
    };

    return this.http.post<QuanLiLop>(this.apiUrl, formData);
  }

  update(item: QuanLiLop): Observable<QuanLiLop> {
    let formData = {
      tenLop: item.tenLop,
      idGiaoVien: item.idGiaoVien,
      tenPhong: item.tenPhong,
      viTri: item.viTri,
      ...(item.idNhomLop ? { idNhomLop: item.idNhomLop } : {})
    };

    return this.http.put<QuanLiLop>(`${this.apiUrl}/${item.id}`, formData);
  }

  delete(id: number): Observable<string | null> {
    return this.http.delete<string | null>(this.apiUrl + `/${id}`);
  }
}
