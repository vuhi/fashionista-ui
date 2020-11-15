import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';

import { HomeComponent } from './home.component';
import { CarouselComponent } from './carousel/carousel.component';
import { LandingComponent } from './landing/landing.component';
import { ExploreComponent } from './explore/explore.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ShareModule } from '../share/share.module';
import { CartComponent } from './cart/cart.component';


@NgModule({
  declarations: [HomeComponent, CarouselComponent, LandingComponent, ExploreComponent, ProductDetailComponent, CartComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ShareModule
  ]
})
export class HomeModule { }
