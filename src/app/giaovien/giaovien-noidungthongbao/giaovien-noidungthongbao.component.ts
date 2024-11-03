import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ThongBaoService } from '../../../APIService/thongbao.service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';


interface ThongBao {
  id: number;
  tieuDe: string;
  noiDung: string;
  loaiThongBao: string;
}

@Component({
  selector: 'app-giaovien-noidungthongbao',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './giaovien-noidungthongbao.component.html',
  styleUrl: './giaovien-noidungthongbao.component.css'
})
export class GiaovienNoidungthongbaoComponent implements OnInit {
  thongBao$: Observable<ThongBao | undefined> = of(undefined); // Khởi tạo Observable để chứa thông báo tìm thấy

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private thongBaoService: ThongBaoService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id')); // Lấy id từ route

    // Gọi service để lấy tất cả thông báo và sau đó lọc theo id
    this.thongBao$ = this.thongBaoService.getThongBao().pipe(
      map((thongBaoList: ThongBao[]) => thongBaoList.find(thongBao => thongBao.id === id))
    );
  }

  // Hàm quay về danh sách thông báo
  goBack(): void {
    this.router.navigate(['/giaovien-management/danhsachthongbao']);
  }
}
