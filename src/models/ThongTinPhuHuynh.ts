import { ThongTinTre } from ".";

export interface ThongTinPhuHuynh {
  id: number;
  hoTenCha?: string;
  hoTenMe?: string;
  sdtCha?: string;
  sdtMe?: string;
  diaChi: string;
  emailCha?: string;
  emailMe?: string;

  danhSachTre?: ThongTinTre[];
}
