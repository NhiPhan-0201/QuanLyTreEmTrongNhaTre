
export interface DiemDanh {
  id: number;                        // ID của học sinh từ API
  hoTen: string;                     // Tên của học sinh từ API
  ngaySinh: string;                  // Ngày sinh (định dạng yyyy-mm-dd)
  gioiTinh: string;                  // Giới tính của học sinh
  classId: number;                   // ID lớp từ API
  tenLop: string | null;             // Tên lớp từ API, có thể là null
  ngayDiemDanh: string;              // Ngày điểm danh
  trangThai: 'CoMat' | 'VangCoPhep' | 'VangKhongPhep' | 'DiTre'; // Trạng thái điểm danh
}
