import { NhomLop, ThongTinGiaoVien } from ".";

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
