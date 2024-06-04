import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryProductsService {
  private baseUrl = 'https://localhost:7115/api/Product';  // URL вашего API

  constructor(private http: HttpClient) {}

  // Метод, который возвращает Observable с продуктами по категории
  getProductsByCategory(categoryId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/category/${categoryId}`);
}

  getProductById(productId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/products/${productId}`);
  }

  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  addProduct(product: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/create-product`, product);
  }

  updateProduct(product: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${product.productID}`, product);
  }

  deleteProduct(productId: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${productId}`);
  }
}
