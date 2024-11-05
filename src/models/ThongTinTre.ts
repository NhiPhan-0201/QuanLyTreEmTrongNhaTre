import { Account, QuanLiLop, ThongTinPhuHuynh } from ".";

export interface ThongTinTre {
  id: number;
  hoTen: string;
  gioiTinh: string;
  ngaySinh: string;
  anh: string;

  classId: number;
  quanLiLop?: QuanLiLop;

  thongTinPhuHuynh?: Account | ThongTinPhuHuynh;
}
