import { Component, OnDestroy, OnInit } from '@angular/core';
import { OrderItem } from '../entities/OrderItem';
import { ShoppingCartService } from '../services/shopping-cart/shopping-cart.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.css',
  providers: [ShoppingCartService]
})
export class ShoppingCartComponent implements OnInit, OnDestroy {
  cartItems: OrderItem[] = [];
  private cartUpdateSubscription!: Subscription;

  constructor(private cartService: ShoppingCartService, private router: Router) { }

  ngOnInit(): void {
    this.cartItems = this.cartService.getItems();
    this.cartUpdateSubscription = this.cartService.getCartUpdatedObservable().subscribe(() => {
      this.cartItems = this.cartService.getItems(); // Обновляем корзину при изменениях
    });
  }

  ngOnDestroy(): void {
    this.cartUpdateSubscription.unsubscribe();
  }

  removeItem(item: OrderItem): void {
    this.cartService.removeItem(item);
    this.cartItems = this.cartService.getItems(); // Обновляем список после удаления
  }

  clearCart(): void {
    this.cartService.clearCart();
    this.cartItems = []; // Очищаем отображаемый список после очистки корзины
  }

  getTotal(): number {
    return this.cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  }

  proceedToCheckout(): void {
    this.router.navigate(['/checkout']); // Переход на страницу оформления заказа
  }
}
