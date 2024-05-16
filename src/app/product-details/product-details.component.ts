import { Component, OnInit } from '@angular/core';
import { CategoryProductsService } from '../services/products/category-products.service';
import { Observable } from 'rxjs';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [RouterModule, CurrencyPipe, SharedModule, HttpClientModule, CommonModule, RouterModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
  providers: [CategoryProductsService]
})
export class ProductDetailsComponent implements OnInit {
  product$!: Observable<any>;

  constructor(
    private route: ActivatedRoute,
    private categoryProductsService: CategoryProductsService
  ) {}

  ngOnInit(): void {
    const productId = +this.route.snapshot.paramMap.get('productId')!;
    this.product$ = this.categoryProductsService.getProductById(productId);
  }
}
