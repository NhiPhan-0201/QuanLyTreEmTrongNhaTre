import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-giaovien-management-page',
  standalone: true,
  imports: [RouterModule],  
  templateUrl: './giaovien-management-page.component.html',
  styleUrls: ['./giaovien-management-page.component.css']  
})
export class GiaovienManagementPageComponent {
  constructor(private router: Router) {}

  goBack() {
    this.router.navigate(['/']); // Điều hướng đến trang chính hoặc bất kỳ trang nào khác
  }
}
