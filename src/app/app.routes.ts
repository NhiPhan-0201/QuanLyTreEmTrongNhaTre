import { Routes } from '@angular/router';
import { FeedbackCategoryComponent } from '../admin/feedback-category/feedback-category.component';
import { AdminManagementPageComponent } from '../admin/admin-management-page/admin-management-page.component';
import { FeedbackComponent } from '../admin/feedback/feedback.component';

export const routes: Routes = [
    { path: 'admin/manageCategory', component: FeedbackCategoryComponent },
    { path: 'admin/feedback', component: FeedbackComponent },
    { path: 'admin/manage', component: AdminManagementPageComponent }
];