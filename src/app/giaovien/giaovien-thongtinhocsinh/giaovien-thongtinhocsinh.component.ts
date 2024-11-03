import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-giaovien-thongtinhocsinh',
  standalone: true,
  imports: [],
  templateUrl: './giaovien-thongtinhocsinh.component.html',
  styleUrl: './giaovien-thongtinhocsinh.component.css'
})
export class GiaovienThongtinhocsinhComponent {
  constructor(private router: Router) {}

  goBack(): void {
    this.router.navigate(['/giaovien-management']);
  }

}
