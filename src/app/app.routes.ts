import { Routes } from '@angular/router';
import path from 'path';
import { NavBarComponent } from './client/nav-bar/nav-bar.component';
import { CategoryProductsComponent } from './client/category-products/category-products.component';
import { CategoryMenuComponent } from './client/category-menu/category-menu.component';
import { ProductDetailsComponent } from './client/product-details/product-details.component';
import { CheckoutComponent } from './client/checkout/checkout.component';
import { RegisterComponent } from './client/register/register.component';
import { LoginComponent } from './client/login/login.component';
import { UserProfileComponent } from './client/user-profile/user-profile.component';
import { UpdateUserComponent } from './client/update-user/update-user.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { ManageCategoriesComponent } from './admin/manage-categories/manage-categories.component';
import { ManageProductsComponent } from './admin/manage-products/manage-products.component';
import { ManageUsersComponent } from './admin/manage-users/manage-users.component';
import { ManageOrdersComponent } from './admin/manage-orders/manage-orders.component';
import { ManageReviewsComponent } from './admin/manage-reviews/manage-reviews.component';

export const routes: Routes = [
  { path: '', component: CategoryMenuComponent },  // Главная страница с категорией меню
  { path: 'category/:categoryId', component: CategoryProductsComponent },  // Страница с товарами категории
  { path: 'products/:productId', component: ProductDetailsComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: UserProfileComponent},
  { path: 'update-profile', component: UpdateUserComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'admin', component: AdminDashboardComponent, children: [
    { path: 'categories', component: ManageCategoriesComponent },
    { path: 'products', component: ManageProductsComponent },
    { path: 'users', component: ManageUsersComponent },
    { path: 'orders', component: ManageOrdersComponent },
    { path: 'reviews', component: ManageReviewsComponent}
  ]}
];
