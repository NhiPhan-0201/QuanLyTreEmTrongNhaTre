import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeedbackCategoryService {
  private apiUrl = 'http://localhost:8080/api/v1/the-loai-y-kien';

  constructor(private http: HttpClient) { }

  // Lấy token 
  private getAuthHeaders(): HttpHeaders {
    const token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTcyOTQ0NjczNSwiZXhwIjoxNzI5NTMzMTM1fQ.GOzPpAYqUoiYJ1I5QUMh9fG4h91vVor_MiIqRyWSO8U";
    return new HttpHeaders().set('Authorization', `Bearer ${token || ''}`);
  }

  // Lấy danh sách thể loại ý kiến
  getCategories(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  // Thêm mới thể loại ý kiến
  addCategory(category: any): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post<any>(this.apiUrl, category, { headers });
  }

  // Cập nhật thể loại ý kiến
  updateCategory(id: number, category: any): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.put<any>(`${this.apiUrl}/${id}`, category, { headers });
  }

  // Xóa thể loại ý kiến
  deleteCategory(id: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.delete<any>(`${this.apiUrl}/${id}`, { headers });
  }
}
