import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pay',
  standalone: true,
  imports: [],
  templateUrl: './pay.component.html',
  styleUrl: './pay.component.css'
})
export class PayComponent {
  constructor(private router: Router) {}

  navigateTo(path: string) {
    this.router.navigate([`/${path}`]);
  }
}
