import { Component, OnDestroy, OnInit } from '@angular/core';
import { ShoppingCartService } from '../../services/shopping-cart/shopping-cart.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { OrderItem } from '../../entities/OrderItem';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Order } from '../../entities/Order';
import { Router } from '@angular/router';
import { User } from '../../entities/User';
import { FormsModule } from '@angular/forms';
import { Customer } from '../../entities/Customer';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [HttpClientModule, CommonModule, CurrencyPipe, FormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit, OnDestroy {
  cartItems: OrderItem[] = [];
  customer: Customer = {
    name: '',
    email: '',
    address: '',
    phoneNumber: '',
  };
  private cartItemsSubscription!: Subscription;

  constructor(private cartService: ShoppingCartService, private http: HttpClient) { }

  ngOnInit(): void {
    this.cartItemsSubscription = this.cartService.getItems().subscribe(items => {
      this.cartItems = items;
    });
  }

  ngOnDestroy(): void {
    this.cartItemsSubscription.unsubscribe();
  }

  getTotal(): number {
    return this.cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  }

  submitOrder(): void {
    const simplifiedCartItems = this.cartItems.map(item => ({
      productID: item.productID,
      quantity: item.quantity,
      price: item.price
    }));

    const order = {
      customer: this.customer,
      orderItems: simplifiedCartItems
    };

    this.http.post('https://localhost:7115/api/Orders/create-order', order).subscribe(
      response => {
        console.log('Order successfully placed', response);
        this.cartService.clearCart();
      },
      error => {
        console.error('Error placing order', error, order);
      }
    );
  }
}
