import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DiemDanhService {
  private apiUrl = 'http://localhost:8080/api/v1/diem-danh';

  constructor(private http: HttpClient) {}

  getAttendanceByStudentId(idTre: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/lay-theo-id-tre/${idTre}`);
  }
}
