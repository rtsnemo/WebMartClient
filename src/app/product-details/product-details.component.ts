import { Component, OnInit } from '@angular/core';
import { CategoryProductsService } from '../services/products/category-products.service';
import { Observable } from 'rxjs';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { ShoppingCartService } from '../services/shopping-cart/shopping-cart.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [RouterModule, CurrencyPipe, SharedModule, HttpClientModule, CommonModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
  providers: [CategoryProductsService, ShoppingCartService]
})
export class ProductDetailsComponent implements OnInit {
  product$!: Observable<any>;

  constructor(
    private route: ActivatedRoute,
    private categoryProductsService: CategoryProductsService,
    private cartService: ShoppingCartService
  ) {}

  ngOnInit(): void {
    const productId = +this.route.snapshot.paramMap.get('productId')!;
    this.product$ = this.categoryProductsService.getProductById(productId);
  }

  addItemToCart(product: any): void {
    this.cartService.addItem({
      orderItemID: 0, // временное значение
      quantity: 1,
      price: product.price,
      productID: product.productID,
      product: product
    });

    console.log('Updated cart items:', this.cartService.getItems());
  }
}
