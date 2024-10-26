import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SchoolFeeService {
    private apiUrl = 'http://localhost:8080/api/v1/hoc-phi';

    constructor(private http: HttpClient) { }

    // Lấy token
    private getAuthHeaders(): HttpHeaders {
        const token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTcyOTk0NTkzNywiZXhwIjoxNzMwMDMyMzM3fQ.dxXfwQYpPW3WJmvP_cxBrU-bwL8tTcpl7V50F9_SOAc";
        return new HttpHeaders().set('Authorization', `Bearer ${token || ''}`);
    }

    // Lấy danh sách học phí
    getSchoolFees(): Observable<any> {
        const headers = this.getAuthHeaders();
        return this.http.get<any>(this.apiUrl, { headers });
    }

    // Thêm mới học phí
    addSchoolFee(schoolFee: any): Observable<any> {
        const headers = this.getAuthHeaders();
        return this.http.post<any>(this.apiUrl, schoolFee, { headers });
    }

    // Cập nhật học phí
    updateSchoolFee(id: number, schoolFee: any): Observable<any> {
        const headers = this.getAuthHeaders();
        return this.http.put<any>(`${this.apiUrl}/${id}`, schoolFee, { headers });
    }

    // Xóa học phí
    deleteSchoolFee(id: number): Observable<void> {
        const headers = this.getAuthHeaders();
        return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers });
    }

    getClasses(): Observable<any> {
        const headers = this.getAuthHeaders();
        return this.http.get<any>('http://localhost:8080/api/v1/nhom-lop', { headers });
    }
}
