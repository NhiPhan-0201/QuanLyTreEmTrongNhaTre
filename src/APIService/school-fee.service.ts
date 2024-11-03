import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HocPhi } from '../models/HocPhi';
import { NhomLop } from '../models/NhomLop';

@Injectable({
    providedIn: 'root'
})
export class SchoolFeeService {
    private apiUrl = 'http://localhost:8080/api/v1/hoc-phi';

    constructor(private http: HttpClient) { }

    // Lấy token
    private getAuthHeaders(): HttpHeaders {
        const token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTczMDQ3NjM5NywiZXhwIjoxNzMwNTYyNzk3fQ.HwTUthz6JLZHX1a_Oo0HAuYI5FSm0W8CCy7rk4a2ASM";
        return new HttpHeaders().set('Authorization', `Bearer ${token || ''}`);
    }

    getSchoolFees(): Observable<HocPhi[]> {
        return this.http.get<HocPhi[]>(this.apiUrl, { headers: this.getAuthHeaders() });
    }

    addSchoolFee(schoolFee: HocPhi): Observable<HocPhi> {
        return this.http.post<HocPhi>(this.apiUrl, schoolFee, { headers: this.getAuthHeaders() });
    }

    updateSchoolFee(id: number, schoolFee: HocPhi): Observable<HocPhi> {
        return this.http.put<HocPhi>(`${this.apiUrl}/${id}`, schoolFee, { headers: this.getAuthHeaders() });
    }

    deleteSchoolFee(id: number): Observable<string> {
        return this.http.delete<string>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
    }

    getClasses(): Observable<NhomLop[]> {
        return this.http.get<NhomLop[]>('http://localhost:8080/api/v1/nhom-lop', { headers: this.getAuthHeaders() });
    }
}
