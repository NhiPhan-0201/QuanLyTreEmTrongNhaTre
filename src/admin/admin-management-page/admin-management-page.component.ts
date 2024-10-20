import { Component } from '@angular/core';
import { ManagementSideBarComponent } from '../management-side-bar/management-side-bar.component';
import { AccountManagementComponent } from '../account-management/account-management.component';

@Component({
  selector: 'app-admin-management-page',
  standalone: true,
  imports: [AccountManagementComponent, ManagementSideBarComponent],
  templateUrl: './admin-management-page.component.html',
  styleUrl: './admin-management-page.component.css'
})
export class AdminManagementPageComponent {

}
