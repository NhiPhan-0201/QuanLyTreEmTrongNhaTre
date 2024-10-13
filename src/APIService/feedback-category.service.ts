import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeedbackCategoryService {
  private apiUrl = 'http://localhost:8080/api/v1/the-loai-y-kien';
  constructor(private http: HttpClient) { }

  // Lấy danh sách thể loại ý kiến
  getCategories(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  // Thêm mới thể loại ý kiến
  addCategory(category: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, category);
  }

  // Cập nhật thể loại ý kiến
  updateCategory(id: number, category: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, category);
  }

  // Xóa thể loại ý kiến
  deleteCategory(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
