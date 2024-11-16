import { ThongTinTre } from ".";

export interface XinNghi {
  id: number;
  idTre: number;
  thongTinTre?: ThongTinTre;
  ngayThangNam: Date;
  lyDo: string;
}
