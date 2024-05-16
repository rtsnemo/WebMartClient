import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CategoryProductsService } from '../services/products/category-products.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category-products',
  standalone: true,
  imports: [SharedModule, HttpClientModule, CommonModule, RouterModule],
  templateUrl: './category-products.component.html',
  styleUrl: './category-products.component.css',
  providers: [CategoryProductsService]
})
export class CategoryProductsComponent implements OnInit {
  categoryId!: string;
  products$!: Observable<any[]>;  // Используем Observable для данных о продуктах

  constructor(
    private route: ActivatedRoute,
    private categoryProductService: CategoryProductsService
  ) {}

  ngOnInit() {
    // Получаем параметр categoryId
    this.categoryId = this.route.snapshot.paramMap.get('categoryId') || '';

    // Запрашиваем продукты по этой категории
    this.products$ = this.categoryProductService.getProductsByCategory(this.categoryId);
  }
}
