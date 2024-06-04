import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { OrderItem } from '../../entities/OrderItem';
import { ShoppingCartService } from '../../services/shopping-cart/shopping-cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-sidebar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cart-sidebar.component.html',
  styleUrl: './cart-sidebar.component.css',
  providers:[ShoppingCartService]
})
export class CartSidebarComponent implements OnInit {
  cartItems$!: Observable<OrderItem[]>;
  isOpen = false;

  constructor(private cartService: ShoppingCartService, private router: Router) {}

  ngOnInit(): void {
    this.cartItems$ = this.cartService.getItems();
  }

  open(): void {
    this.isOpen = true;
  }

  close(): void {
    this.isOpen = false;
  }

  removeItem(item: OrderItem): void {
    this.cartService.removeItem(item);
  }

  clearCart(): void {
    this.cartService.clearCart();
  }

  getTotal(cartItems: OrderItem[] | null): number {
    if (!cartItems) {
      return 0;
    }
    return cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  }

  proceedToCheckout(): void {
    this.router.navigate(['/checkout']);
  }
}
