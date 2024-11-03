import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-view-schoolfee',
  standalone: true,
  imports: [],
  templateUrl: './view-schoolfee.component.html',
  styleUrl: './view-schoolfee.component.css'
})
export class ViewSchoolfeeComponent {
  constructor(private router: Router) {}

  navigateTo(path: string) {
    this.router.navigate([`/${path}`]);
  }
}
