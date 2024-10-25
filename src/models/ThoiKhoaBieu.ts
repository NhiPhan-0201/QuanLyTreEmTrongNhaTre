import { QuanLiLop } from "./QuanLiLop";

export interface ThoiKhoaBieu {
  id: string;
  ngay: Date;
  idLop: number;
  quanLiLop?: QuanLiLop;
  hoatDong: string;
  thoiGianBatDau: string;
  thoiGianKetThuc: string;
}