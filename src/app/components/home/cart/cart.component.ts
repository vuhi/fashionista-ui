import { Component, OnInit } from '@angular/core';

import { faTags } from '@fortawesome/free-solid-svg-icons';

import { UserService } from '../../../services/user-service/user.service';
import { Cart } from '../../../models/cart.model';
import { Product } from '../../../models/product.model';
import { CartService } from '../../../services/cart-service/cart.service';
import { ConfirmModalComponent } from '../../share/confirm-modal/confirm-modal.component';
import { switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { FadeInFWD } from '../../../utils/animations/fade-in-fwd.animation';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  animations: [FadeInFWD]
})
export class CartComponent implements OnInit {

  readonly faTags = faTags;
  cart: Cart;

  constructor(
    private dialog: MatDialog,
    private toastr: ToastrService,
    private userService: UserService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.userService.localUser$.subscribe(res => {
      this.cart = res.cart;
      this.cart.items.forEach(i => {
        i.originalQuantity = i.quantity;
        i.isUpdating = false;
      });
    });
  }

  get isDisable(): boolean {
    return this.cart.items.some(i => i.isUpdating === true);
  }

  get subTotal(): number {
    return this.cart.items.map(i => i.quantity * i.product.price).reduce((acc, curr) => acc + curr, 0);
  }

  stock(product: Product): { color: string, text: string } {
    return {
      color: product.quantity > 0 ? 'ui-success' : 'ui-danger',
      text: product.quantity > 0 ? 'In Stock' : 'Out of Stock'
    };
  }

  removeItemFromCart(productId: string, quantity: number): void {
    const confirmModal = this.dialog.open(ConfirmModalComponent, {
      data: { title: `Delete item`, msg: 'Are you sure, it will be delete?' }
    });

    confirmModal.afterClosed().pipe(
      switchMap(res => res ?
        this.cartService.removeItemFromCart(productId, quantity, this.cart._id).pipe(
          tap(() => this.toastr.success('Item has been deleted', 'Deleted'))
        ) :
        of(null))
    ).subscribe(res => {
      if (res) {
        const user = this.userService.localUser;
        user.cart = res;
        this.userService.localUser = user;
      }
    });
  }

  updateItemQuantity(productId: string, quantity: number): void {
    this.cartService.updateItemQuantity(productId, quantity, this.cart._id).subscribe(res => {
      const user = this.userService.localUser;
      user.cart = res;
      this.userService.localUser = user;
    });
  }

  makePayment(): void {
    const items = this.cart.items.map(i => {
      return { product: i.product._id, quantity: i.quantity };
    });

    const confirmModal = this.dialog.open(ConfirmModalComponent, {
      data: { title: `Make a Payment`, msg: 'Do you want to proceed?' }
    });

    confirmModal.afterClosed().pipe(
      switchMap(res => res ?
        this.cartService.makePayment(this.cart._id, items).pipe(
          tap(() => this.toastr.success('Payment completed', 'Success'))
        ) :
        of(null))
    ).subscribe(res => {
      if (res) {
        const user = this.userService.localUser;
        user.cart = res;
        this.userService.localUser = user;
      }
    });
  }
}
