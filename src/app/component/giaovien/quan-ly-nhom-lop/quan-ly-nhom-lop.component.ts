import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-quan-ly-nhom-lop',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quan-ly-nhom-lop.component.html',
  styleUrls: ['./quan-ly-nhom-lop.component.css']
})
export class QuanLyNhomLopComponent implements OnInit {
  nhomLop: any[] = [];
  apiUrl: string = 'http://localhost:8080/api/v1/nhom-lop';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadNhomLop();
  }

  loadNhomLop(): void {
    this.http.get<any>(this.apiUrl).subscribe(response => {
      if (response.EM === 'success') {
        this.nhomLop = response.DT;
      } else {
        console.error('Error fetching group data');
      }
    }, error => {
      console.error('API error: ', error);
    });
  }
}
