import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  private apiUrl = 'http://localhost:8080/api/v1/y-kien';

  constructor(private http: HttpClient) { }

  // Lấy token 
  private getAuthHeaders(): HttpHeaders {
    const token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTcyOTg3Nzc2MywiZXhwIjoxNzI5OTY0MTYzfQ.LkMxpUiDBpANn83qyY30hGxohWKGfRAUGfT_8UxSmcM";
    return new HttpHeaders().set('Authorization', `Bearer ${token || ''}`);
  }

  // Lấy danh sách ý kiến với phân trang và lọc theo thể loại
  getFeedbackByAdmin(page: number, theLoaiId: string): Observable<any> {
    const headers = this.getAuthHeaders();

    let params = new HttpParams()
      .set('page', page.toString())
      .set('theLoaiId', theLoaiId);

    return this.http.get<any>(`${this.apiUrl}/admin`, { headers, params });
  }
}
