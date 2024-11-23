import { QuanLiLop } from ".";

export interface ThoiKhoaBieu {
  id: number;
  ngay: Date;
  idLop: QuanLiLop;
  quanLiLop?: QuanLiLop;
  hoatDong: string;
  thoiGianBatDau: string;
  thoiGianKetThuc: string;
}
