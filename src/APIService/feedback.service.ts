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
    const token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTczMDQ3MTE0OCwiZXhwIjoxNzMwNTU3NTQ4fQ.0ExCyLkcqrFQCJmHDxgvjgXwUK7A-axtBfl39SfqeGU";
    return new HttpHeaders().set('Authorization', `Bearer ${token || ''}`);
  }

  // Lấy danh sách ý kiến với phân trang và lọc theo thể loại
  getFeedbackByAdmin(page: number, theLoaiId: string): Observable<any> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('theLoaiId', theLoaiId);

    return this.http.get<any>(`${this.apiUrl}/admin`, { headers: this.getAuthHeaders(), params });
  }
}
