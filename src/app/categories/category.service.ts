/* eslint-disable no-underscore-dangle */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Category } from './category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient) {}

  getCategories() {
    return this.http.get<Category[]>(`${environment.apiUrl}/categories`);
  }

  addCategory(category: Category) {
    return this.http.post<Category>(
      `${environment.apiUrl}/categories`,
      category
    );
  }

  deleteCategory(category: Category) {
    return this.http.delete<Category>(
      `${environment.apiUrl}/categories/${category._id}`
    );
  }

  updateCategory(category: Category) {
    return this.http.patch<Category>(
      `${environment.apiUrl}/categories/${category._id}`,
      category
    );
  }
}
