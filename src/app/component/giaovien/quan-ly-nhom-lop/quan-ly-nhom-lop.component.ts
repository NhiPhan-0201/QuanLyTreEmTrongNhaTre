import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-quan-ly-nhom-lop',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quan-ly-nhom-lop.component.html',
  styleUrls: ['./quan-ly-nhom-lop.component.css']
})
export class QuanLyNhomLopComponent implements OnInit {
  nhomLop: any = {};
  private apiUrl: string = 'http://localhost:8080/api/v1/nhom-lop';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const id = 1;  
    this.loadNhomLop(id);
  }

  loadNhomLop(id: number): void {
    const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTczMDAzMTE2MSwiZXhwIjoxNzMwMTE3NTYxfQ.NRE-x7SOZoe9Aag6mb3i0jRFHYrOba4vjoO8shQP0no';
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.get<{ DT: any; EM: string }>(`${this.apiUrl}/${id}`, { headers })
      .subscribe(
        response => {
          console.log('API Response:', response);
          if (response.EM === 'success') {
            this.nhomLop = Array.isArray(response.DT) ? response.DT : [response.DT];
          } else {
            console.error('Nhóm lớp không tồn tại:', response.EM);
          }
        },
        error => {
          console.error('API error:', error);
        }
      );
  }

}
