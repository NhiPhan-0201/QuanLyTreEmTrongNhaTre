import { Routes } from '@angular/router';
import { FeedbackCategoryComponent } from '../admin/feedback-category/feedback-category.component';
import { FeedbackComponent } from '../admin/feedback/feedback.component';
import { SchoolFeeComponent } from '../admin/school-fee/school-fee.component';
import { NotificationsComponent } from '../teacher/notifications/notifications-page.component';
import { TimetablesComponent } from '../teacher/timetable-management/timetable.component';

import { AdminManagementPageComponent } from '../admin/admin-management-page/admin-management-page.component';
import { AccountManagementComponent } from '../admin/admin-management-page/account-management/account-management.component';
import { StudentManagementComponent } from '../admin/admin-management-page/student-management/student-management.component';

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
            { path: 'students', component: StudentManagementComponent }
        ]
    }
];