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

  private getHeaders(): HttpHeaders {
    const token = (typeof window !== 'undefined' && localStorage.getItem('access_token'));
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
}

  getThoiKhoaBieu(): Observable<ThoiKhoaBieu[]> {
    const headers = this.getHeaders();
    return this.http.get<ThoiKhoaBieu[]>(this.apiUrl, { headers }).pipe(
      catchError((error) => {
        console.error('Lỗi khi gọi API, sử dụng dữ liệu mẫu:', error);
        return of(this.sampleData);
      })
    );
  }

  // Cập nhật thời khóa biểu
  updateThoiKhoaBieu(updatedItem: ThoiKhoaBieu): Observable<ThoiKhoaBieu> {
    const headers = this.getHeaders();
    return this.http.put<ThoiKhoaBieu>(`${this.apiUrl}/${updatedItem.id}`, updatedItem, { headers }).pipe(
      catchError((error) => {
        console.error('Lỗi khi cập nhật thời khóa biểu:', error);
        return of(updatedItem); // Trả về dữ liệu gốc nếu lỗi
      })
    );
  }

  // Xóa thời khóa biểu
  deleteThoiKhoaBieu(id: number): Observable<void> {
    const headers = this.getHeaders();
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers }).pipe(
      catchError((error) => {
        console.error('Lỗi khi xóa thời khóa biểu:', error);
        return of(); // Nếu lỗi, trả về observable rỗng
      })
    );
  }
  // private getAccessToken(): string | null {
  //   const token = localStorage.getItem('access_token');
  //   console.log('Access Token:', token); // Debug in token ra console
  //   return token;
  // }
  // // Phương thức tạo headers với token
  // private getHeaders(): HttpHeaders {
  //   const token = this.getAccessToken();
  //   if (!token) {
  //     console.warn('Access token is missing!');
  //   }
  //   return new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Authorization': token ? `Bearer ${token}` : '',
  //   });
  // }

  // // Lấy thời khóa biểu
  // getThoiKhoaBieu(): Observable<ThoiKhoaBieu[]> {
  //   const headers = this.getHeaders();
  //   console.log('API Headers:', headers);
  //   return this.http.get<ThoiKhoaBieu[]>(this.apiUrl, { headers }).pipe(
  //     catchError((error) => {
  //       console.error('Error calling API, using sample data:', error);
  //       return of([]);
  //     })
  //   );
  // }
}