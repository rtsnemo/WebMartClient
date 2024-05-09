import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Category } from '../entities/Categories';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-category-menu',
  standalone: true,
  imports: [HttpClientModule, CommonModule, SharedModule, RouterModule],
  templateUrl: './category-menu.component.html',
  styleUrl: './category-menu.component.css'
})
export class CategoryMenuComponent implements OnInit {
  BaseURL = 'https://localhost:7115/api/Categories';
  categories: Category[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.http.get<Category[]>(this.BaseURL).subscribe(
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
