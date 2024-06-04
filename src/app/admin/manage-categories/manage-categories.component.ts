import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin/admin.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../../services/categories/category.service';

@Component({
  selector: 'app-manage-categories',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './manage-categories.component.html',
  styleUrl: './manage-categories.component.css',
  providers: [CategoryService]
})
export class ManageCategoriesComponent implements OnInit {

  categories: any[] = [];
  newCategory: any = { name: '', urlImage: '' };
  showAddCategoryPanel: boolean = false;

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe(data => {
      this.categories = data;
    });
  }

  onFileSelected(event: any, category: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        category.urlImage = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onNewCategoryFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.newCategory.urlImage = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onUpdateCategory(category: any): void {
    this.categoryService.updateCategory(category).subscribe(response => {
      console.log('Category updated successfully', response);
      this.loadCategories(); // Обновляем список категорий после обновления
    }, error => {
      console.error('Error updating category', error);
    });
  }

  deleteCategory(categoryId: number): void {
    this.categoryService.deleteCategory(categoryId).subscribe(response => {
      this.loadCategories(); // Обновляем список категорий после удаления
    }, error => {
      console.error('Error deleting category', error);
    });
  }

  addCategory(): void {
    this.categoryService.addCategory(this.newCategory).subscribe(response => {
      console.log('Category added successfully', response);
      this.newCategory = { name: '', urlImage: '' };
      this.showAddCategoryPanel = false; // Скрываем панель после добавления
      this.loadCategories(); // Обновляем список категорий после добавления
    }, error => {
      console.error('Error adding category', error);
    });
  }

  toggleAddCategoryPanel(): void {
    this.showAddCategoryPanel = !this.showAddCategoryPanel;
  }
}
