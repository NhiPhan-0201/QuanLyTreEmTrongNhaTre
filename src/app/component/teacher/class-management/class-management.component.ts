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
  selector: 'app-class-management',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './class-management.component.html',
  styleUrls: ['./class-management.component.css'],
  styles: [
    `
      .class-list {
        background-color: #f0f4ff;
        padding: 20px;
      }
      .class-card {
        background: #fff;
        padding: 10px;
        border: 1px solid #ccc;
        margin: 10px;
        cursor: pointer;
      }
      .class-card:hover {
        background-color: #f0f4ff;
      }
    `,
  ],
})
export class QuanLyLopComponent implements OnInit {
  classes: Class[] = [];
  private readonly apiUrl = 'http://localhost:8080/api/v1/quan-li-lop/lop';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const idGVString = localStorage.getItem('idAccount');
    const idGV = idGVString ? parseInt(idGVString, 10) : null;
    if (idGV !== null) {
      this.fetchClasses(idGV);
    } else {
      this.fetchClasses(2);
      console.error('idAccount không tồn tại trong localStorage');
      console.log(idGVString);
    }
  }

  fetchClasses(idGiaoVien: number): void {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.get<Class[]>(`${this.apiUrl}/${idGiaoVien}`, { headers }).subscribe(
      (response) => {
        this.classes = response;
      },
      (error) => {
        console.error('Error fetching classes:', error);
      }
    );
  }
}
