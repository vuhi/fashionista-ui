import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

import { Res } from '../../models/res.model';
import { Cart } from '../../models/cart.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(
    private http: HttpClient
  ) { }

  saveItemToCart(productId: string, quantity: number, cartId: string): Observable<Cart> {
    return this.http.put<Res<Cart>>(`${environment.API_URL}/carts/add/item`, { productId, quantity, cartId })
      .pipe(map(res => res.data));
  }

  removeItemFromCart(productId: string, quantity: number, cartId: string): Observable<Cart> {
    return this.http.put<Res<Cart>>(`${environment.API_URL}/carts/remove/item`, { productId, quantity, cartId })
      .pipe(map(res => res.data));
  }

  updateItemQuantity(productId: string, quantity: number, cartId: string): Observable<Cart> {
    return this.http.put<Res<Cart>>(`${environment.API_URL}/carts/update/item/quantity`, { productId, quantity, cartId })
      .pipe(map(res => res.data));
  }

  makePayment(cartId: string, items: { product: string, quantity: number }[] ): Observable<Cart> {
    return this.http.put<Res<Cart>>(`${environment.API_URL}/carts/pay`, { items, cartId })
      .pipe(map(res => res.data));
  }
}
