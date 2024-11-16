import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XemthongbaoService } from '../../../../APIService/xemthongbao.service';

@Component({
  selector: 'app-xem-thong-bao',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './xem-thong-bao.component.html',
  styleUrls: ['./xem-thong-bao.component.css']
})
export class XemThongBaoComponent implements OnInit {
  announcements: any[] = [];

  constructor(private notificationService: XemthongbaoService) {}

  ngOnInit(): void {
    this.fetchAnnouncements();
  }

  fetchAnnouncements(): void {
    this.notificationService.getThongBao().subscribe(
      (data: any[]) => this.announcements = data,
      (error: any) => console.error('Error fetching announcements:', error)
    );
  }
}
