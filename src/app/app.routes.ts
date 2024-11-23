import { Component } from '@angular/core';
import { Routes } from '@angular/router';

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

// Giao Vien
import { TeacherManagementPageComponent } from './component/teacher/teacher-management-page.component';
//import { GiaovienManagementPageComponent } from './component/teacher/side-bar-management(old)/side-bar-management.component';
import { GiaovienDanhsachhocsinhComponent } from './component/teacher/student-list/student-list.component';
import { GiaovienDiemdanhComponent } from './component/teacher/attendance-records/attendance-records.component';
import { GiaovienDanhsachthongbaoComponent } from './component/teacher/notification-list/notification-list.component';
import { GiaovienNoidungthongbaoComponent } from './component/teacher/notification-content/notification-content.component';
import { GiaovienThongtinhocsinhComponent } from './component/teacher/student-info/student-info.component';

import { QuanLyLopComponent} from './component/teacher/class-management/class-management.component';
import { QuanLyNhomLopComponent} from './component/teacher/class-group-management/class-group-management.component';
import { XemThucDonComponent} from './component/teacher/view-meal-menu/view-meal-menu.component';
import { NotificationsSendPageComponent } from './component/teacher/notifications-send-page/notifications-send-page.component';
import { TimetablesComponent } from './component/teacher/timetable-management/timetable.component';
import { RatingComponent } from './component/teacher/rating/rating.component';
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
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'verify', component: VerifyOtpComponent },

  // giaovien routes
  {
    path: 'teacher/manage', component: TeacherManagementPageComponent, children: [
      { path: 'student-list', component: GiaovienDanhsachhocsinhComponent },
      { path: 'attendance-records', component: GiaovienDiemdanhComponent },
      { path: 'teacher/student-info', component: GiaovienThongtinhocsinhComponent },
      { path: 'notification-list', component: GiaovienDanhsachthongbaoComponent },
      { path: 'teacher/notification-content/:uniqueId', component: GiaovienNoidungthongbaoComponent },
      { path: 'class-management', component: QuanLyLopComponent },
      { path: 'class-group-management', component: QuanLyNhomLopComponent },
      { path: 'view-meal-menu', component: XemThucDonComponent },
      { path: 'notifications', component: NotificationsSendPageComponent },
      { path: 'timetable-management', component: TimetablesComponent },
      { path: 'rating', component: RatingComponent },
      { path: '', redirectTo: 'student-list', pathMatch: 'full' }
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

  // Phu huynh
  {
    path: 'phuhuynh', component: PhuhuynhComponent , children: [
      { path: '', redirectTo: 'xem-thong-bao', pathMatch: 'full' },
      { path: 'xem-thong-bao', component: XemThongBaoComponent },
      { path: 'xem-thoi-khoa-bieu', component: ThoiKhoaBieuComponent },
      { path: 'student-info', component: StudentInfoComponent },
      { path: 'teacher-info', component: TeacherInfoComponent },
      { path: 'feedback', component: feedbackComponent },
      { path: 'roll-call', component: ViewComponent },
      { path: 'school-fee/pay', component: PayComponent },
      { path: 'school-fee/view-schoolfee', component: ViewSchoolfeeComponent },
      { path: 'xemdanhgiatre', component: XemDanhGiaTreComponent },
      { path: 'xemthucdon', component: PHXemThucDonComponent },
    ]
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];
