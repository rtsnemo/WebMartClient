import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private baseUrl = 'https://localhost:7115/api/Review';

  constructor(private http: HttpClient) {}

  addReview(productId: number, comment: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    const body = { productId, comment };

    return this.http.post(`${this.baseUrl}/add`, body, { headers });
  }

  getReviews(productId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/product/${productId}`);
  }

  getAllReviews(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  updateReview(review: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${review.reviewID}`, review);
  }

  deleteReview(reviewId: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${reviewId}`);
  }
}
