import { Account } from "./Account";
import { TheLoaiYKien } from "./TheLoaiYKien";

export interface YKienPhuHuynh {
  id: number;
  idAccount: number;
  account?: Account;

  idTheLoai: number;
  theLoai?: TheLoaiYKien;

  noiDung: string;
  tieuDe: string;
  hinhAnh: string;
}