import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class XinNghiService {
  private apiUrl = 'http://localhost:8080/api/v1/xin-nghi';

  constructor(private http: HttpClient) {}

  submitLeaveRequest(data: { id_tre: string, ngay_thang_nam: string, ly_do: string }): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }
}
