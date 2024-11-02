import { ThongTinGiaoVien } from "./ThongTinGiaoVien";
import { ThongTinPhuHuynh } from "./ThongTinPhuHuynh";

export interface Account {
    id: number;
    username: string;
    password?: string;
    role: string;
    status: string;

    phuHuynh?: ThongTinPhuHuynh;
    phuHuynhId?: number;

    giaoVien?: ThongTinGiaoVien;
    giaoVienId?: number;
}