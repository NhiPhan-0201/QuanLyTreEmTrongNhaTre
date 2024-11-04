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
    const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTczMDU0OTkwMSwiZXhwIjoxNzMwNjM2MzAxfQ.Dp3pys5M9kbSZGKmURnxZKk_5AwOfjUNhSGmFdP2hZ0';
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.get<Class[]>(`${this.apiUrl}/${idGiaoVien}`, { headers })
      .subscribe(
        response => {
          this.classes = response;
        },
        error => {
          console.error('Error fetching classes:', error);
        }
      );
  }
}
