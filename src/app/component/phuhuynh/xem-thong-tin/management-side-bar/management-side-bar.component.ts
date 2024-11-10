import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { relative } from 'path';
import { SideBarItem } from '../xem-thong-tin.component';

@Component({
  selector: 'app-management-side-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './management-side-bar.component.html',
  styleUrl: './management-side-bar.component.css'
})
export class ManagementSideBarComponent {

  @Input() sideBarItems!: SideBarItem[];

  sideBarToggled = "side-bar-not-toggled";
  hoverSideBarToggle = false;
  hoverSideBar = false;

  constructor(private router: Router) { }

  handleMouseEnterSideBarToggle() {
    this.sideBarToggled = "side-bar-toggled";
  }

  handleMouseLeaveSideBarToggle() {
    this.hoverSideBarToggle = false;
    if (!this.hoverSideBar) {
      this.sideBarToggled = "side-bar-not-toggled";
    }
  }

  handleMouseEnterSideBar() {
    this.hoverSideBar = true;
    this.sideBarToggled = "side-bar-toggled";
  }

  handleMouseLeaveSideBar() {
    this.hoverSideBar = false;
    if (!this.hoverSideBarToggle) {
      this.sideBarToggled = "side-bar-not-toggled";
    }
  }

  handleClickSideBarToggle() {
    this.sideBarToggled = this.sideBarToggled === "side-bar-toggled" ? "side-bar-not-toggled" : "side-bar-toggled";
  }

  handleNavigate(path: string) {
    this.hoverSideBar = this.hoverSideBarToggle = false;
    this.sideBarToggled = "side-bar-not-toggled";
    this.router.navigate(['/admin/manage/' + path]);
  }
}
