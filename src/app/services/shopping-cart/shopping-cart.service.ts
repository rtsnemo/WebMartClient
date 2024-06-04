import { Inject, Injectable, PLATFORM_ID, makeStateKey } from '@angular/core';
import { OrderItem } from '../../entities/OrderItem';
import { isPlatformBrowser } from '@angular/common';
import { TransferState } from '@angular/platform-browser';
import { BehaviorSubject, Observable, Subject } from 'rxjs';


const CART_ITEMS_KEY = makeStateKey<OrderItem[]>('cartItems');

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  private cartItemsSubject = new BehaviorSubject<OrderItem[]>([]);
  private cartUpdated$ = new Subject<void>();

  constructor(
    private transferState: TransferState,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.loadCartItems();
  }

  getItems(): Observable<OrderItem[]> {
    return this.cartItemsSubject.asObservable();
  }

  getCartUpdatedObservable(): Subject<void> {
    return this.cartUpdated$;
  }

  addItem(item: OrderItem): void {
    var updatedItems = [...this.cartItemsSubject.value];
    console.log(this.cartItemsSubject.value);
    var existingItemIndex = updatedItems.findIndex(i => i.productID === item.productID);
    console.log(existingItemIndex);
    if (existingItemIndex !== -1) {
      updatedItems[existingItemIndex].quantity += item.quantity;
    } else {
      updatedItems.push(item);
    }

    this.cartItemsSubject.next(updatedItems);
    this.saveCartItems();
    console.log('Adding item to cart:', item);
    this.cartUpdated$.next();
  }

  removeItem(item: OrderItem): void {
    const updatedCartItems = this.cartItemsSubject.value.filter(i => i.productID !== item.productID);
    this.cartItemsSubject.next(updatedCartItems);
    this.saveCartItems();
    console.log('Deleting item from cart:', item);
    console.log(this.cartItemsSubject.asObservable());
    this.cartUpdated$.next();
  }

  updateQuantity(item: OrderItem, quantity: number): void {
    const updatedCartItems = this.cartItemsSubject.value.map(i => {
      if (i.orderItemID === item.orderItemID) {
        return { ...i, quantity };
      }
      return i;
    });
    this.cartItemsSubject.next(updatedCartItems);
    this.saveCartItems(); // Обновляем localStorage
    this.cartUpdated$.next();
  }

  clearCart(): void {
    localStorage.removeItem('cartItems');
    this.cartItemsSubject.next([]);
    this.saveCartItems();
    this.cartUpdated$.next();
  }

  private saveCartItems(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('cartItems', JSON.stringify(this.cartItemsSubject.value));
    } else {
      this.transferState.set(CART_ITEMS_KEY, this.cartItemsSubject.value);
    }
  }

  private loadCartItems(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.loadCartItemsFromLocalStorage();
    } else {
      this.loadCartItemsFromTransferState();
    }
  }

  private loadCartItemsFromLocalStorage(): void {
    const savedCartItems = localStorage.getItem('cartItems');
    if (savedCartItems) {
      this.cartItemsSubject.next(JSON.parse(savedCartItems));
    }
  }

  private loadCartItemsFromTransferState(): void {
    const savedCartItems = this.transferState.get(CART_ITEMS_KEY, []);
    this.cartItemsSubject.next(savedCartItems);
  }
}
