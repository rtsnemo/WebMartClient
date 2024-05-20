import { Routes } from '@angular/router';
import path from 'path';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { CategoryProductsComponent } from './category-products/category-products.component';
import { CategoryMenuComponent } from './category-menu/category-menu.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CheckoutComponent } from './checkout/checkout.component';

export const routes: Routes = [
  { path: '', component: CategoryMenuComponent },  // Главная страница с категорией меню
  { path: 'category/:categoryId', component: CategoryProductsComponent },  // Страница с товарами категории
  { path: 'products/:productId', component: ProductDetailsComponent },
  { path: 'checkout', component: CheckoutComponent }
];
