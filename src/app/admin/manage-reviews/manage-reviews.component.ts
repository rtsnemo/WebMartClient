import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin/admin.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReviewService } from '../../services/reviews/review.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-manage-reviews',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './manage-reviews.component.html',
  styleUrl: './manage-reviews.component.css',
  providers: [ReviewService]
})
export class ManageReviewsComponent implements OnInit {

  reviews: any[] = [];

  constructor(private reviewService: ReviewService) {}

  ngOnInit(): void {
    this.loadReviews();
  }

  loadReviews(): void {
    this.reviewService.getAllReviews().subscribe(data => {
      this.reviews = data;
    });
  }

  onUpdateReview(review: any): void {
    const updatedReview = { ...review, comment: 'Обновленный комментарий' };
    this.updateReview(updatedReview);
  }

  updateReview(review: any): void {
    this.reviewService.updateReview(review).subscribe(response => {
      this.loadReviews(); // обновляем список отзывов после обновления
    });
  }

  deleteReview(reviewId: number): void {
    this.reviewService.deleteReview(reviewId).subscribe(response => {
      this.loadReviews(); // обновляем список отзывов после удаления
    });
  }
}
