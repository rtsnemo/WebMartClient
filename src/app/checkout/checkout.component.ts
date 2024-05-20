import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../services/shopping-cart/shopping-cart.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { OrderItem } from '../entities/OrderItem';
import { CommonModule, CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [HttpClientModule, CommonModule, CurrencyPipe],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {
  cartItems: OrderItem[] = [];

  constructor(private cartService: ShoppingCartService, private http: HttpClient) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getItems();
  }

  getTotal(): number {
    return this.cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  }

  submitOrder(): void {
    const order = {
      items: this.cartItems,
      // Добавьте здесь дополнительные данные заказа, если необходимо
    };

    this.http.post('/api/checkout', order).subscribe(response => {
      console.log('Order submitted successfully', response);
      this.cartService.clearCart(); // Очищаем корзину после успешной отправки заказа
    }, error => {
      console.error('Error submitting order', error);
    });
  }
}
