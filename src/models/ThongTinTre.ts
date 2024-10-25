import { ThongTinPhuHuynh } from "./ThongTinPhuHuynh";

export interface ThongTinTre {
  id: number;
  hoTen: string;
  gioiTinh: string;
  ngaySinh: string;
  anh: string;

  thongTinPhuHuynh?: ThongTinPhuHuynh;
}