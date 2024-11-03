import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
  idLop: QuanLiLop;
  hoatDong: string;
  thoiGianBatDau: Date;
  thoiGianKetThuc: Date;
}

@Injectable({
  providedIn: 'root',
})
export class ThoiKhoaBieuService {
  private apiUrl = '../assets/api-thoikhoabieu.json';
  // Token mặc định cung cấp trực tiếp
  private defaultToken = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJuZ3V5ZW50aGlhbiIsImlhdCI6MTczMDYyMTY0MSwiZXhwIjoxNzMwNzA4MDQxfQ.AaMSesrsprgUdBcRJzOajLfD8Xg40ojry_QjTbx3uPg';

  private sampleData: ThoiKhoaBieu[] = [
    { id: 1, ngay: new Date(2024, 8, 18), idLop: { id: 1, tenLop: 'Lớp Cơm nát 1', tenPhong: 'Phòng A1', viTri: 'Tầng 1' }, hoatDong: 'Học vẽ', thoiGianBatDau: new Date(2024, 8, 18, 8, 0), thoiGianKetThuc: new Date(2024, 8, 18, 9, 0) },
    { id: 2, ngay: new Date(2024, 8, 18), idLop: { id: 1, tenLop: 'Lớp Cơm nát 1', tenPhong: 'Phòng A1', viTri: 'Tầng 1' }, hoatDong: 'Học toán', thoiGianBatDau: new Date(2024, 8, 18, 9, 15), thoiGianKetThuc: new Date(2024, 8, 18, 10, 15) },
    { id: 3, ngay: new Date(2024, 8, 18), idLop: { id: 1, tenLop: 'Lớp Cơm nát 1', tenPhong: 'Phòng A1', viTri: 'Tầng 1' }, hoatDong: 'Giờ chơi ngoài trời', thoiGianBatDau: new Date(2024, 8, 18, 10, 30), thoiGianKetThuc: new Date(2024, 8, 18, 11, 30) },
    { id: 4, ngay: new Date(2024, 8, 18), idLop: { id: 1, tenLop: 'Lớp Cơm nát 1', tenPhong: 'Phòng A1', viTri: 'Tầng 1' }, hoatDong: 'Giờ ăn trưa', thoiGianBatDau: new Date(2024, 8, 18, 11, 45), thoiGianKetThuc: new Date(2024, 8, 18, 12, 45) },
    { id: 5, ngay: new Date(2024, 8, 19), idLop: { id: 1, tenLop: 'Lớp Cơm nát 1', tenPhong: 'Phòng A1', viTri: 'Tầng 1' }, hoatDong: 'Học âm nhạc', thoiGianBatDau: new Date(2024, 8, 19, 8, 0), thoiGianKetThuc: new Date(2024, 8, 19, 9, 0) },
    { id: 6, ngay: new Date(2024, 8, 19), idLop: { id: 1, tenLop: 'Lớp Cơm nát 1', tenPhong: 'Phòng A1', viTri: 'Tầng 1' }, hoatDong: 'Tập thể dục', thoiGianBatDau: new Date(2024, 8, 19, 9, 15), thoiGianKetThuc: new Date(2024, 8, 19, 10, 15) },
    { id: 7, ngay: new Date(2024, 8, 19), idLop: { id: 1, tenLop: 'Lớp Cơm nát 1', tenPhong: 'Phòng A1', viTri: 'Tầng 1' }, hoatDong: 'Giờ chơi trong lớp', thoiGianBatDau: new Date(2024, 8, 19, 10, 30), thoiGianKetThuc: new Date(2024, 8, 19, 11, 30) },
    { id: 8, ngay: new Date(2024, 8, 19), idLop: { id: 1, tenLop: 'Lớp Cơm nát 1', tenPhong: 'Phòng A1', viTri: 'Tầng 1' }, hoatDong: 'Giờ ăn trưa', thoiGianBatDau: new Date(2024, 8, 19, 11, 45), thoiGianKetThuc: new Date(2024, 8, 19, 12, 45) },
    { id: 9, ngay: new Date(2024, 8, 20), idLop: { id: 1, tenLop: 'Lớp Cơm nát 1', tenPhong: 'Phòng A1', viTri: 'Tầng 1' }, hoatDong: 'Vẽ tranh', thoiGianBatDau: new Date(2024, 8, 20, 8, 0), thoiGianKetThuc: new Date(2024, 8, 20, 9, 0) },
    { id: 10, ngay: new Date(2024, 8, 20), idLop: { id: 1, tenLop: 'Lớp Cơm nát 1', tenPhong: 'Phòng A1', viTri: 'Tầng 1' }, hoatDong: 'Học khoa học', thoiGianBatDau: new Date(2024, 8, 20, 9, 15), thoiGianKetThuc: new Date(2024, 8, 20, 10, 15) },
    { id: 11, ngay: new Date(2024, 8, 20), idLop: { id: 1, tenLop: 'Lớp Cơm nát 1', tenPhong: 'Phòng A1', viTri: 'Tầng 1' }, hoatDong: 'Giờ chơi tự do', thoiGianBatDau: new Date(2024, 8, 20, 10, 30), thoiGianKetThuc: new Date(2024, 8, 20, 11, 30) },
    { id: 12, ngay: new Date(2024, 8, 20), idLop: { id: 1, tenLop: 'Lớp Cơm nát 1', tenPhong: 'Phòng A1', viTri: 'Tầng 1' }, hoatDong: 'Giờ ăn trưa', thoiGianBatDau: new Date(2024, 8, 20, 11, 45), thoiGianKetThuc: new Date(2024, 8, 20, 12, 45) },
    { id: 197, ngay: new Date(2024, 8, 30), idLop: { id: 1, tenLop: 'Lớp Cơm nát 1', tenPhong: 'Phòng A1', viTri: 'Tầng 1' }, hoatDong: 'Học vẽ', thoiGianBatDau: new Date(2024, 8, 30, 8, 0), thoiGianKetThuc: new Date(2024, 8, 30, 9, 0) },
  ];

  constructor(private http: HttpClient) {}

  getThoiKhoaBieu(): Observable<ThoiKhoaBieu[]> {
    const headers = { 'Authorization': `Bearer ${this.defaultToken}` };
    return this.http.get<ThoiKhoaBieu[]>(this.apiUrl, { headers }).pipe(
      catchError((error) => {
        console.error('Lỗi khi gọi API, sử dụng dữ liệu mẫu:', error);
        return of(this.sampleData);
      })
    );
  }
}
