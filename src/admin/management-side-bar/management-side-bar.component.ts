import { Component } from '@angular/core';

@Component({
  selector: 'app-management-side-bar',
  standalone: true,
  imports: [],
  templateUrl: './management-side-bar.component.html',
  styleUrl: './management-side-bar.component.css'
})
export class ManagementSideBarComponent {

  handleClick() {
    console.log('click');
  }
}
