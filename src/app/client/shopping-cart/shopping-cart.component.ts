import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { OrderItem } from '../../entities/OrderItem';
import { ShoppingCartService } from '../../services/shopping-cart/shopping-cart.service';
import { Observable, Subscription, of, switchMap, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.css',
  providers:[ShoppingCartService]
})
export class ShoppingCartComponent implements OnInit, OnDestroy {
  cartItems$!: Observable<OrderItem[]>;
  private cartUpdateSubscription!: Subscription;

  constructor(private cartService: ShoppingCartService, private router: Router, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.cartItems$ = this.cartService.getItems().pipe(
      tap(cartItems => {
        if (cartItems.length === 0) {
        }
      })
    );

    this.cartUpdateSubscription = this.cartService.getCartUpdatedObservable().subscribe(() => {
      this.cdr.detectChanges();
    });
  }

  ngOnDestroy(): void {
    // Отписываемся от подписки при уничтожении компонента
    this.cartUpdateSubscription.unsubscribe();
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
    this.router.navigate(['/checkout']); // Переход на страницу оформления заказа
  }
}
