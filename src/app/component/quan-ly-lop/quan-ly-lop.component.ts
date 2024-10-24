import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
  styleUrl: './quan-ly-lop.component.css',
  styles: [`
    .class-list { background-color: #f0f4ff; padding: 20px; }
    .class-card { background: #fff; padding: 10px; border: 1px solid #ccc; margin: 10px; cursor: pointer; }
    .class-card:hover { background-color: #f0f4ff; }
  `]
})
export class QuanLyLopComponent implements OnInit {
  classes: Class[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchClasses();
  }

  fetchClasses(): void {
    this.http.get<{ DT: Class[] }>('http://localhost:8080/api/v1/quan-li-lop')
      .subscribe(response => {
        this.classes = response.DT;
      }, error => {
        console.error('Error fetching classes:', error);
      });
  }
}
