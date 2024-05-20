import { Inject, Injectable, PLATFORM_ID, makeStateKey } from '@angular/core';
import { OrderItem } from '../../entities/OrderItem';
import { isPlatformBrowser } from '@angular/common';
import { TransferState } from '@angular/platform-browser';
import { Subject } from 'rxjs';

const CART_ITEMS_KEY = makeStateKey<OrderItem[]>('cartItems');

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  private cartItems: OrderItem[] = [];
  private cartUpdated$ = new Subject<void>();

  constructor(
    private transferState: TransferState,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.loadCartItems();
  }

  getItems(): OrderItem[] {
    return this.cartItems;
  }

  getCartUpdatedObservable() {
    return this.cartUpdated$.asObservable();
  }

  addItem(item: OrderItem): void {
    console.log('Добавляем товар:', item);
    const existingItem = this.cartItems.find(i => i.productID === item.productID);

    if (existingItem) {
      console.log('Товар уже в корзине, увеличиваем количество:', existingItem);
      existingItem.quantity += item.quantity; // Увеличиваем на переданное количество
    } else {
      console.log('Новый товар, добавляем в корзину:', item);
      const newItem = { ...item, orderItemID: this.generateOrderItemID() };
      this.cartItems.push(newItem);
    }

    console.log('Текущие товары в корзине:', this.cartItems);
    this.saveCartItems();
    this.cartUpdated$.next(); // Оповещаем подписчиков о изменениях
  }

  removeItem(item: OrderItem): void {
    const index = this.cartItems.findIndex(i => i.orderItemID === item.orderItemID);
    if (index !== -1) {
      this.cartItems.splice(index, 1);
      this.saveCartItems();
      this.cartUpdated$.next(); // Notify subscribers about changes
    }
  }

  updateQuantity(item: OrderItem, quantity: number): void {
    const index = this.cartItems.findIndex(i => i.orderItemID === item.orderItemID);
    if (index !== -1) {
      this.cartItems[index].quantity = quantity;
      this.saveCartItems();
      this.cartUpdated$.next(); // Notify subscribers about changes
    }
  }

  clearCart(): void {
    this.cartItems = [];
    this.saveCartItems();
    this.cartUpdated$.next(); // Notify subscribers about changes
  }

  private saveCartItems(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
    } else {
      this.transferState.set(CART_ITEMS_KEY, this.cartItems);
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
      this.cartItems = JSON.parse(savedCartItems);
    }
  }

  private loadCartItemsFromTransferState(): void {
    const savedCartItems = this.transferState.get(CART_ITEMS_KEY, []);
    this.cartItems = savedCartItems;
  }

  private generateOrderItemID(): number {
    return this.cartItems.length > 0 ? Math.max(...this.cartItems.map(i => i.orderItemID)) + 1 : 1;
  }
}
