import { ThongTinTre } from "./ThongTinTre";

export interface XinNghi {
  id: number;
  idTre: number;
  thongTinTre?: ThongTinTre;
  ngayThangNam: Date;
  lyDo: string;
}