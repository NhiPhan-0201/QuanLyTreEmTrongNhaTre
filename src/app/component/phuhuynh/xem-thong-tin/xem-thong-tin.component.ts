import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-xem-thong-tin',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './xem-thong-tin.component.html',
  styleUrls: ['./xem-thong-tin.component.css']
})
export class XemThongTinComponent implements OnInit {
  sideBarItems: SideBarItem[] = [
    { name: 'Thông tin học sinh', path: 'student-info' },
    { name: 'Thông tin giáo viên', path: 'teacher-info' }
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.refreshActiveItem();
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => this.refreshActiveItem());
  }

  // Cập nhật trạng thái active cho các item trong sidebar
  refreshActiveItem(): void {
    this.sideBarItems.forEach(item => {
      item.active = this.router.url.includes(item.path);
    });
  }

  // Hàm gọi khi click vào item trong sidebar
  onSideBarItemClick(item: SideBarItem): void {
    console.log(`Navigating to: /xem-thong-tin/${item.path}`);
    this.router.navigate([`/xem-thong-tin/${item.path}`]);  // Điều hướng tới component tương ứng
  }
}

export interface SideBarItem {
  name: string;
  path: string;
  active?: boolean;
}
