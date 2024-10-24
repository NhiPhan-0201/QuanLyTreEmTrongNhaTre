import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-xem-danh-gia-tre',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './xem-danh-gia-tre.component.html',
  styleUrl: './xem-danh-gia-tre.component.css'
})
export class XemDanhGiaTreComponent {
  studentName: string = 'Tên Bé';
  teacherReviews = [
    {
      teacherName: 'Giáo viên 1',
      comment: 'Bé Lan có sự phát triển tốt về thể chất và tinh thần. Tích cực tham gia các hoạt động nhóm và thể hiện khả năng giao tiếp tốt.',
      score: 8.5
    },
    {
      teacherName: 'Giáo viên 2',
      comment: 'Bé Lan có sự phát triển tốt về thể chất và tinh thần. Tích cực tham gia các hoạt động nhóm và thể hiện khả năng giao tiếp tốt.',
      score: 8.5
    },
    {
      teacherName: 'Giáo viên 3',
      comment: 'Bé Lan có sự phát triển tốt về thể chất và tinh thần. Tích cực tham gia các hoạt động nhóm và thể hiện khả năng giao tiếp tốt.',
      score: 8.5
    },
    {
      teacherName: 'Giáo viên 4',
      comment: 'Bé Lan có sự phát triển tốt về thể chất và tinh thần. Tích cực tham gia các hoạt động nhóm và thể hiện khả năng giao tiếp tốt.',
      score: 8.5
    }
  ];
}
