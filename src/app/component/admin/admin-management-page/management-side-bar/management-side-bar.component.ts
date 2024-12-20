import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { SideBarItem } from '../admin-management-page.component';

@Component({
  selector: 'app-management-side-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './management-side-bar.component.html'
})
export class ManagementSideBarComponent {

  @Input() sideBarItems!: SideBarItem[];

  sideBarToggled = "side-bar-not-toggled";
  hoverSideBarToggle = false;
  hoverSideBar = false;

  constructor(private router: Router) { }

  isOpen = false;
  isClosed = false;

  toggleSidebar() {
    this.isOpen = !this.isOpen;
    this.isClosed = !this.isClosed;
  }

  onMouseEnter() {
    this.isOpen = true;
  }

  onMouseLeave() {
    this.isOpen = false;
  }

  handleClickItem(item: SideBarItem) {
    if (item.path === '/home') {
      this.router.navigate([item.path]);
      return;
    }
    this.router.navigate([`/admin/manage/${item.path}`]);
  }
}
