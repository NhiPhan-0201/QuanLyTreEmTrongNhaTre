import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { DiemDanh } from '../models/DiemDanh';

// interface DiemDanh {
//   id: number;                        // ID của học sinh từ API
//   hoTen: string;                     // Tên của học sinh từ API
//   ngaySinh: string;                  // Ngày sinh (định dạng yyyy-mm-dd)
//   gioiTinh: string;                  // Giới tính của học sinh
//   classId: number;                   // ID lớp từ API
//   tenLop: string | null;             // Tên lớp từ API, có thể là null
//   ngayDiemDanh: string;              // Ngày điểm danh
//   trangThai: 'CoMat' | 'VangCoPhep' | 'VangKhongPhep' | 'DiTre'; // Trạng thái điểm danh
// }

@Injectable({
  providedIn: 'root'
})
export class DiemDanhService {
  private apiUrl = 'http://localhost:8080/api/v1/diem-danh';
  private defaultToken = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJuZ3V5ZW50aGlhbiIsImlhdCI6MTczMDY0MDg4MSwiZXhwIjoxNzMwNzI3MjgxfQ.LR4ZNM6joaK9SxyKOgJNJqqORX-Z_b7WqcrZa14rugs';

  // Dữ liệu mẫu
  private sampleData: DiemDanh[] = [
    { id: 1, hoTen: 'Nguyễn Văn A', ngaySinh: '2015-04-12', gioiTinh: 'Nam', classId: 1, tenLop: 'Lớp 1A', ngayDiemDanh: '2024-10-16', trangThai: 'CoMat' },
    { id: 2, hoTen: 'Lê Thị B', ngaySinh: '2015-05-23', gioiTinh: 'Nu', classId: 1, tenLop: 'Lớp 1A', ngayDiemDanh: '2024-10-16', trangThai: 'VangCoPhep' },
    { id: 3, hoTen: 'Trần Văn C', ngaySinh: '2015-07-14', gioiTinh: 'Nam', classId: 2, tenLop: null, ngayDiemDanh: '2024-10-16', trangThai: 'DiTre' }
  ];

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = (typeof window !== 'undefined' && localStorage.getItem('AccessToken')) || this.defaultToken;
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  getAllDiemDanh(): Observable<DiemDanh[]> {
    return this.http.get<any[]>(`${this.apiUrl}/lay-tat-ca-tre`, { headers: this.getHeaders() }).pipe(
      map(data => data.map(hs => ({
        id: hs.id,
        hoTen: hs.hoTen,
        ngaySinh: `${hs.ngaySinh[0]}-${String(hs.ngaySinh[1]).padStart(2, '0')}-${String(hs.ngaySinh[2]).padStart(2, '0')}`,
        gioiTinh: hs.gioiTinh === 'Nam' ? 'Nam' : 'Nu',
        classId: hs.classId,
        tenLop: hs.tenLop ? hs.tenLop : `Lớp ${hs.classId}`,
        ngayDiemDanh: new Date().toISOString().split('T')[0],
        trangThai: hs.trangThai as 'CoMat' | 'VangCoPhep' | 'VangKhongPhep' | 'DiTre' // Ép kiểu trực tiếp
      }))),
      catchError(() => {
        console.warn('API không khả dụng. Sử dụng dữ liệu mẫu để hiển thị.');
        return of(this.sampleData);
      })
    );
  }

  // Thêm mới điểm danh cho học sinh
  addDiemDanh(diemDanh: DiemDanh): Observable<DiemDanh> {
    return this.http.post<DiemDanh>(`${this.apiUrl}/them`, diemDanh, { headers: this.getHeaders() }).pipe(
      catchError((error) => {
        console.error('Lỗi khi thêm điểm danh:', error);
        return of(diemDanh); // Trả về dữ liệu mẫu nếu gặp lỗi
      })
    );
  }

  // Cập nhật điểm danh
  updateDiemDanh(diemDanh: DiemDanh): Observable<DiemDanh> {
    return this.http.put<DiemDanh>(`${this.apiUrl}/cap-nhat`, diemDanh, { headers: this.getHeaders() }).pipe(
      catchError((error) => {
        console.error('Lỗi khi cập nhật điểm danh:', error);
        return of(diemDanh); // Trả về dữ liệu mẫu nếu gặp lỗi
      })
    );
  }

  // Xóa điểm danh dựa trên id và ngày điểm danh
  deleteDiemDanh(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/xoa/${id}`, { headers: this.getHeaders() }).pipe(
      catchError((error) => {
        console.error('Lỗi khi xóa điểm danh:', error);
        return of(undefined); // Trả về undefined nếu gặp lỗi
      })
    );
  }
}