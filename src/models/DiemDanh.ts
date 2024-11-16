
export interface DiemDanh {
  id: number;
  idOfIdTre?: number; 
  hoTen?: string;
  ngaySinh?: string | Date;
  gioiTinh?: string;
  classId?: number;
  tenLop?: string;
  ngayDiemDanh: string;
  trangThai: 'CoMat' | 'VangCoPhep' | 'VangKhongPhep' | 'DiTre';
  anh?: string;
}
