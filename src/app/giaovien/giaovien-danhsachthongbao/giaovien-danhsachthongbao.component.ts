import { Component, OnInit } from '@angular/core';
import { ThongBaoService } from '../../../APIService/thongbao.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface ThongBao {
  id: number;
  tieuDe: string;
  noiDung: string;
  loaiThongBao: string;
  uniqueId: string;
}

@Component({
  selector: 'app-giaovien-danhsachthongbao',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './giaovien-danhsachthongbao.component.html',
  styleUrl: './giaovien-danhsachthongbao.component.css'
})
export class GiaovienDanhsachthongbaoComponent implements OnInit {
  thongBaoList: ThongBao[] = [];

  constructor(private thongBaoService: ThongBaoService, private router: Router) {}

  ngOnInit(): void {
    this.thongBaoService.getThongBao().subscribe(
        (data) => {
        console.log('Data received:', data);
        this.thongBaoList = data;
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  viewThongBao(uniqueId: string): void {
    this.router.navigate(['/giaovien-management/noidungthongbao', uniqueId]);
  }
}