import { Component, OnInit } from '@angular/core';
import { CategoryProductsService } from '../../services/products/category-products.service';
import { Observable } from 'rxjs';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { ShoppingCartService } from '../../services/shopping-cart/shopping-cart.service';
import { ReviewService } from '../../services/reviews/review.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [RouterModule, CurrencyPipe, SharedModule, HttpClientModule, CommonModule, FormsModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
  providers: [CategoryProductsService, ShoppingCartService, ReviewService]
})
export class ProductDetailsComponent implements OnInit {
  product$!: Observable<any>;
  reviews$!: Observable<any[]>;
  newReview: { comment: string } = { comment: '' };

  constructor(
    private route: ActivatedRoute,
    private categoryProductsService: CategoryProductsService,
    private cartService: ShoppingCartService,
    private reviewService: ReviewService
  ) {}

  ngOnInit(): void {
    const productId = +this.route.snapshot.paramMap.get('productId')!;
    this.product$ = this.categoryProductsService.getProductById(productId);
    this.reviews$ = this.reviewService.getReviews(productId);
  }

  addItemToCart(product: any): void {
    this.cartService.addItem({
      orderItemID: 0, // временное значение
      quantity: 1,
      price: product.price,
      productID: product.productID,
      product: product
    });

    this.cartService.getCartUpdatedObservable().next();
  }

  submitReview(): void {
    const productId = +this.route.snapshot.paramMap.get('productId')!;
    this.reviewService.addReview(productId, this.newReview.comment).subscribe(
      () => {
        // Перезагрузить продукт после добавления отзыва
        this.product$ = this.categoryProductsService.getProductById(productId);
        this.newReview.comment = '';
      },
      error => {
        console.error('Error adding review', error);
      }
    );
  }
}
