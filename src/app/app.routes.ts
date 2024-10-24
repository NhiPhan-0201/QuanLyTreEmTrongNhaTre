import { Routes } from '@angular/router';
import { FeedbackCategoryComponent } from '../admin/feedback-category/feedback-category.component';
import { AdminManagementPageComponent } from '../admin/admin-management-page/admin-management-page.component';
import { AccountManagementComponent } from '../admin/admin-management-page/account-management/account-management.component';
import { StudentManagementComponent } from '../admin/admin-management-page/student-management/student-management.component';

export const routes: Routes = [
    { path: 'admin/manageCategory', component: FeedbackCategoryComponent },
    {
        path: 'admin/manage', component: AdminManagementPageComponent, children: [
            { path: '', redirectTo: 'accounts', pathMatch: 'full' },
            { path: 'accounts', component: AccountManagementComponent },
            { path: 'students', component: StudentManagementComponent }
        ]
    }
];