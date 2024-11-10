import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  private apiUrl = 'http://localhost:8080/api/v1/y-kien';

  constructor(private http: HttpClient) {}

  sendFeedback(feedback: { theLoaiId: number; tieuDe: string; noiDung: string; hinhAnh: string }): Observable<any> {
    return this.http.post(this.apiUrl, feedback);
  }
}
