import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';

interface Class {
  id: number;
  tenLop: string;
  tenGiaoVien: string;
  tenPhong: string;
  viTri: string;
  idNhomLop: number;
  idGiaoVien: number;
}

@Component({
  selector: 'app-quan-ly-lop',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quan-ly-lop.component.html',
  styleUrls: ['./quan-ly-lop.component.css'],
  styles: [`
    .class-list { background-color: #f0f4ff; padding: 20px; }
    .class-card { background: #fff; padding: 10px; border: 1px solid #ccc; margin: 10px; cursor: pointer; }
    .class-card:hover { background-color: #f0f4ff; }
  `]
})
export class QuanLyLopComponent implements OnInit {
  classes: Class[] = [];
  private readonly apiUrl = 'http://localhost:8080/api/v1/quan-li-lop/lop';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const idGiaoVien = 1;
    this.fetchClasses(idGiaoVien);
  }

  fetchClasses(idGiaoVien: number): void {
    const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTczMDAzMTk1NywiZXhwIjoxNzMwMTE4MzU3fQ.csvvN4y60W5aHewJvV7DMJXoev2okQx04Kxzrdr1jQI';

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.get<{ DT: Class[]; EM: string }>(`${this.apiUrl}/${idGiaoVien}`, { headers })
      .subscribe(
        response => {
          if (response.EM === 'success') {
            this.classes = response.DT;
          } else {
            console.error('Error fetching classes:', response.EM);
          }
        },
        error => {
          console.error('Request failed:', error);
        }
      );
  }
}
