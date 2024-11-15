import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-side-bar-management',
  standalone: true,
  imports: [RouterModule],  
  templateUrl: './side-bar-management.component.html',
  styleUrls: ['./side-bar-management.component.css']  
})
export class GiaovienManagementPageComponent {
  constructor(private router: Router) {}

  goBack() {
    this.router.navigate(['/']); // Điều hướng đến trang chính hoặc bất kỳ trang nào khác
  }
}
