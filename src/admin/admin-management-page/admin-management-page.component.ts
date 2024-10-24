import { Component, OnInit } from '@angular/core';
import { ManagementSideBarComponent } from './management-side-bar/management-side-bar.component';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { AccountManagementComponent } from './account-management/account-management.component';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-admin-management-page',
  standalone: true,
  imports: [RouterOutlet, ManagementSideBarComponent, AccountManagementComponent],
  templateUrl: './admin-management-page.component.html',
  styleUrls: ['./admin-management-page.component.css']
})
export class AdminManagementPageComponent implements OnInit {
  sideBarItems: SideBarItem[];
  constructor(private router: Router) {
    this.sideBarItems = [
      { name: 'Quản lý tài khoản', path: 'accounts' },
      { name: 'Quản lý học sinh', path: 'students' },
      { name: 'Quản lý lớp học', path: 'classes' },
    ];
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
