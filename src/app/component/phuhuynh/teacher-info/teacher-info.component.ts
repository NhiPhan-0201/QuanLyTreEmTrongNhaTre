import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TeacherInfoService } from '../../../../APIService/teacherinfo.service';
import { ThongTinGiaoVien } from '../../../../models';

@Component({
  selector: 'app-teacher-info',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './teacher-info.component.html',
  styleUrls: ['./teacher-info.component.css']
})
export class TeacherInfoComponent implements OnInit {
  giaoVienId: number | undefined;
  thongTinGiaoVien: ThongTinGiaoVien | undefined;
  searchInput: string | undefined;

  constructor(
    private route: ActivatedRoute,
    private teacherInfoService: TeacherInfoService
  ) {
    this.giaoVienId = Number(this.route.snapshot.paramMap.get('giaoVienId'));
  }

  ngOnInit(): void {
    if (this.giaoVienId) {
      this.getThongTinGiaoVien();
    }
  }

  getThongTinGiaoVien(): void {
    if (this.giaoVienId) {
      this.teacherInfoService.getTeacherInfo(this.giaoVienId).subscribe(
        (data: ThongTinGiaoVien) => {
          this.thongTinGiaoVien = data;
        },
        error => {
          console.error('Error fetching teacher info', error);
          this.thongTinGiaoVien = undefined; // Không tìm thấy dữ liệu
        }
      );
    }
  }

  searchTeacher(): void {
    if (this.searchInput) {
      const id = parseInt(this.searchInput, 10);
      if (!isNaN(id)) {
        // tìm kiếm bằng iD
        this.teacherInfoService.getTeacherInfo(id).subscribe(
          (data: ThongTinGiaoVien) => {
            this.thongTinGiaoVien = data;
          },
          error => {
            console.error('Error fetching teacher info by ID', error);
            this.thongTinGiaoVien = undefined; // Không tìm thấy dữ liệu
          }
        );
      } else {
        // Nếu không phải là số nhập lại
        console.warn('Vui lòng nhập một ID hợp lệ.');
      }
    } else {
      // Nếu không nhập gì, xóa dữ liệu
      this.thongTinGiaoVien = undefined;
    }
  }
}
