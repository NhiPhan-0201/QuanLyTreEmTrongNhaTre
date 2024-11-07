export interface ThongTinHocSinh {
    id: number;
    hoTen: string;
    ngaySinh: string | Date;
    gioiTinh: string;
    classId: number;
    tenLop: string;
    anh: string;
    hoTenCha: string;
    hoTenMe: string;
    sdtCha: string;
    sdtMe: string;
    diaChi: string;
    emailCha?: string;
    emailMe?: string;
  }