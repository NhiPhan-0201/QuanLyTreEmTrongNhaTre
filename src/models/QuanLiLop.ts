import { NhomLop } from "./NhomLop";
import { ThongTinGiaoVien } from "./ThongTinGiaoVien";

export interface QuanLiLop {
  id: number;
  tenLop: string;
  idGiaoVien: number;
  thongTinGiaoVien?: ThongTinGiaoVien;
  tenPhong: string;
  viTri: string;
  idNhomLop?: number;
  nhomLop?: NhomLop;
}
