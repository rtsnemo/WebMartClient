import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin/admin.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrderService } from '../../services/orders/order.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-manage-orders',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './manage-orders.component.html',
  styleUrl: './manage-orders.component.css',
  providers: [OrderService]
})
export class ManageOrdersComponent implements OnInit {

  orders: any[] = [];

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.orderService.getOrders().subscribe(data => {
      this.orders = data;
    });
  }

  onUpdateOrder(order: any): void {
    const updatedOrder = { ...order, status: 'Обновленный статус' };
    this.updateOrder(updatedOrder);
  }

  updateOrder(order: any): void {
    this.orderService.updateOrder(order).subscribe(response => {
      this.loadOrders(); // обновляем список заказов после обновления
    });
  }

  deleteOrder(orderId: number): void {
    this.orderService.deleteOrder(orderId).subscribe(response => {
      this.loadOrders(); // обновляем список заказов после удаления
    });
  }
}
