import { ThongTinTre } from "./ThongTinTre";

export interface DiemDanh {
  id: number;
  idTre: number;
  thongTinTre?: ThongTinTre;
  ngayDiemDanh: Date;
  trangThai: string;
}