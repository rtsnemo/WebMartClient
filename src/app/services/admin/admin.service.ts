import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = 'https://localhost:7115/api'; // Базовый URL для API

  constructor(private http: HttpClient) {}

  // Категории
  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/Categories`);
  }

  updateCategory(category: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/Categories`, category);
  }

  deleteCategory(categoryId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/Categories/${categoryId}`);
  }

  // Продукты
  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/Product`);
  }

  updateProduct(product: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/Product/${product.productID}`, product);
  }

  deleteProduct(productId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/Product/${productId}`);
  }

  // Пользователи
  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/User`);
  }

  updateUser(user: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/User/${user.userID}`, user);
  }

  deleteUser(userId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/User/${userId}`);
  }

  // Заказы
  getOrders(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/Orders`);
  }

  updateOrder(order: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/Orders/${order.orderID}`, order);
  }

  deleteOrder(orderId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/Orders/${orderId}`);
  }

  // Отзывы
  getReviews(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/Review`);
  }

  updateReview(review: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/Review/${review.reviewID}`, review);
  }

  deleteReview(reviewId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/Review/${reviewId}`);
  }
}
