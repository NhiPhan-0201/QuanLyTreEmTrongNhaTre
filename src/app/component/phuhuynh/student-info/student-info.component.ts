import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThongTinTre } from './../../../../models/ThongTinTre';
import { ThongTinPhuHuynh } from './../../../../models/ThongTinPhuHuynh';
import { StudentInfoService } from './../../../../APIService/student-info.service';

@Component({
  selector: 'app-student-info',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './student-info.component.html',
  styleUrls: ['./student-info.component.css']
})
export class StudentInfoComponent implements OnInit {
  searchTerm: string = '';
  selectedStudent: ThongTinTre | null = null;
  parentInfo: ThongTinPhuHuynh | null = null;
  errorMessage: string = '';

  constructor(private studentInfoService: StudentInfoService) {}

  ngOnInit(): void {}

  // Lấy thông tin trẻ và phụ huynh theo ID
  getStudentById(): void {
    const id = Number(this.searchTerm.trim());
    if (isNaN(id)) {
      this.errorMessage = 'ID không hợp lệ. Vui lòng nhập lại.';
      this.selectedStudent = null;
      this.parentInfo = null;
      return;
    }

    this.errorMessage = ''; // Reset error message
    this.studentInfoService.getStudentAndParentById(id).subscribe({
      next: (response) => {
        if (response && response.data) {
          this.selectedStudent = response.data.childInfo;
          this.parentInfo = response.data.parentInfo;
        } else {
          this.selectedStudent = null;
          this.parentInfo = null;
          console.error('Dữ liệu không hợp lệ');
        }
      },
      error: (error) => {
        console.error('Lỗi:', error);
        this.selectedStudent = null;
        this.parentInfo = null;
        this.errorMessage = 'Lỗi khi lấy dữ liệu. Vui lòng thử lại sau.';
      }
    });
  }

  // Kiểm tra URL ảnh hợp lệ
  isValidImageUrl(url: string | boolean): boolean {
    if (typeof url === 'string') {
      return url.startsWith('http') || url.endsWith('.jpg') || url.endsWith('.png');
    }
    return false;
  }
}
