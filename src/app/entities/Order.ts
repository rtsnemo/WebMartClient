import { OrderItem } from "./OrderItem";

export interface Order {
  orderId: number;
  orderDate: Date;
  status: string;
  userId: number;
  orderItems?: OrderItem[]; // Список элементов заказа
}
