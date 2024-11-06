import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ReportService {
    private baseUrl = 'http://localhost:8080/api/v1/thong-ke';

    constructor(private http: HttpClient) { }

    // 1. Thống kê số lượng học sinh toàn trường/giới tính
    getTotalStudent(): Observable<any> {
        return this.http.get(`${this.baseUrl}/ti-le-hoc-sinh-toan-truong`);
    }

    // 2. Thống kê số lượng học sinh theo lớp
    getStudentByClass(): Observable<any> {
        return this.http.get(`${this.baseUrl}/ti-le-hoc-sinh-theo-lop`);
    }

    // 3. Thống kê học sinh theo nhóm
    getStudentByGroup(): Observable<any> {
        return this.http.get(`${this.baseUrl}/thong-ke-so-luong-hoc-sinh-theo-nhom-lop`);
    }

    // 4. Thống kê học phí nhóm lớp theo tháng
    getMonthlyFeeByGroup(): Observable<any> {
        return this.http.get(`${this.baseUrl}/hoc-phi-theo-nhom-lop`);
    }

    // 5. Thống kê học sinh vắng trễ toàn trường
    getAbsenceAndLate(): Observable<any> {
        return this.http.get(`${this.baseUrl}/vang-tre-toan-truong`);
    }

    // 6. Thống kê vắng trễ theo lớp và ngày
    getAbsenceAndLateByClass(classId: number): Observable<any> {
        return this.http.get(`${this.baseUrl}/vang-tre-lop/${classId}`);
    }
}
