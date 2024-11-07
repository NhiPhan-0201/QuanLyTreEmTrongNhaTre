import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { ReportService } from '../../../../APIService/report.service';
import Chart from 'chart.js/auto';
import { Platform } from '@angular/cdk/platform';
import { CommonModule } from '@angular/common';
import {
    TotalStudent,
    StudentByClass,
    StudentByGroup,
    MonthlyFeeByGroup,
    AbsenceAndLate,
    AbsenceAndLateByClass
} from '../../../../models/Report';

@Component({
    selector: 'app-report',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './report.component.html',
    styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit, AfterViewInit {
    // Tham chiếu đến các thẻ canvas trong template
    @ViewChild('totalStudentChart') totalStudentChartRef!: ElementRef;
    @ViewChild('studentByClassChart') classStudentChartRef!: ElementRef;
    @ViewChild('studentByGroupChart') studentByGroupChartRef!: ElementRef;
    @ViewChild('monthlyFeeChart') monthlyFeeChartRef!: ElementRef;
    @ViewChild('absenceChart') absenceChartRef!: ElementRef;
    @ViewChild('absenceByClassChart') classAbsenceChartRef!: ElementRef;

    activeTab: string = 'totalStudent'; // Tab mặc định khi bắt đầu

    constructor(private reportService: ReportService, private platform: Platform) { }

    ngOnInit(): void { }

    ngAfterViewInit(): void {
        if (this.platform.isBrowser) {
            if (this.totalStudentChartRef) {
                this.loadTotalStudent();
            }
            if (this.classStudentChartRef) {
                this.loadStudentByClass();
            }
            if (this.studentByGroupChartRef) {
                this.loadStudentByGroup();
            }
            if (this.monthlyFeeChartRef) {
                this.loadMonthlyFeeByGroup();
            }
            if (this.absenceChartRef) {
                this.loadAbsenceAndLate();
            }
            if (this.classAbsenceChartRef) {
                this.loadAbsenceByClass(1);
            }
        }
    }

    showTab(tab: string): void {
        this.activeTab = tab;
    }

    // 1. Tổng số học sinh toàn trường
    loadTotalStudent() {
        this.reportService.getTotalStudent().subscribe((data: TotalStudent) => {
            const ctx = this.totalStudentChartRef.nativeElement.getContext('2d');
            new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: ['Nam', 'Nữ'],
                    datasets: [
                        {
                            data: [data.maleStudents, data.femaleStudents],
                            backgroundColor: ['#36A2EB', '#FF6384']
                        }
                    ]
                }
            });
        });
    }

    // 2. Số lượng học sinh theo lớp
    loadStudentByClass() {
        this.reportService.getStudentByClass().subscribe((data: StudentByClass[]) => {
            const ctx = this.classStudentChartRef.nativeElement.getContext('2d');
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: data.map((item: StudentByClass) => item.tenLop),
                    datasets: [
                        {
                            label: 'Số lượng học sinh theo lớp',
                            data: data.map((item: StudentByClass) => item.soLuong),
                            backgroundColor: '#42A5F5'
                        },
                        {
                            label: 'Số lượng nam',
                            data: data.map((item: StudentByClass) => item.soLuongNam),
                            backgroundColor: '#66BB6A'
                        },
                        {
                            label: 'Số lượng nữ',
                            data: data.map((item: StudentByClass) => item.soLuongNu),
                            backgroundColor: '#FF7043'
                        }
                    ]
                }
            });
        });
    }

    // 3. Số lượng học sinh theo nhóm
    loadStudentByGroup() {
        this.reportService.getStudentByGroup().subscribe((data: StudentByGroup[]) => {
            const ctx = this.studentByGroupChartRef.nativeElement.getContext('2d');
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: data.map((item: StudentByGroup) => item.tenNhom),
                    datasets: [
                        {
                            label: 'Số lượng học sinh theo nhóm',
                            data: data.map((item: StudentByGroup) => item.tongSoLuong),
                            backgroundColor: '#42A5F5'
                        },
                        {
                            label: 'Số lượng nam',
                            data: data.map((item: StudentByGroup) => item.soLuongNam),
                            backgroundColor: '#66BB6A'
                        },
                        {
                            label: 'Số lượng nữ',
                            data: data.map((item: StudentByGroup) => item.soLuongNu),
                            backgroundColor: '#FF7043'
                        }
                    ]
                }
            });
        });
    }

    // 4. Thống kê học phí theo nhóm lớp và tháng
    loadMonthlyFeeByGroup() {
        this.reportService.getMonthlyFeeByGroup().subscribe((data: MonthlyFeeByGroup[]) => {
            const ctx = this.monthlyFeeChartRef.nativeElement.getContext('2d');
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: data.map((item: MonthlyFeeByGroup) => `${item.tenNhom} (${item.thoiGian})`),
                    datasets: [
                        {
                            label: 'Học phí',
                            data: data.map((item: MonthlyFeeByGroup) => item.tongThu),
                            backgroundColor: '#FFA726',
                        }
                    ]
                }
            });
        });
    }

    // 5. Thống kê vắng trễ toàn trường
    loadAbsenceAndLate() {
        this.reportService.getAbsenceAndLate().subscribe((data: AbsenceAndLate[]) => {
            console.log(data);
            const ctx = this.absenceChartRef.nativeElement.getContext('2d');
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: data.map((item: AbsenceAndLate) => item.date),
                    datasets: [
                        {
                            label: 'Vắng',
                            data: data.map((item: AbsenceAndLate) => item.totalAbsences),
                            backgroundColor: '#EF5350'
                        },
                        {
                            label: 'Trễ',
                            data: data.map((item: AbsenceAndLate) => item.totalLate),
                            backgroundColor: '#AB47BC'
                        }
                    ]
                }
            });
        });
    }

    // 6. Thống kê vắng trễ theo lớp và ngày
    loadAbsenceByClass(classId: number) {
        this.reportService.getAbsenceAndLateByClass(classId).subscribe((data: AbsenceAndLateByClass[]) => {
            const ctx = this.classAbsenceChartRef.nativeElement.getContext('2d');
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: data.map((item: AbsenceAndLateByClass) => item.ngay),
                    datasets: [
                        {
                            label: 'Số học sinh vắng',
                            data: data.map((item: AbsenceAndLateByClass) => item.soLuongVang),
                            backgroundColor: '#66BB6A'
                        },
                        {
                            label: 'Số học sinh trễ',
                            data: data.map((item: AbsenceAndLateByClass) => item.soLuongTre),
                            backgroundColor: '#FF7043'
                        }
                    ]
                }
            });
        });
    }
}
