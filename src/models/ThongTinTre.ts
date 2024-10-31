import { Account } from "./Account";
import { QuanLiLop } from "./QuanLiLop";
import { ThongTinPhuHuynh } from "./ThongTinPhuHuynh";

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