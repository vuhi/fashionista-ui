import { Component, OnInit } from '@angular/core';

import { Product } from '../../../models/product.model';
import { ProductService } from '../../../services/product-service/product.service';
import { FadeInFWD } from '../../../utils/animations/fade-in-fwd.animation';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss'],
  animations: [FadeInFWD]
})
export class ExploreComponent implements OnInit {

  products: Product[] = [];

  constructor(
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(res => { this.products = res; });
  }
}
