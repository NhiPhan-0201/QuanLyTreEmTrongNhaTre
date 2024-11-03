import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThongTinTre } from '../../../../models/ThongTinTre';
import { StudentInfoService } from '../../../../APIService/student-info.service';

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

  constructor(private studentInfoService: StudentInfoService) {} 

  ngOnInit(): void {}

  // Lấy thông tin học sinh theo id
  getStudentById(): void {
    const id = Number(this.searchTerm.trim());
    if (isNaN(id)) {
      console.error('ID không hợp lệ');
      return;
    }
    
    this.studentInfoService.getStudentById(id).subscribe({
      next: (response) => {
        this.selectedStudent = response.data;
      },
      error: (error) => {
        console.error('Lỗi :', error);
      }
    });
  }
}
