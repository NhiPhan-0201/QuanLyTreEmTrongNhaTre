import { Component } from '@angular/core';
import { Routes } from '@angular/router';

import { NotificationsComponent } from './component/giaovien/notifications/notifications-page.component';
import { TimetablesComponent } from './component/giaovien/timetable-management/timetable.component';



import { feedbackComponent } from './component/phuhuynh/feedback/feedback.component';
import { ViewSchoolfeeComponent } from './component/phuhuynh/school-fee/view-schoolfee/view-schoolfee.component';
import { PayComponent } from './component/phuhuynh/school-fee/pay/pay.component';
import { ViewComponent } from './component/phuhuynh/roll-call/view/view.component';
import { XemDanhGiaTreComponent } from './component/phuhuynh/xem-danh-gia-tre/xem-danh-gia-tre.component';
import { PHXemThucDonComponent } from './component/phuhuynh/xem-thuc-don/xem-thuc-don.component';

import { AdminManagementPageComponent } from './component/admin/admin-management-page/admin-management-page.component';
import { AccountManagementComponent } from './component/admin/admin-management-page/account-management/account-management.component';
import { StudentManagementComponent } from './component/admin/admin-management-page/student-management/student-management.component';
import { ClassManagementComponent } from './component/admin/admin-management-page/class-management/class-management.component';

import { FeedbackCategoryComponent } from './component/admin/feedback-category/feedback-category.component'
import { AdminFeedbackComponent } from './component/admin/feedback/feedback.component';
import { SchoolFeeComponent } from './component/admin/school-fee/school-fee.component';
import { ReportComponent } from './component/admin/report/report.component';

// giao vien
import { GiaovienManagementPageComponent } from './giaovien/giaovien-management-page/giaovien-management-page.component';
import { GiaovienDanhsachhocsinhComponent } from './giaovien/giaovien-danhsachhocsinh/giaovien-danhsachhocsinh.component';
import { GiaovienDiemdanhComponent } from './giaovien/giaovien-diemdanh/giaovien-diemdanh.component';
import { GiaovienDanhsachthongbaoComponent } from './giaovien/giaovien-danhsachthongbao/giaovien-danhsachthongbao.component';
import { GiaovienNoidungthongbaoComponent } from './giaovien/giaovien-noidungthongbao/giaovien-noidungthongbao.component';
import { GiaovienThongtinhocsinhComponent } from './giaovien/giaovien-thongtinhocsinh/giaovien-thongtinhocsinh.component';
import { QuanLyLopComponent} from './component/giaovien/quan-ly-lop/quan-ly-lop.component';
import { QuanLyNhomLopComponent} from './component/giaovien/quan-ly-nhom-lop/quan-ly-nhom-lop.component';
import { XemThucDonComponent} from './component/giaovien/xem-thuc-don/xem-thuc-don.component';
//

import { HomeComponent } from './layout/home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { VerifyOtpComponent } from './auth/verify-otp/verify-otp.component';

// Phuhuynh
import { XemThongBaoComponent } from './component/phuhuynh/xem-thong-bao/xem-thong-bao.component';
import { ThoiKhoaBieuComponent } from './component/phuhuynh/xem-thoi-khoa-bieu/xem-thoi-khoa-bieu.component';
import { PhuhuynhComponent } from './component/phuhuynh/phuhuynh.component';
import { StudentInfoComponent } from './component/phuhuynh/student-info/student-info.component';
import { TeacherInfoComponent } from './component/phuhuynh/teacher-info/teacher-info.component';

export const routes: Routes = [


  { path: 'teacher/notifications', component: NotificationsComponent },
  { path: 'teacher/timetable-management', component: TimetablesComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'verify', component: VerifyOtpComponent },

  // giaovien routes
  {
    path: 'giaovien-management', component: GiaovienManagementPageComponent, children: [
      { path: 'danhsachhocsinh', component: GiaovienDanhsachhocsinhComponent },
      { path: 'diemdanh', component: GiaovienDiemdanhComponent },
      { path: 'thongtinhocsinh', component: GiaovienThongtinhocsinhComponent },
      { path: 'danhsachthongbao', component: GiaovienDanhsachthongbaoComponent },
      { path: 'noidungthongbao/:uniqueId', component: GiaovienNoidungthongbaoComponent },
      { path: 'xemlop', component: QuanLyLopComponent },
      { path: 'xemnhomlop', component: QuanLyNhomLopComponent },
      { path: 'xemthucdon', component: XemThucDonComponent },
      { path: '', redirectTo: 'danhsachhocsinh', pathMatch: 'full' }  // Đường dẫn mặc định
    ]
  },
  //

  {
    path: 'admin/manage', component: AdminManagementPageComponent, children: [
      { path: '', redirectTo: 'accounts', pathMatch: 'full' },
      { path: 'accounts', component: AccountManagementComponent },
      { path: 'students', component: StudentManagementComponent },
      { path: 'classes', component: ClassManagementComponent },
      { path: 'manageCategory', component: FeedbackCategoryComponent },
      { path: 'feedback', component: AdminFeedbackComponent },
      { path: 'schoolFee', component: SchoolFeeComponent },
      { path: 'report', component: ReportComponent },
    ]
  },
  { path: 'phuhuynh/feedback', component: feedbackComponent },
  { path: 'phuhuynh/roll-call', component: ViewComponent },
  { path: 'phuhuynh/school-fee/pay', component: PayComponent },
  { path: 'phuhuynh/school-fee/view', component: ViewSchoolfeeComponent },
  { path: 'xemdanhgiatre', component: XemDanhGiaTreComponent },
  { path: 'xemthucdon', component: PHXemThucDonComponent },
  
  // Phu huynh
  {
    path: 'phuhuynh', component: PhuhuynhComponent , children: [
      { path: '', redirectTo: 'xem-thong-bao', pathMatch: 'full' },
      { path: 'xem-thong-bao', component: XemThongBaoComponent },
      { path: 'xem-thoi-khoa-bieu', component: ThoiKhoaBieuComponent },
      { path: 'student-info', component: StudentInfoComponent },
      { path: 'teacher-info', component: TeacherInfoComponent }
    ]
  }
];
