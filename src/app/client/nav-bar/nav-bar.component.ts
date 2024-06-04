import { Component, ViewChild } from '@angular/core';
import { ShoppingCartComponent } from '../shopping-cart/shopping-cart.component';
import { ShoppingCartService } from '../../services/shopping-cart/shopping-cart.service';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { CartSidebarComponent } from '../cart-sidebar/cart-sidebar.component';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterModule, CommonModule, CartSidebarComponent],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
  providers: [AuthService]
})
export class NavBarComponent {
  @ViewChild('cartSidebar') cartSidebar!: CartSidebarComponent;

  constructor(public authService: AuthService, private router: Router) {}

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  redirectToUpdate() {
    this.router.navigate(['/update-profile']);
  }

  redirectToProfile() {
    this.router.navigate(['/profile']);
  }

  toggleCart() {
    this.cartSidebar.isOpen ? this.cartSidebar.close() : this.cartSidebar.open();
  }
}
