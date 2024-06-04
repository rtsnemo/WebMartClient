import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin/admin.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoryProductsService } from '../../services/products/category-products.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CategoryService } from '../../services/categories/category.service';

@Component({
  selector: 'app-manage-products',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './manage-products.component.html',
  styleUrl: './manage-products.component.css',
  providers: [CategoryProductsService, CategoryService]
})
export class ManageProductsComponent implements OnInit {

  products: any[] = [];
  filteredProducts: any[] = [];
  categories: any[] = [];
  searchName: string = '';
  searchCategory: string = '';
  showAddProductPanel: boolean = false;
  newProduct: any = { name: '', urlImage: '', price: 0, quantityInStock: 0, categoryId: null };

  constructor(private productService: CategoryProductsService, private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.loadProducts();
    this.loadCategories();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
      this.filteredProducts = data;
      console.log(this.products);
    });
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe(data => {
      this.categories = data;
    });
  }

  filterProducts(): void {
    this.filteredProducts = this.products.filter(product => {
      return (
        (this.searchName === '' || product.name.toLowerCase().includes(this.searchName.toLowerCase())) &&
        (this.searchCategory === '' || product.category.name === this.searchCategory)
      );
    });
  }

  onUpdateProduct(product: any): void {
    const updatedProduct = { ...product, category: this.categories.find(c => c.name === product.category.name) };
    this.productService.updateProduct(updatedProduct).subscribe(response => {
      console.log('Product updated successfully', response);
      this.loadProducts(); // Обновляем список продуктов после обновления
    }, error => {
      console.error('Error updating product', error);
    });
  }

  deleteProduct(productId: number): void {
    this.productService.deleteProduct(productId).subscribe(response => {
      this.loadProducts(); // Обновляем список продуктов после удаления
    }, error => {
      console.error('Error deleting product', error);
    });
  }

  onFileSelected(event: any, product: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        product.urlImage = e.target.result;
        this.onUpdateProduct(product);
      };
      reader.readAsDataURL(file);
    }
  }

  onNewProductFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.newProduct.urlImage = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  addProduct(): void {
    const productToAdd = { ...this.newProduct };
    console.log(productToAdd);
    this.productService.addProduct(productToAdd).subscribe(response => {
      console.log('Product added successfully', response);
      this.newProduct = { name: '', urlImage: '', price: 0, quantityInStock: 0, categoryId: null };
      this.showAddProductPanel = false;
      this.loadProducts();
    }, error => {
      console.error('Error adding product', error);
    });
  }

  toggleAddProductPanel(): void {
    this.showAddProductPanel = !this.showAddProductPanel;
  }
}
