import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../../APIService/home.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  accountId: number | undefined;

  constructor(private accountService: HomeService, private router: Router) { }

  ngOnInit(): void {
    this.accountService.getAccountId().subscribe(
      data => this.accountId = data,
      error => console.error(error)
    );
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  navigateToAdventure() {
    this.router.navigate(['/adventure']);
  }
}
