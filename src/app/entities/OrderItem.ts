import { Order } from "./Order";
import { Product } from "./Product";

export interface OrderItem {
  orderItemID: number;
  quantity: number;
  price: number;
  productID: number;
  product?: Product;
}
