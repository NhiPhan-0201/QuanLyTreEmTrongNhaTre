import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'view-meal-menu',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './view-meal-menu.component.html',
  styleUrl: './view-meal-menu.component.css'
})
export class XemThucDonComponent implements OnInit {
  menuData: any[] = [];
  selectedDate: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    this.http.get<any[]>('http://localhost:8080/api/thucdon', { headers })
    .subscribe((data) => {
      this.menuData = data;
    });
    this.menuData = [
      {
        "id": 1,
        "menuDate": [2024, 9, 19],
        "sang": "Cháo gà, Bánh mì kẹp, Trứng ốp la",
        "trua": "Súp rau củ, Cơm chiên, Gà xào nấm",
        "chieu": "Sữa chua, Trái cây, Bánh flan",
        "nhomLop": {
          "id": 1,
          "tenNhom": "Cơm nát"
        }
      },
      {
        "id": 2,
        "menuDate": [2024, 9, 20],
        "sang": null,
        "trua": "Canh bí đỏ, Cơm trắng, Cá kho tộ",
        "chieu": "Nước ép táo, Sinh tố dưa hấu, Sữa đậu nành",
        "nhomLop": {
          "id": 1,
          "tenNhom": "Cơm nát"
        }
      }
    ];
  }

  filterByDate(): void {
    if (this.selectedDate) {
      this.menuData = this.menuData.filter(menu => {
        const dateStr = `${menu.menuDate[0]}-${menu.menuDate[1].toString().padStart(2, '0')}-${menu.menuDate[2].toString().padStart(2, '0')}`;
        return dateStr === this.selectedDate;
      });
    }
  }
}
