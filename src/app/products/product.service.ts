/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from './product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.apiUrl}/products`);
  }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${environment.apiUrl}/products`, product);
  }

  deleteProduct(product: Product): Observable<Product> {
    return this.http.delete<Product>(
      `${environment.apiUrl}/products/${product._id}`
    );
  }

  updateProduct(product: Product): Observable<Product> {
    return this.http.patch<Product>(
      `${environment.apiUrl}/products/${product._id}`,
      product
    );
  }

  getProduct(id: string): Observable<Product> {
    return this.http.get<Product>(`${environment.apiUrl}/products/${id}`);
  }
}
