import { QuanLiLop } from ".";

export interface ThongBaoLop {
  id: number;
  idLop: number;
  quanLiLop?: QuanLiLop;
  tieuDe: string;
  noiDung: string;
}
