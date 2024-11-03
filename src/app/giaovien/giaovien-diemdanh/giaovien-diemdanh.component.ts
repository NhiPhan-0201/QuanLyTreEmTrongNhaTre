import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DiemDanhService } from '../../../APIService/diemdanh.service';
import { DiemDanh } from '../../../models/DiemDanh';
// interface DiemDanh {
//   id: number;
//   hoTen: string;
//   ngaySinh: string;
//   gioiTinh: string;
//   classId: number;
//   tenLop: string | null;
//   ngayDiemDanh: string;
//   trangThai: 'CoMat' | 'VangCoPhep' | 'VangKhongPhep' | 'DiTre';
// }

interface LopHoc {
  classId: number;
  tenLop: string | null;
}

@Component({
  selector: 'app-giaovien-diemdanh',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './giaovien-diemdanh.component.html',
  styleUrls: ['./giaovien-diemdanh.component.css']
})
export class GiaovienDiemdanhComponent implements OnInit {
  hocSinhList: DiemDanh[] = [];
  classList: LopHoc[] = [];
  selectedClassId: number = 1;
  selectedClassName: string = '';
  today: string;

  constructor(private diemDanhService: DiemDanhService) {
    const now = new Date();
    this.today = now.toISOString().split('T')[0];
  }

  ngOnInit(): void {
    this.loadDiemDanh();
  }

  loadDiemDanh(): void {
    this.diemDanhService.getAllDiemDanh().subscribe((data) => {
      this.hocSinhList = data.map(hs => ({
        id: hs.id,
        hoTen: hs.hoTen,
        ngaySinh: `${hs.ngaySinh[0]}-${String(hs.ngaySinh[1]).padStart(2, '0')}-${String(hs.ngaySinh[2]).padStart(2, '0')}`,
        gioiTinh: hs.gioiTinh === 'Nam' ? 'Nam' : 'Nu',
        classId: hs.classId,
        tenLop: hs.tenLop ? hs.tenLop : `Lớp ${hs.classId}`,
        ngayDiemDanh: this.today,
        trangThai: hs.trangThai
      })).filter(hs => hs.classId === this.selectedClassId);
      
      this.populateClassList(data);
      this.updateClassName();
    });
  }

  populateClassList(data: DiemDanh[]): void {
    const uniqueClasses: { [key: number]: LopHoc } = {};
    data.forEach(hs => {
      uniqueClasses[hs.classId] = {
        classId: hs.classId,
        tenLop: hs.tenLop ?? `Lớp ${hs.classId}`
      };
    });
    this.classList = Object.values(uniqueClasses);
  }

  onClassChange(event: Event): void {
    this.selectedClassId = +(event.target as HTMLSelectElement).value;
    this.loadDiemDanh();
  }

  updateClassName(): void {
    const classInfo = this.classList.find(cls => cls.classId === this.selectedClassId);
    this.selectedClassName = classInfo ? (classInfo.tenLop || `Lớp ${classInfo.classId}`) : `Lớp ${this.selectedClassId}`;
  }

  updateTrangThai(hs: DiemDanh, trangThai: 'CoMat' | 'VangCoPhep' | 'VangKhongPhep' | 'DiTre'): void {
    hs.trangThai = trangThai;
    hs.ngayDiemDanh = this.today;

    this.diemDanhService.updateDiemDanh(hs).subscribe((data) => {
      console.log(`Cập nhật trạng thái điểm danh cho học sinh ID: ${hs.id} vào ngày ${this.today} thành công!`);
    });
  }
}