import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class XemthongbaoService {
  private apiUrl = 'http://localhost:8080/api/v1/thong-bao-truong/lay-tat-ca';

  constructor(private http: HttpClient) { }

  // Lấy tất cả thông báo mà không cần token
  getAllThongbao(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}