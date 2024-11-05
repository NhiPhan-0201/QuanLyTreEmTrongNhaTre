import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastComponent } from './component/common';
import { ToastService } from './service';
import { ToastModule } from '@syncfusion/ej2-angular-notifications';

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

  constructor(private toastService: ToastService) { }

  ngAfterViewInit() {
    this.toastService.setToastComponent(this.toastComponent);
  }
}
