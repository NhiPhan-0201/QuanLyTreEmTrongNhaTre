import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-giaovien-management-page',
  standalone: true,
  imports: [RouterModule],  // Import RouterModule để hỗ trợ router-outlet và routerLink
  templateUrl: './giaovien-management-page.component.html',
  styleUrls: ['./giaovien-management-page.component.css']  // Sửa thành styleUrls
})
export class GiaovienManagementPageComponent {
  constructor(private router: Router) {}

  goBack() {
    this.router.navigate(['/']); // Điều hướng đến trang chính hoặc bất kỳ trang nào khác
  }
}
