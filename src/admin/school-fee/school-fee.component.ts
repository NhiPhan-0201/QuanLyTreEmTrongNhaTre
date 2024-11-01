import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SchoolFeeService } from '../../APIService/school-fee.service';
import { HocPhi } from '../../models/HocPhi';
import { NhomLop } from '../../models/NhomLop';

@Component({
  selector: 'app-school-fee',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './school-fee.component.html',
  styleUrls: ['./school-fee.component.css']
})
export class SchoolFeeComponent implements OnInit {
  schoolFees: HocPhi[] = [];
  filteredFees: HocPhi[] = [];
  schoolFeeForm: FormGroup;
  editingFee: HocPhi | null = null;
  showPopup: boolean = false;
  classes: NhomLop[] = [];
  years: number[] = [];
  months: number[] = [];

  selectedClass: string;
  selectedYear: number;
  selectedMonth: number;

  paginatedFees: HocPhi[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 0;

  constructor(
    private schoolFeeService: SchoolFeeService,
    private fb: FormBuilder
  ) {
    this.schoolFeeForm = this.fb.group({
      tenHocPhi: ['', Validators.required],
      mucHocPhi: [0, [Validators.required, Validators.min(0)]],
      idNhomLop: [null, Validators.required],
      nam: [new Date().getFullYear(), [Validators.required, Validators.min(2000)]],
      thang: [1, [Validators.required, Validators.min(1), Validators.max(12)]]
    });

    this.selectedClass = '';
    this.selectedYear = 0;
    this.selectedMonth = 0;
  }

  ngOnInit(): void {
    this.loadSchoolFees();
    this.loadClasses();
    this.loadYears();
    this.loadMonths();
  }

  loadSchoolFees(): void {
    this.schoolFeeService.getSchoolFees().subscribe({
      next: (data) => {
        this.schoolFees = data || [];
        this.filteredFees = this.schoolFees;
        this.applyFilters();
      },
      error: (error) => alert('Lỗi khi tải danh sách học phí:' + error.EM)
    });
  }

  loadClasses(): void {
    this.schoolFeeService.getClasses().subscribe({
      next: (data) => {
        this.classes = data || [];
      },
      error: (error) => alert('Lỗi khi tải danh sách nhóm lớp:' + error.EM)
    });
  }

  loadYears(): void {
    const currentYear = new Date().getFullYear();
    this.years = Array.from({ length: 5 }, (_, i) => currentYear - i);
  }

  loadMonths(): void {
    this.months = Array.from({ length: 12 }, (_, i) => i + 1);
  }

  applyFilters(): void {
    this.filteredFees = this.schoolFees.filter(fee => {
      return (
        (this.selectedClass === '' || fee.nhomLop.tenNhom === this.selectedClass) &&
        (this.selectedYear === 0 || fee.nam === this.selectedYear) &&
        (this.selectedMonth === 0 || fee.thang === this.selectedMonth)
      );
    });

    this.currentPage = 1;
    this.updatePaginatedFees();
  }

  updatePaginatedFees(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.paginatedFees = this.filteredFees.slice(startIndex, startIndex + this.itemsPerPage);
    this.totalPages = Math.ceil(this.filteredFees.length / this.itemsPerPage);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedFees();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedFees();
    }
  }

  openPopup(): void {
    this.resetForm();
    this.showPopup = true;
  }

  closePopup(): void {
    this.showPopup = false;
  }

  saveSchoolFee(): void {
    if (this.schoolFeeForm.invalid) return;

    const schoolFee: HocPhi = this.schoolFeeForm.value;

    if (this.editingFee) {
      this.schoolFeeService.updateSchoolFee(this.editingFee.id, schoolFee).subscribe({
        next: () => {
          this.loadSchoolFees();
          this.closePopup();
        },
        error: (error) => alert('Lỗi khi cập nhật học phí:' + error)
      });
    } else {
      this.schoolFeeService.addSchoolFee(schoolFee).subscribe({
        next: () => {
          this.loadSchoolFees();
          this.closePopup();
        },
        error: (error) => {
          alert('Lỗi khi thêm học phí:' + error.message)
        }
      });
    }
  }

  deleteSchoolFee(id: number): void {
    this.schoolFeeService.deleteSchoolFee(id).subscribe({
      next: (message) => {
        if (message) {
          alert(message);
        }
        this.loadSchoolFees()
      },
      error: (error) => {
        alert('Lỗi khi xóa học phí: ' + (error.error || error.message));
        console.error(JSON.stringify(error));
      }
    });
  }

  editSchoolFee(fee: HocPhi): void {
    this.editingFee = fee;
    this.schoolFeeForm.patchValue(fee);
    this.showPopup = true;
  }

  resetForm(): void {
    this.schoolFeeForm.reset();
    this.editingFee = null;
    this.showPopup = false;
  }
}
