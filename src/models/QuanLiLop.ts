import { NhomLop, ThongTinGiaoVien } from ".";

export interface QuanLiLop {
  id: number;
  tenLop: string;
  tenPhong: string;
  viTri: string;

  idGiaoVien: number;
  thongTinGiaoVien?: ThongTinGiaoVien;

  idNhomLop?: number;
  nhomLop?: NhomLop;
}
