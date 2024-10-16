import { Routes } from '@angular/router';
import { FeedbackCategoryComponent } from '../admin/feedback-category/feedback-category.component';
import { AdminManagementPageComponent } from '../admin/admin-management-page/admin-management-page.component';

export const routes: Routes = [
    { path: 'admin/manageCategory', component: FeedbackCategoryComponent },
    { path: 'admin/manage', component: AdminManagementPageComponent }
];