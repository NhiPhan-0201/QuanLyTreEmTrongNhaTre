import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HocPhiService } from '../../../../../APIService/ViewSchoolFee.service'
import { HocPhi } from '../../../../../models/HocPhi';

@Component({
  selector: 'app-view-schoolfee',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './view-schoolfee.component.html',
  styleUrls: ['./view-schoolfee.component.css']
})
export class ViewSchoolfeeComponent implements OnInit {
  hocPhiList: HocPhi[] = [];
  selectedMonth = 9;
  selectedYear = 2024;

  constructor(private router: Router, private hocPhiService: HocPhiService) {}

  ngOnInit() {
    this.loadHocPhi();
  }

  loadHocPhi() {
    this.hocPhiService.getHocPhiByMonth(this.selectedYear, this.selectedMonth).subscribe((data) => {
      this.hocPhiList = data;
    });
  }

  navigateTo(path: string) {
    this.router.navigate([`/${path}`]);
  }
}
