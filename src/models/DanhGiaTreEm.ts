import { ThongTinGiaoVien } from './ThongTinGiaoVien';
import { ThongTinTre } from './ThongTinTre';

export interface DanhGiaTreEm {
  id: number;

  idTre: number;
  ThongTinTreEm?: ThongTinTre;

  idGiaoVien: number;
  ThongTinGiaoVien?: ThongTinGiaoVien;

  danhGia?: string;

  diemSo: number;
}