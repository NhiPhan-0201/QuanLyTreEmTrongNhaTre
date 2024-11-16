import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

// Interface cho NhomLop và HocPhi
export interface NhomLop {
  id: number;
  tenNhom: string; // Đảm bảo có thuộc tính 'tenNhom'
}

export interface HocPhi {
  id: number;
  tenHocPhi: string;
  mucHocPhi: number;
  nhomLop: NhomLop; 
  nam: number;
  thang: number;
}

@Injectable({
  providedIn: 'root'
})
export class HocPhiService {
  private apiUrl = 'http://localhost:8080/api/v1/hoc-phi';
  
  private defaultToken = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJuZ3V5ZW50aGlhbiIsImlhdCI6MTczMDYyMTY0MSwiZXhwIjoxNzMwNzA4MDQxfQ.AaMSesrsprgUdBcRJzOajLfD8Xg40ojry_QjTbx3uPg';

  private sampleData: HocPhi[] = [
    {
      id: 1,
      tenHocPhi: 'Tiền học kỳ I',
      mucHocPhi: 1000000,
      nhomLop: { id: 1, tenNhom: 'Cơm nát' }, 
      nam: 2024,
      thang: 9
    },
    {
      id: 2,
      tenHocPhi: 'Tiền học kỳ II',
      mucHocPhi: 1200000,
      nhomLop: { id: 2, tenNhom: 'Cơm thường' }, // Cung cấp đầy đủ thuộc tính 'tenNhom'
      nam: 2024,
      thang: 10
    }
  ];

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    let token = this.defaultToken;
    if (typeof window !== 'undefined' && localStorage.getItem('AccessToken')) {
      token = localStorage.getItem('AccessToken')!;
    }
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }
  // Hàm lấy tất cả học phí
  getHocPhi(): Observable<HocPhi[]> {
    const headers = this.getHeaders();
    return this.http.get<HocPhi[]>(this.apiUrl, { headers }).pipe(
      catchError(() => {
        console.warn('API không khả dụng. Sử dụng dữ liệu mẫu để hiển thị.');
        return of(this.sampleData); // Trả về dữ liệu mẫu nếu gặp lỗi
      })
    );
  }
  // Hàm lấy học phí theo năm và tháng
  getHocPhiByMonth(year: number, month: number): Observable<HocPhi[]> {
    const headers = this.getHeaders();
    const url = `${this.apiUrl}?year=${year}&month=${month}`;
    return this.http.get<HocPhi[]>(url, { headers }).pipe(
      catchError(() => {
        console.warn('API không khả dụng. Sử dụng dữ liệu mẫu để hiển thị.');
        return of(this.sampleData); // Trả về dữ liệu mẫu nếu gặp lỗi
      })
    );
  }
}
