import { Component, OnInit } from '@angular/core';
import { Product } from '../../../models/product.model';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {

  items: Product[] = [
    {
      image: 'https://images.unsplash.com/photo-1496217590455-aa63a8350eea?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80',
      name: 'Item 1',
      brand: 'Apple',
      price: 0,
      quantity: 0,
      description: ''
    },
    {
      image: 'https://images.unsplash.com/photo-1490725263030-1f0521cec8ec?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      name: 'Item 2',
      brand: 'Apple',
      price: 0,
      quantity: 0,
      description: ''
    },
    {
      image: 'https://images.unsplash.com/photo-1484327973588-c31f829103fe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80',
      name: 'Item 3',
      brand: 'Apple',
      price: 0,
      quantity: 0,
      description: ''
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
