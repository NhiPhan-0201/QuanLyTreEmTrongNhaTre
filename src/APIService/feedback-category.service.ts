import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TheLoaiYKien } from '../models/TheLoaiYKien';

@Injectable({
  providedIn: 'root'
})
export class FeedbackCategoryService {
  private apiUrl = 'http://localhost:8080/api/v1/the-loai-y-kien';

  constructor(private http: HttpClient) { }

  // Lấy token 
  private getAuthHeaders(): HttpHeaders {
    const token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTczMDQ2NjU5MCwiZXhwIjoxNzMwNTUyOTkwfQ.YiIm_ovyY-NZ16-53Iiy8AIX_-7q6zCTQxHF3nHW5kw";
    return new HttpHeaders().set('Authorization', `Bearer ${token || ''}`);
  }

  // Lấy danh sách thể loại ý kiến
  getCategories(): Observable<TheLoaiYKien[]> {
    return this.http.get<TheLoaiYKien[]>(this.apiUrl);
  }

  // Thêm mới thể loại ý kiến
  addCategory(category: TheLoaiYKien): Observable<TheLoaiYKien> {
    return this.http.post<TheLoaiYKien>(this.apiUrl, category, { headers: this.getAuthHeaders() });
  }

  // Cập nhật thể loại ý kiến
  updateCategory(id: number, category: TheLoaiYKien): Observable<TheLoaiYKien> {
    return this.http.put<TheLoaiYKien>(`${this.apiUrl}/${id}`, category, { headers: this.getAuthHeaders() });
  }

  // Xóa thể loại ý kiến
  deleteCategory(id: number): Observable<TheLoaiYKien> {
    return this.http.delete<TheLoaiYKien>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }
}
