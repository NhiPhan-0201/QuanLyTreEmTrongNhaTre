import { ThongTinGiaoVien, ThongTinTre } from '.';

export interface DanhGiaTreEm {
  id: number;

  id_tre: number;
  ThongTinTreEm?: ThongTinTre;

  id_giao_vien: number;
  ThongTinGiaoVien?: ThongTinGiaoVien;

  danh_gia?: string;

  diem_so: number;
}
