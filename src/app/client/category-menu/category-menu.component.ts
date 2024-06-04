import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Category } from '../../entities/Category';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { CategoryService } from '../../services/categories/category.service';

@Component({
  selector: 'app-category-menu',
  standalone: true,
  imports: [HttpClientModule, CommonModule, SharedModule, RouterModule],
  templateUrl: './category-menu.component.html',
  styleUrl: './category-menu.component.css',
  providers: [CategoryService]
})
export class CategoryMenuComponent implements OnInit {
  categories: any[] = [];

  constructor(private http: HttpClient, private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.categoryService.getCategories().subscribe(
      (data) => {
        console.log('Fetched categories:', data);
        this.categories = data;
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
  }
}
