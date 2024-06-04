import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { ManageCategoriesComponent } from '../manage-categories/manage-categories.component';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ManageOrdersComponent } from '../manage-orders/manage-orders.component';
import { ManageProductsComponent } from '../manage-products/manage-products.component';
import { ManageReviewsComponent } from '../manage-reviews/manage-reviews.component';
import { ManageUsersComponent } from '../manage-users/manage-users.component';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [RouterOutlet, RouterModule, HttpClientModule, ManageCategoriesComponent, ManageOrdersComponent, ManageProductsComponent, ManageReviewsComponent, ManageUsersComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {

}
