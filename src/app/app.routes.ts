import { Routes } from '@angular/router';
import { FeedbackCategoryComponent } from '../admin/feedback-category/feedback-category.component';
import { FeedbackComponent } from '../admin/feedback/feedback.component';
import { SchoolFeeComponent } from '../admin/school-fee/school-fee.component';
import { NotificationsComponent } from './component/giaovien/notifications/notifications-page.component';
import { TimetablesComponent } from './component/giaovien/timetable-management/timetable.component';
import { XemThongBaoComponent } from './component/phuhuynh/xem-thong-bao/xem-thong-bao.component';

import { AdminManagementPageComponent } from '../admin/admin-management-page/admin-management-page.component';
import { AccountManagementComponent } from '../admin/admin-management-page/account-management/account-management.component';
import { StudentManagementComponent } from '../admin/admin-management-page/student-management/student-management.component';
import { ClassManagementComponent } from '../admin/admin-management-page/class-management/class-management.component';

export const routes: Routes = [
  { path: 'admin/manageCategory', component: FeedbackCategoryComponent },
  { path: 'admin/feedback', component: FeedbackComponent },
  { path: 'admin/schoolFee', component: SchoolFeeComponent },
  { path: 'teacher/notifications', component: NotificationsComponent },
  { path: 'teacher/timetable-management', component: TimetablesComponent },

  {
    path: 'admin/manage', component: AdminManagementPageComponent, children: [
      { path: '', redirectTo: 'accounts', pathMatch: 'full' },
      { path: 'accounts', component: AccountManagementComponent },
      { path: 'students', component: StudentManagementComponent },
      { path: 'classes', component: ClassManagementComponent }
    ]
  },
  {
    path: 'phuhuynh/xem-thong-bao', component: XemThongBaoComponent
  }
];
