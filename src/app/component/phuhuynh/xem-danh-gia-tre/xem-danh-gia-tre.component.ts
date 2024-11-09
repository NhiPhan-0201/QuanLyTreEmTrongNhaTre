import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-xem-danh-gia-tre',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './xem-danh-gia-tre.component.html',
  styleUrl: './xem-danh-gia-tre.component.css',
})
export class XemDanhGiaTreComponent implements OnInit {
  studentName: string = 'Tên Bé';
  teacherReviews: any[] = [];
  treId: number = 1;
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchReviews();
  }

  fetchReviews(): void {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    const phuhuynhID = localStorage.getItem('idAccount');

    this.http
      .get<any[]>(
        `http://localhost:8080/api/v1/danh-gia-tre-em/tre/${this.treId}`,
        { headers }
      )
      .subscribe(
        (data) => {
          this.teacherReviews = data;
        },
        (error) => {
          console.error('Error fetching reviews:', error);
        }
      );
    this.teacherReviews = [
      {
        id: 1,
        id_tre: 1,
        id_giao_vien: 1,
        danh_gia:
          'Bé Lan có sự phát triển tốt về thể chất và tinh thần. Tích cực tham gia các hoạt động nhóm và thể hiện khả năng giao tiếp tốt.',
        diem_so: 8.5,
      },
      {
        id: 2,
        id_tre: 2,
        id_giao_vien: 2,
        danh_gia:
          'Mai đang tiến bộ trong việc hòa nhập với bạn bè. Cần thêm sự hỗ trợ để phát triển kỹ năng xã hội.',
        diem_so: 7.0,
      },
      {
        id: 3,
        id_tre: 3,
        id_giao_vien: 3,
        danh_gia:
          'Minh thể hiện sự tự tin và khả năng giúp đỡ bạn bè. Cần tập trung vào việc cải thiện kỹ năng vận động tinh.',
        diem_so: 8.0,
      },
      {
        id: 4,
        id_tre: 4,
        id_giao_vien: 4,
        danh_gia:
          'Hương rất hoạt bát và thân thiện. Có khả năng nhận biết tốt các hình khối và màu sắc. Nên khuyến khích bé kể chuyện nhiều hơn.',
        diem_so: 8.75,
      },
      {
        id: 5,
        id_tre: 5,
        id_giao_vien: 5,
        danh_gia:
          'An có tiến bộ trong việc chơi với bạn bè. Đôi khi còn bướng bỉnh, cần hướng dẫn thêm về kiểm soát cảm xúc.',
        diem_so: 7.5,
      },
      {
        id: 6,
        id_tre: 6,
        id_giao_vien: 6,
        danh_gia:
          'Lan thích ca hát và có trí nhớ tốt. Cần khuyến khích tham gia nhiều hoạt động ngoài trời để cải thiện vận động thô.',
        diem_so: 7.75,
      },
      {
        id: 7,
        id_tre: 7,
        id_giao_vien: 7,
        danh_gia:
          'Nam thể hiện khả năng lãnh đạo trong nhóm nhỏ. Phát âm rõ ràng và thích học chữ cái.',
        diem_so: 9.0,
      },
      {
        id: 8,
        id_tre: 8,
        id_giao_vien: 8,
        danh_gia:
          'Dũng chơi tốt trong nhóm nhỏ nhưng đôi khi tỏ ra lo lắng. Cần hỗ trợ xây dựng sự tự tin và cải thiện kỹ năng giao tiếp.',
        diem_so: 7.25,
      },
      {
        id: 9,
        id_tre: 9,
        id_giao_vien: 9,
        danh_gia:
          'Hoa rất hiếu kỳ về thiên nhiên và thích đặt câu hỏi. Có kỹ năng vận động tinh tốt và dễ dàng kết bạn.',
        diem_so: 8.5,
      },
      {
        id: 10,
        id_tre: 10,
        id_giao_vien: 10,
        danh_gia:
          'Khoa có khả năng tập trung tốt nhưng thích chơi một mình. Cần hỗ trợ phát triển kỹ năng xã hội và biểu đạt cảm xúc.',
        diem_so: 7.5,
      },
    ];
  }
}
