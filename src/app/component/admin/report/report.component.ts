import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { ReportService } from '../../../../APIService/report.service';
import Chart from 'chart.js/auto';
import { Platform } from '@angular/cdk/platform';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
    imports: [CommonModule, FormsModule],
    templateUrl: './report.component.html',
    styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit, AfterViewInit {
    @ViewChild('totalStudentChart') totalStudentChartRef!: ElementRef;
    @ViewChild('studentByClassChart') classStudentChartRef!: ElementRef;
    @ViewChild('studentByGroupChart') studentByGroupChartRef!: ElementRef;
    @ViewChild('monthlyFeeChart') monthlyFeeChartRef!: ElementRef;
    @ViewChild('absenceChart') absenceChartRef!: ElementRef;
    @ViewChild('absenceByClassChart') classAbsenceChartRef!: ElementRef;

    activeTab: string = 'totalStudent';
    selectedClassId: number = 1;
    selectedYear: number = 0;
    selectedMonth: number = 0;
    years: number[] = [];
    months: number[] = [];
    classes: any[] = [];

    constructor(private reportService: ReportService, private platform: Platform) { }

    ngOnInit(): void {
        this.loadClasses();
        this.loadYears();
        this.loadMonths();
    }

    ngAfterViewInit(): void {
        if (this.platform.isBrowser) {
            this.loadCharts();
        }
    }

    loadCharts(): void {
        if (this.totalStudentChartRef) this.loadTotalStudent();
        if (this.classStudentChartRef) this.loadStudentByClass();
        if (this.studentByGroupChartRef) this.loadStudentByGroup();
        if (this.monthlyFeeChartRef) this.loadMonthlyFeeByGroup();
        if (this.absenceChartRef) this.loadAbsenceAndLate();
        if (this.classAbsenceChartRef) this.loadAbsenceByClass(this.selectedClassId);
    }

    loadYears() {
        const currentYear = new Date().getFullYear();
        this.years = Array.from({ length: 5 }, (_, i) => currentYear - i);
    }

    loadMonths() {
        this.months = Array.from({ length: 12 }, (_, i) => i + 1);
    }

    showTab(tab: string): void {
        this.activeTab = tab;
    }

    loadTotalStudent() {
        this.reportService.getTotalStudent().subscribe((data: TotalStudent) => {
            const ctx = this.totalStudentChartRef.nativeElement.getContext('2d');
            new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: ['Nam', 'Nữ'],
                    datasets: [{
                        data: [data.maleStudents, data.femaleStudents],
                        backgroundColor: ['#36A2EB', '#FF6384']
                    }]
                }
            });
        });
    }

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
                            backgroundColor: '#66BB6A'
                        },
                        {
                            label: 'Số lượng nam',
                            data: data.map((item: StudentByClass) => item.soLuongNam),
                            backgroundColor: '#42A5F5'
                        },
                        {
                            label: 'Số lượng nữ',
                            data: data.map((item: StudentByClass) => item.soLuongNu),
                            backgroundColor: '#FF6384'
                        }
                    ]
                }
            });
        });
    }

    loadStudentByGroup() {
        this.reportService.getStudentByGroup().subscribe((data: StudentByGroup[]) => {
            const ctx = this.studentByGroupChartRef.nativeElement.getContext('2d');
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: data.map((item: StudentByGroup) => item.tenNhom),
                    datasets: [
                        {
                            label: 'Số lượng học sinh theo nhóm lớp',
                            data: data.map((item: StudentByGroup) => item.tongSoLuong),
                            backgroundColor: '#66BB6A'
                        },
                        {
                            label: 'Số lượng nam',
                            data: data.map((item: StudentByGroup) => item.soLuongNam),
                            backgroundColor: '#42A5F5'
                        },
                        {
                            label: 'Số lượng nữ',
                            data: data.map((item: StudentByGroup) => item.soLuongNu),
                            backgroundColor: '#FF6384'
                        }
                    ]
                }
            });
        });
    }

    loadMonthlyFeeByGroup() {
        this.reportService.getMonthlyFeeByGroup().subscribe((data: MonthlyFeeByGroup[]) => {
            const ctx = this.monthlyFeeChartRef.nativeElement.getContext('2d');
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: data.map((item: MonthlyFeeByGroup) => `${item.tenNhom} (${item.thoiGian})`),
                    datasets: [{
                        label: 'Học phí',
                        data: data.map((item: MonthlyFeeByGroup) => item.tongThu),
                        backgroundColor: '#FFA726',
                    }]
                }
            });
        });
    }

    loadAbsenceAndLate() {
        this.reportService.getAbsenceAndLate().subscribe((data: AbsenceAndLate[]) => {
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

    loadClasses() {
        this.reportService.getClassess().subscribe((data: any[]) => {
            this.classes = data;
        });
    }

    loadAbsenceByClass(classId: number) {
        Chart.getChart("AbsenceByClass")?.destroy(); // Destroy the previous chart

        this.reportService.getAbsenceAndLateByClass(classId).subscribe((data: AbsenceAndLateByClass[]) => {
            const filteredData = this.filterAbsenceByClass(data);
            const ctx = this.classAbsenceChartRef.nativeElement.getContext('2d');
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: filteredData.map((item: AbsenceAndLateByClass) => item.ngay),
                    datasets: [
                        {
                            label: 'Số học sinh vắng',
                            data: filteredData.map((item: AbsenceAndLateByClass) => item.soLuongVang),
                            backgroundColor: '#66BB6A'
                        },
                        {
                            label: 'Số học sinh trễ',
                            data: filteredData.map((item: AbsenceAndLateByClass) => item.soLuongTre),
                            backgroundColor: '#FF7043'
                        }
                    ]
                },
                options: {
                    scales: {
                        y: {
                            min: 0,
                            ticks: {
                                stepSize: 1,
                                callback: function (value) {
                                    return Number(value).toFixed(0);
                                }
                            }
                        }
                    }
                }
            });
        });
    }

    filterAbsenceByClass(data: AbsenceAndLateByClass[]): AbsenceAndLateByClass[] {
        console.log(this.selectedYear, this.selectedMonth);
        if (this.selectedYear == 0 && this.selectedMonth == 0) {
            return data;
        }

        return data.filter(item => {
            const itemDateParts = item.ngay.split('-');
            const itemYear = parseInt(itemDateParts[0]);
            const itemMonth = parseInt(itemDateParts[1]);

            const yearMatch = (this.selectedYear === 0 || this.selectedYear === itemYear);
            const monthMatch = (this.selectedMonth === 0 || this.selectedMonth === itemMonth);

            return yearMatch && monthMatch;
        });
    }

    onClassChange(classId: number) {
        this.selectedClassId = classId;
        this.loadAbsenceByClass(classId);
    }

    onYearChange(year: number) {
        this.selectedYear = year;
        this.loadAbsenceByClass(this.selectedClassId);
    }

    onMonthChange(month: number) {
        this.selectedMonth = month;
        this.loadAbsenceByClass(this.selectedClassId);
    }

}
