import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subject } from 'rxjs';
import { pluck, switchMap, takeUntil, tap } from 'rxjs/operators';
import { faTags } from '@fortawesome/free-solid-svg-icons';

import { ProductService } from '../../../services/product-service/product.service';
import { Product } from '../../../models/product.model';
import { CartService } from '../../../services/cart-service/cart.service';
import { UserService } from '../../../services/user-service/user.service';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../../models/user.model';
import { FadeInFWD } from '../../../utils/animations/fade-in-fwd.animation';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
  animations: [FadeInFWD]
})
export class ProductDetailComponent implements OnInit, OnDestroy {

  readonly faTags = faTags;
  product: Product;
  user: User;
  selectedQuantity = 0;
  isInCart = false;
  private readonly unsubscribe = new Subject<void>();

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private userService: UserService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.userService.localUser$.subscribe(res => this.user = res);
    this.activatedRoute.params
      .pipe(
        pluck('id'),
        tap(productId => this.isInCart = this.user.cart.items.some(i => i.product._id === productId)),
        switchMap(productId => this.productService.getProduct(productId)),
        takeUntil(this.unsubscribe)
      )
      .subscribe(res => {
        this.product = res;
      });
  }

  get stock(): { color: string, text: string } {
    return {
      color: this.product?.quantity > 0 ? 'ui-success' : 'ui-danger',
      text: this.product?.quantity > 0 ? 'In Stock' : 'Out of Stock'
    };
  }

  addItemToCart(): void {
    this.cartService.saveItemToCart(this.product._id, this.selectedQuantity, this.user.cart._id)
      .subscribe(res => {
        this.user.cart = res;
        this.userService.localUser = this.user;
        this.toastr.success('Item has been added to cart', 'Added');
        this.isInCart = true;
        this.selectedQuantity = 0;
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

}
