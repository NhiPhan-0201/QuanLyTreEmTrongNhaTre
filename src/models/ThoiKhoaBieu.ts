import { QuanLiLop } from ".";

export interface ThoiKhoaBieu {
  id: number;
  ngay: Date;
  idLop: number;
  quanLiLop?: QuanLiLop;
  hoatDong: string;
  thoiGianBatDau: string;
  thoiGianKetThuc: string;
}
