import { ThongTinGiaoVien, ThongTinTre } from '.';

export interface DanhGiaTreEm {
  id: number;

  id_tre: number;
  ten_tre: string;
  ThongTinTreEm?: ThongTinTre;

  id_giao_vien: number;
  ten_giao_vien: string;
  ThongTinGiaoVien?: ThongTinGiaoVien;

  danh_gia?: string;

  diem_so: number;
}
