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
  uniqueId: string;
}

@Component({
  selector: 'app-giaovien-noidungthongbao',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './giaovien-noidungthongbao.component.html',
  styleUrl: './giaovien-noidungthongbao.component.css'
})
export class GiaovienNoidungthongbaoComponent implements OnInit {
  thongBao$: Observable<ThongBao | undefined> = of(undefined);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private thongBaoService: ThongBaoService
  ) {}

  ngOnInit(): void {
    const uniqueId = this.route.snapshot.paramMap.get('uniqueId'); // Lấy uniqueId từ route

    if (uniqueId) {
      const [loaiThongBao, id] = uniqueId.split('_'); // Tách loaiThongBao và id

      this.thongBao$ = this.thongBaoService.getThongBao().pipe(
        map((thongBaoList: ThongBao[]) =>
          thongBaoList.find(
            thongBao =>
              thongBao.id === Number(id) && thongBao.loaiThongBao === loaiThongBao
          )
        )
      );
    }
  }

  goBack(): void {
    this.router.navigate(['/giaovien-management/danhsachthongbao']);
  }
}