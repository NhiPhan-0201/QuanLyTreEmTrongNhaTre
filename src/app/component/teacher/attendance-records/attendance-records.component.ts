import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DiemDanhService } from '../../../../APIService/diemdanh.service';
import { DiemDanh } from '../../../../models/DiemDanh';
import { map, switchMap } from 'rxjs/operators';
import { of, forkJoin, Observable } from 'rxjs';

import { ThongTinHocSinh } from '../../../../models/ThongTinHocSinh';
import { Router } from '@angular/router';

interface LopHoc {
  classId: number;
  tenLop: string;
}

@Component({
  selector: 'app-attendance-records',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './attendance-records.component.html',
  styleUrls: ['./attendance-records.component.css']
})
export class GiaovienDiemdanhComponent implements OnInit {
  hocSinhList: DiemDanh[] = [];
  classList: LopHoc[] = [];
  selectedClassId: number = 1;
  today: string;

  constructor(private diemDanhService: DiemDanhService, private cdr: ChangeDetectorRef, private router: Router) {
    const now = new Date();
    this.today = now.toISOString().split('T')[0];
  }

  ngOnInit(): void {
    this.loadTeacherClasses();
  }
  
  // Lấy danh sách các lớp giáo viên phụ trách
  loadTeacherClasses(): void {
    this.diemDanhService.getTeacherClasses().subscribe((classes) => {
      this.classList = classes.map(cls => ({
        classId: cls.id, // Dùng `id` từ API làm `classId`
        tenLop: cls.tenLop,
        tenPhong: cls.tenPhong,
        viTri: cls.viTri
      }));

      if (this.classList.length > 0) {
        this.selectedClassId = this.classList[0].classId; // Mặc định chọn lớp đầu tiên
        this.onClassChange(); // Gọi sau khi có danh sách lớp
      } else {
        console.warn('Không có lớp nào được giáo viên phụ trách.');
      }
    });
  }

  loadClassList(): void {
    this.diemDanhService.getAllStudents().subscribe((students) => {
      const uniqueClasses: { [key: number]: LopHoc } = {};
  
      students.forEach(student => {
        if (student.classId !== undefined) {
          const className = student.tenLop || `Lớp ${student.classId}`;
          uniqueClasses[student.classId] = { classId: student.classId, tenLop: className };
        }
      });
  
      this.classList = Object.values(uniqueClasses);
      this.onClassChange(); // Gọi sau khi `classList` đã có dữ liệu
    });
  }

  // onClassChange(): void {
  //   console.log("Selected class ID:", this.selectedClassId);

  //   this.diemDanhService.getAllStudents().subscribe(students => {
  //     const selectedClassIdNumber = Number(this.selectedClassId);

  //     this.hocSinhList = students.filter(student => student.classId === selectedClassIdNumber);
  //     console.log("Filtered hocSinhList:", this.hocSinhList);

  //     if (this.hocSinhList.length > 0) {
  //       this.checkAndCreateDiemDanhForAll().subscribe(() => {
  //         // Gọi hàm getDiemDanhList sau khi hoàn thành tạo điểm danh
  //         this.getDiemDanhList().subscribe(() => {
  //           console.log('Danh sách trạng thái điểm danh đã được cập nhật sau khi tạo.');
  //         });
  //       });
  //     } else {
  //       console.log('No students found for the selected class ID.');
  //     }
  //   });
  // }

  onClassChange(): void {
    // console.log("Selected class ID:", this.selectedClassId); // Id class được chọn
  
    this.diemDanhService.getAllStudents().subscribe(students => {
      const selectedClassIdNumber = Number(this.selectedClassId);
  
      this.hocSinhList = students.filter(student => student.classId === selectedClassIdNumber);
      // console.log("Filtered hocSinhList:", this.hocSinhList);
  
      if (this.hocSinhList.length > 0) {
        this.checkAndCreateDiemDanhForAll().subscribe(() => {
          this.getDiemDanhList().subscribe(() => {
            console.log('Danh sách trạng thái điểm danh đã được cập nhật sau khi tạo.');
          });
        });
      } else {
        console.log('Không tìm thấy học sinh cho lớp đã chọn.');
      }
    });
  }

  checkAndCreateDiemDanhForAll(): Observable<void> {
    const firstStudent = this.hocSinhList[0];

    return this.diemDanhService.checkDiemDanhExists(firstStudent.id, this.today).pipe(
      switchMap(exists => {
        if (!exists) {
          const diemDanhObservables = this.hocSinhList.map(hs => {
            const diemDanh: DiemDanh = {
              id: 0,
              idOfIdTre: hs.id,
              ngayDiemDanh: this.today,
              trangThai: 'CoMat'
            };
            return this.diemDanhService.addDiemDanh(diemDanh);
          });
          return forkJoin(diemDanhObservables).pipe(map(() => {})); // Trả về Observable<void> sau khi thêm điểm danh
        } else {
          return of(undefined); // Trả về Observable<void> nếu điểm danh đã tồn tại
        }
      }),
      map(() => {}) // Chuyển đổi kết quả thành Observable<void>
    );
  }

  getDiemDanhList(): Observable<void> {
    const observables = this.hocSinhList.map(hs =>
      this.diemDanhService.getDiemDanhByStudentAndDate(hs.id, this.today)
    );

    return forkJoin(observables).pipe(
      map((data: (DiemDanh | null)[]) => {
        // console.log("Raw data from API:", data); // Kiểm tra dữ liệu thô từ API

        // Cập nhật `trangThai` của từng học sinh trong `hocSinhList` dựa trên `data`
        this.hocSinhList.forEach(student => {
          const matchedData = data.find(diemDanhData => diemDanhData?.idOfIdTre === student.id);

          if (matchedData) {
            student.trangThai = matchedData.trangThai;
          } else {
            student.trangThai = 'CoMat'; // Thiết lập mặc định nếu không tìm thấy
          }
        });

        // console.log("Updated hocSinhList:", this.hocSinhList); // Kiểm tra kết quả cuối cùng

        // Gọi detectChanges() để cập nhật giao diện
        this.cdr.detectChanges();
      })
    );
  }
  

  updateTrangThai(hs: DiemDanh, trangThai: 'CoMat' | 'VangCoPhep' | 'VangKhongPhep' | 'DiTre'): void {
    hs.trangThai = trangThai;
    const updateBody = {
      idOfIdTre: hs.id,
      ngayDiemDanh: this.today,
      trangThai: trangThai
    };

    this.diemDanhService.updateDiemDanh(updateBody).subscribe({
      next: () => {
        console.log(`Cập nhật trạng thái điểm danh cho học sinh ID: ${hs.id} thành công!`);
        this.getDiemDanhList().subscribe(() => {
          console.log('Danh sách trạng thái điểm danh đã được tải lại sau khi cập nhật.');
        });
      },
      error: (error) => {
        console.error('Lỗi khi cập nhật trạng thái điểm danh:', error);
        alert('Cập nhật trạng thái điểm danh không thành công. Vui lòng thử lại.');
      }
    });
  }

  onStudentClick(hocSinh: DiemDanh): void {
    this.diemDanhService.getParentInfo(hocSinh.id).subscribe(parentInfo => {
      const studentDetail: ThongTinHocSinh = {
        id: hocSinh.id,
            hoTen: hocSinh.hoTen || '',
            ngaySinh: hocSinh.ngaySinh || '',
            gioiTinh: hocSinh.gioiTinh || '',
            classId: hocSinh.classId || 0,
            tenLop: hocSinh.tenLop || '',
            anh: hocSinh.anh || '',
            hoTenCha: parentInfo.hoTenCha || '',
            hoTenMe: parentInfo.hoTenMe || '',
            sdtCha: parentInfo.sdtCha || '',
            sdtMe: parentInfo.sdtMe || '',
            diaChi: parentInfo.diaChi || '',
            emailCha: parentInfo.emailCha || '',
            emailMe: parentInfo.emailMe || ''
      };
      localStorage.setItem('studentDetail', JSON.stringify(studentDetail));
      this.router.navigate(['/giaovien-management/teacher/student-info']);
    });
  }
}