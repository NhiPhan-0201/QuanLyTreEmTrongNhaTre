import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-phuhuynh',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './phuhuynh.component.html',
  styleUrls: ['./phuhuynh.component.css']
})
export class PhuhuynhComponent implements OnInit {
  sideBarItems: SideBarItem[] = [
    { name: 'Thông báo', path: 'xem-thong-bao' },
    { name: 'Thời khóa biểu', path: 'xem-thoi-khoa-bieu' },
    {
      name: 'Thông tin', 
      path: '', 
      children: [
        { name: 'Thông tin học sinh', path: 'student-info' },
        { name: 'Thông tin giáo viên', path: 'teacher-info' }
      ]
    }
  ];

  sidebarOpen: boolean = true;  // Sidebar luôn mở

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.refreshActiveItem();
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => this.refreshActiveItem());
  }

  refreshActiveItem(): void {
    this.sideBarItems.forEach(item => {
      if (item.children) {
        item.active = item.children.some(child => this.router.url.includes(child.path));
      } else {
        item.active = this.router.url.includes(item.path);
      }
    });
  }

  onSideBarItemClick(item: SideBarItem): void {
    if (item.children) {
      item.expanded = !item.expanded;
    } else {
      this.router.navigate([`/phuhuynh/${item.path}`]);
    }
  }
}

export interface SideBarItem {
  name: string;
  path: string;
  active?: boolean;
  expanded?: boolean;
  children?: SideBarItem[];
}
