import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-xem-danh-gia-tre',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './xem-danh-gia-tre.component.html',
  styleUrl: './xem-danh-gia-tre.component.css'
})
export class XemDanhGiaTreComponent implements OnInit {
  studentName: string = 'Tên Bé';
  teacherReviews: any[] = [];
  treId: number = 1;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchReviews();
  }

  fetchReviews(): void {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this.http.get<any[]>(`http://localhost:8080/api/v1/danh-gia-tre-em/tre/${this.treId}`, { headers })
      .subscribe(
        (data) => {
          this.teacherReviews = data;
        },
        (error) => {
          console.error('Error fetching reviews:', error);
        }
      );
  }
}
