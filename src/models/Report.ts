export interface TotalStudent {
    totalStudents: number;
    maleStudents: number;
    femaleStudents: number;
}

export interface StudentByClass {
    tenLop: string;
    classId: number;
    soLuong: number;
    soLuongNam: number;
    soLuongNu: number;
}

export interface StudentByGroup {
    tenNhom: string;
    classId: number;
    tongSoLuong: number;
    soLuongNam: number;
    soLuongNu: number;
}

export interface MonthlyFeeByGroup {
    tenNhom: string;
    thoiGian: string;
    tongThu: number;
}

export interface AbsenceAndLate {
    date: string;
    totalAbsences: number;
    totalLate: number;
}

export interface AbsenceAndLateByClass {
    tenLop: string;
    ngay: string;
    soLuongVang: number;
    soLuongTre: number;
}
