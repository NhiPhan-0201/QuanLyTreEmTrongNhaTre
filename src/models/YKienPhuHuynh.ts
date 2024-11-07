import { Account, TheLoaiYKien } from ".";

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

export interface YKienPhuHuynhAdmin {
  id: number;

  account: Account;
  theLoai: TheLoaiYKien;

  noiDung: string;
  tieuDe: string;
  hinhAnh: string;
}
