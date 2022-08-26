import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from './category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient) {}

  getCategories() {
    return this.http.get<Category[]>('/api/categories');
  }

  addCategory(category: Category) {
    return this.http.post<Category>('/api/categories', category);
  }

  updateCategory(category: Category) {
    return this.http.put<Category>('/api/categories', category);
  }

  deleteCategory(category: Category) {
    return this.http.delete<Category>(`/api/categories/${category}`);
  }
}
