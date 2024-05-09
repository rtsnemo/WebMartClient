import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryProductsService {
  private baseUrl = 'https://localhost:7115/api/Product/category/';  // URL вашего API

  constructor(private http: HttpClient) {}

  // Метод, который возвращает Observable с продуктами по категории
  getProductsByCategory(categoryId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}${categoryId}`);
}
}
