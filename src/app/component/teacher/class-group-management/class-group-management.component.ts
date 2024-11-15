import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-class-group-management',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './class-group-management.component.html',
  styleUrls: ['./class-group-management.component.css']
})
export class QuanLyNhomLopComponent implements OnInit {
  nhomLop: any[] = [];
  private apiUrl: string = 'http://localhost:8080/api/v1/nhom-lop';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const id = 4;
    this.loadNhomLop(id);
  }

  loadNhomLop(id: number): void {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.get<any>(`${this.apiUrl}/${id}`, { headers })
      .subscribe(
        response => {
          console.log('API Response:', response);

          if (Array.isArray(response)) {
            this.nhomLop = response;
          } else if (response) {
            this.nhomLop = [response];
          } else {
            this.nhomLop = []; 
          }
        },
        error => {
          console.error('API error:', error);
        }
      );
  }
}
