import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

interface QuanLiLop {
  id: number;
  tenLop: string;
  tenPhong: string;
  viTri: string;
  idGiaoVien?: number;
}

interface ThoiKhoaBieu {
  id: number;
  ngay: Date;
  idLop: number;
  hoatDong: string;
  thoiGianBatDau: string;
  thoiGianKetThuc: string;
}

@Injectable({
  providedIn: 'root',
})
export class ThoiKhoaBieuService {
  private apiUrl = 'http://localhost:8080/api/v1/thoikhoabieu';
  
  private sampleData: ThoiKhoaBieu[] = [
    { id: 1, ngay: new Date(2024, 8, 18), idLop: 1, hoatDong: 'Học vẽ', thoiGianBatDau: '15:00', thoiGianKetThuc: '15:00' },
    { id: 2, ngay: new Date(2024, 8, 18), idLop: 2, hoatDong: 'Học toán', thoiGianBatDau: '15:00', thoiGianKetThuc: '15:00' },
    { id: 3, ngay: new Date(2024, 8, 18), idLop: 1, hoatDong: 'Giờ chơi ngoài trời', thoiGianBatDau: '15:00', thoiGianKetThuc: '15:00' },
    { id: 4, ngay: new Date(2024, 8, 18), idLop: 1, hoatDong: 'Giờ ăn trưa', thoiGianBatDau: '15:00', thoiGianKetThuc: '15:00' },
    ];

  constructor(private http: HttpClient) {}

  private getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  private createHeaders(): HttpHeaders {
    const token = this.getToken();
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    if (token) {
      headers = headers.append('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

  getThoiKhoaBieu(): Observable<ThoiKhoaBieu[]> {
    const headers = this.createHeaders();
    return this.http.get<ThoiKhoaBieu[]>(this.apiUrl, { headers }).pipe(
      catchError((error) => {
        console.error('Lỗi khi gọi API, sử dụng dữ liệu mẫu:', error);
        return of(this.sampleData);
      })
    );
  }

  updateThoiKhoaBieu(updatedItem: ThoiKhoaBieu): Observable<ThoiKhoaBieu> {
    const headers = this.createHeaders();
    return this.http.put<ThoiKhoaBieu>(`${this.apiUrl}/${updatedItem.id}`, updatedItem, { headers }).pipe(
      catchError((error) => {
        console.error('Lỗi khi cập nhật thời khóa biểu:', error);
        return of(updatedItem);
      })
    );
  }

  deleteThoiKhoaBieu(id: number): Observable<void> {
    const headers = this.createHeaders();
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers }).pipe(
      catchError((error) => {
        console.error('Lỗi khi xóa thời khóa biểu:', error);
        return of();
      })
    );
  }
}