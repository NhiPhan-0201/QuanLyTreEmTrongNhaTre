import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { DiemDanh } from '../models/DiemDanh';
import { LopHoc } from '../models/LopHoc';

@Injectable({
  providedIn: 'root'
})
export class DiemDanhService {
  private apiUrl = 'http://localhost:8080/api/v1/diem-danh';
  
  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = (typeof window !== 'undefined' && localStorage.getItem('access_token'));
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  // Lấy thông tin phụ huynh theo id
  getParentInfo(id: number): Observable<any> {
    return this.http.get<any>(`http://localhost:8080/api/v1/parentinfo/children/${id}`, {
      headers: this.getHeaders()
    });
  }

  // Lấy tất cả học sinh (sử dụng làm danh sách lớp và học sinh)
  getAllStudents(): Observable<DiemDanh[]> {
    return this.http.get<DiemDanh[]>(`${this.apiUrl}/lay-tat-ca-tre`, { headers: this.getHeaders() }).pipe(
      catchError(() => of([]))
    );
  }

  // Kiểm tra điểm danh của một học sinh theo id và ngày
  checkDiemDanhExists(id: number, ngayDiemDanh: string): Observable<boolean> {
    return this.http.get(`${this.apiUrl}/${id}/${ngayDiemDanh}`, { headers: this.getHeaders() }).pipe(
      map(() => true),
      catchError(() => of(false))
    );
  }

  // Lấy điểm danh theo id học sinh và ngày
  getDiemDanhByStudentAndDate(id: number, ngayDiemDanh: string): Observable<DiemDanh | null> {
    return this.http.get<DiemDanh>(`${this.apiUrl}/${id}/${ngayDiemDanh}`, { headers: this.getHeaders() }).pipe(
      catchError(() => of(null as unknown as DiemDanh))
    );
  }

  // Thêm mới điểm danh
  addDiemDanh(diemDanh: DiemDanh): Observable<any> {
    return this.http.post(`${this.apiUrl}/them`, diemDanh, {
      headers: this.getHeaders(),
      responseType: 'text' as 'json' // Chỉ định kiểu phản hồi là văn bản
    }).pipe(
      catchError((error) => {
        console.error('Lỗi khi thêm điểm danh:', error);
        return of({ message: 'Không thể thêm điểm danh' }); // Trả về thông báo lỗi mặc định nếu gặp lỗi
      })
    );
  }

  // Cập nhật điểm danh
  updateDiemDanh(updateBody: { idOfIdTre: number; ngayDiemDanh: string; trangThai: string }): Observable<any> {
    return this.http.put(`${this.apiUrl}/cap-nhat`, updateBody, {
      headers: this.getHeaders(),
      responseType: 'text' as 'json' // Chỉ định phản hồi dưới dạng văn bản
    }).pipe(
      catchError((error) => {
        console.error('Lỗi khi cập nhật điểm danh:', error);
        return of({ message: 'Không thể cập nhật điểm danh' }); // Thông báo lỗi mặc định nếu gặp lỗi
      })
    );
  }

  // Thêm phương thức để lấy danh sách các lớp mà giáo viên phụ trách
  getTeacherClasses(): Observable<LopHoc[]> {
    return this.http.get<LopHoc[]>(`http://localhost:8080/api/v1/giaovien/get-all-class-of-teacher`, {
      headers: this.getHeaders()
    }).pipe(
      catchError(() => of([])) // Trả về danh sách trống nếu gặp lỗi
    );
  }
}