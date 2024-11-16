import { AfterViewInit, Component, Inject, PLATFORM_ID, ViewChild } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { ToastComponent } from './component/common';
import { ToastService } from './service';
import { ToastModule } from '@syncfusion/ej2-angular-notifications';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ToastComponent,
    ToastModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements AfterViewInit {
  @ViewChild(ToastComponent) toastComponent!: ToastComponent;

  constructor(
    private toastService: ToastService,
    private router: Router,
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: object // Để kiểm tra môi trường
  ) { }

  ngAfterViewInit() {
    this.toastService.setToastComponent(this.toastComponent);

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.redirectUser();
      }
    });
  }

  async redirectUser(): Promise<void> {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    try {
      const accessToken = localStorage.getItem('access_token');
      const accountId = parseInt(localStorage.getItem('accountID') ?? '0', 10);

      if (!accessToken || !accountId) {
        console.log(accessToken, accountId);
        this.router.navigate(['/login']);
        return;
      }

      const headers = new HttpHeaders({
        'Account-ID': accountId.toString(),
        'Authorization': `Bearer ${accessToken}`
      });

      // Thêm code để đảm bảo user chỉ có thể vào router được phép
    } catch (error) {
      console.error('Error during redirection:', error);
      this.toastService.showError('Failed to redirect user. Please log in again.');
      this.router.navigate(['/login']);
    }
  }
}
