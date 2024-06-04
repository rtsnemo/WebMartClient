import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { NavBarComponent } from './client/nav-bar/nav-bar.component';
import { FooterBarComponent } from './client/footer-bar/footer-bar.component';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { CategoryMenuComponent } from './client/category-menu/category-menu.component';
import { CategoryProductsComponent } from './client/category-products/category-products.component';
import { ShoppingCartComponent } from './client/shopping-cart/shopping-cart.component';
import { CheckoutComponent } from './client/checkout/checkout.component';
import { LoginComponent } from './client/login/login.component';
import { RegisterComponent } from './client/register/register.component';
import { UpdateUserComponent } from './client/update-user/update-user.component';
import { UserProfileComponent } from './client/user-profile/user-profile.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { ManageCategoriesComponent } from './admin/manage-categories/manage-categories.component';
import { ManageProductsComponent } from './admin/manage-products/manage-products.component';
import { ManageUsersComponent } from './admin/manage-users/manage-users.component';
import { ManageOrdersComponent } from './admin/manage-orders/manage-orders.component';
import { ManageReviewsComponent } from './admin/manage-reviews/manage-reviews.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterModule,ManageReviewsComponent,AdminDashboardComponent, ManageCategoriesComponent, ManageProductsComponent, ManageUsersComponent, ManageOrdersComponent, UpdateUserComponent, UserProfileComponent, NavBarComponent, LoginComponent, RegisterComponent, CheckoutComponent, FooterBarComponent, SharedModule, HttpClientModule,ShoppingCartComponent, CategoryMenuComponent, CategoryProductsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'WebMart';
}
