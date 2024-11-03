import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { FeedbackCategoryComponent } from '../admin/feedback-category/feedback-category.component';
//import { FeedbackComponent } from '../admin/feedback/feedback.component';
import { SchoolFeeComponent } from '../admin/school-fee/school-fee.component';
import { NotificationsComponent } from './component/giaovien/notifications/notifications-page.component';
import { TimetablesComponent } from './component/giaovien/timetable-management/timetable.component';
import { XemThongBaoComponent } from './component/phuhuynh/xem-thong-bao/xem-thong-bao.component';



import { FeedbackComponent } from './component/phuhuynh/feedback/feedback.component';
import { ViewSchoolfeeComponent } from './component/phuhuynh/school-fee/view-schoolfee/view-schoolfee.component';
import { PayComponent } from './component/phuhuynh/school-fee/pay/pay.component';
import { ViewComponent } from './component/phuhuynh/roll-call/view/view.component';

import { AdminManagementPageComponent } from '../admin/admin-management-page/admin-management-page.component';
import { AccountManagementComponent } from '../admin/admin-management-page/account-management/account-management.component';
import { StudentManagementComponent } from '../admin/admin-management-page/student-management/student-management.component';
import { ClassManagementComponent } from '../admin/admin-management-page/class-management/class-management.component';

// giao vien
import { GiaovienManagementPageComponent } from './giaovien/giaovien-management-page/giaovien-management-page.component';
import { GiaovienDanhsachhocsinhComponent } from './giaovien/giaovien-danhsachhocsinh/giaovien-danhsachhocsinh.component';
import { GiaovienDiemdanhComponent } from './giaovien/giaovien-diemdanh/giaovien-diemdanh.component';
import { GiaovienDanhsachthongbaoComponent } from './giaovien/giaovien-danhsachthongbao/giaovien-danhsachthongbao.component';
import { GiaovienNoidungthongbaoComponent } from './giaovien/giaovien-noidungthongbao/giaovien-noidungthongbao.component';
import { GiaovienThongtinhocsinhComponent } from './giaovien/giaovien-thongtinhocsinh/giaovien-thongtinhocsinh.component';
//

export const routes: Routes = [
  { path: 'admin/manageCategory', component: FeedbackCategoryComponent },
  { path: 'admin/feedback', component: FeedbackComponent },
  { path: 'admin/schoolFee', component: SchoolFeeComponent },
  { path: 'teacher/notifications', component: NotificationsComponent },
  { path: 'teacher/timetable-management', component: TimetablesComponent },

  // giaovien routes
  { path: 'giaovien-management', component: GiaovienManagementPageComponent, children: [
    { path: 'danhsachhocsinh', component: GiaovienDanhsachhocsinhComponent },
    { path: 'diemdanh', component: GiaovienDiemdanhComponent },
    { path: 'thongtinhocsinh', component: GiaovienThongtinhocsinhComponent },
    { path: 'danhsachthongbao', component: GiaovienDanhsachthongbaoComponent },
    { path: 'noidungthongbao/:id', component: GiaovienNoidungthongbaoComponent },
    { path: '', redirectTo: 'danhsachhocsinh', pathMatch: 'full' }  // Đường dẫn mặc định
  ]},
  //

  {
    path: 'admin/manage', component: AdminManagementPageComponent, children: [
      { path: '', redirectTo: 'accounts', pathMatch: 'full' },
      { path: 'accounts', component: AccountManagementComponent },
      { path: 'students', component: StudentManagementComponent },
      { path: 'classes', component: ClassManagementComponent }
    ]
  },
  { path: 'phuhuynh/xem-thong-bao', component: XemThongBaoComponent },
  { path: 'phuhuynh/feedback', component: FeedbackComponent},
  { path: 'phuhuynh/roll-call', component: ViewComponent},
  { path: 'phuhuynh/school-fee', component: PayComponent},
  { path: 'phuhuynh/school-fee', component: ViewSchoolfeeComponent}

];
