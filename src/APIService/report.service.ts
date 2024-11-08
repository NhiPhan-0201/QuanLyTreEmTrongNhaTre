import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ReportService {
    private baseUrl = 'http://localhost:8080/api/v1/thong-ke';

    private getAuthHeaders(): HttpHeaders {
        const token = localStorage.getItem('access_token');
        return new HttpHeaders().set('Authorization', `Bearer ${token || ''}`);
    }


    constructor(private http: HttpClient) { }

    // 1. Thống kê số lượng học sinh toàn trường/giới tính
    getTotalStudent(): Observable<any> {
        return this.http.get(`${this.baseUrl}/ti-le-hoc-sinh-toan-truong`, { headers: this.getAuthHeaders() });
    }

    // 2. Thống kê số lượng học sinh theo lớp
    getStudentByClass(): Observable<any> {
        return this.http.get(`${this.baseUrl}/ti-le-hoc-sinh-theo-lop`, { headers: this.getAuthHeaders() });
    }

    // 3. Thống kê học sinh theo nhóm
    getStudentByGroup(): Observable<any> {
        return this.http.get(`${this.baseUrl}/thong-ke-so-luong-hoc-sinh-theo-nhom-lop`, { headers: this.getAuthHeaders() });
    }

    // 4. Thống kê học phí nhóm lớp theo tháng
    getMonthlyFeeByGroup(): Observable<any> {
        return this.http.get(`${this.baseUrl}/hoc-phi-theo-nhom-lop`, { headers: this.getAuthHeaders() });
    }

    // 5. Thống kê học sinh vắng trễ toàn trường
    getAbsenceAndLate(): Observable<any> {
        return this.http.get(`${this.baseUrl}/vang-tre-toan-truong`, { headers: this.getAuthHeaders() });
    }

    // 6. Thống kê vắng trễ theo lớp và ngày
    getAbsenceAndLateByClass(classId: number): Observable<any> {
        return this.http.get(`${this.baseUrl}/vang-tre-lop/${classId}`, { headers: this.getAuthHeaders() });
    }
}
