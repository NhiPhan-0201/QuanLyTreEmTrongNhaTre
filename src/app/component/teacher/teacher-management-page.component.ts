import { Component, OnInit } from '@angular/core';
import { SideBarManagementComponent } from './side-bar-management/side-bar-management.component';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-teacher-management-page',
  standalone: true,
  imports: [RouterOutlet, SideBarManagementComponent],
  templateUrl: './teacher-management-page.component.html',
  styleUrls: ['./teacher-management-page.component.css']
})
export class TeacherManagementPageComponent implements OnInit {
  sideBarItems: SideBarItem[];
  constructor(private router: Router) {
    this.sideBarItems = [
      { name: 'Danh sách học sinh', path: 'student-list' },
      { name: 'Điểm danh', path: 'attendance-records' },
      { name: 'Danh sách thông báo', path: 'notification-list' },
      { name: 'Xem lớp', path: 'class-management' },
      { name: 'Xem nhóm lớp', path: 'class-group-management' },
      { name: 'Xem thực đơn', path: 'view-meal-menu' },
      { name: 'Gửi thông báo', path: 'notifications' },
      { name: 'Xem thời khóa biểu', path: 'timetable-management' },
      { name: 'Xem đánh giá', path: 'rating' }
    ];
    this.sideBarItems.push({ name: 'Trở về trang chủ', path: '/home' });
  }

  refreshActiveItem = () => {
    this.sideBarItems.forEach(item => {
      item.active = this.router.url.includes(item.path);
    });
  }

  ngOnInit(): void {
    this.refreshActiveItem();
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(this.refreshActiveItem);
  }
}

export interface SideBarItem {
  name: string;
  path: string;
  active?: boolean;
}
