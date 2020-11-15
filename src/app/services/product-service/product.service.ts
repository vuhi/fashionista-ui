import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { Res } from '../../models/res.model';
import { Product } from '../../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getDetailProducts(): Observable<Product[]> {
    return this.http.get<Res<Product[]>>(`${environment.API_URL}/products/all`)
      .pipe(map(res => res.data));
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Res<Product[]>>(`${environment.API_URL}/products/list`)
      .pipe(map(res => res.data));
  }

  getProduct(id: string): Observable<Product> {
    return this.http.get<Res<Product>>(`${environment.API_URL}/products/${id}`)
      .pipe(map(res => res.data));
  }

  createProduct(product: Product): Observable<Product> {
    return this.http.post<Res<Product>>(`${environment.API_URL}/products`, product)
      .pipe(
        map(res => res.data),
        catchError(err => throwError(`failed to create: ${err.error.message || err.message}`))
      );
  }

  updateProduct(id: string, product: Product): Observable<Product> {
    return this.http.put<Res<Product>>(`${environment.API_URL}/products/${id}`, product)
      .pipe(
        map(res => res.data),
        catchError(err => throwError(`failed to update: ${err.error.message || err.message}`))
      );
  }

  deleteUser(id: string): Observable<Product> {
    return this.http.delete<Res<Product>>(`${environment.API_URL}/products/${id}`)
      .pipe(map(res => res.data));
  }
}
