import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ButtonConfig, FormMode } from '../../../../models/form.config';
import { Product } from '../../../../models/product.model';
import {
  IMG_URL_MAX_LEN, URL_PATTERN,
  PRODUCT_BRAND_MAX_LEN,
  PRODUCT_DESC_MAX_LEN,
  PRODUCT_NAME_MAX_LEN, PRODUCT_PRICE_MIN, PRODUCT_QUANTITY_MIN
} from '../../../../utils/configs/app-constant';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {

  @Input('mode') mode: FormMode;
  @Input('error') error = '';
  @Input('product') product: Product;
  @Input('buttonConfig') buttonConfig: ButtonConfig;

  @Output('actionOutput') actionOutput: EventEmitter<any> = new EventEmitter<any>();
  @Output('cancelOutPut') cancelOutPut: EventEmitter<any> = new EventEmitter<any>();

  readonly PRODUCT_NAME_MAX_LEN = PRODUCT_NAME_MAX_LEN;
  readonly IMG_URL_MAX_LEN = IMG_URL_MAX_LEN;
  readonly URL_PATTERN = URL_PATTERN;
  readonly PRODUCT_BRAND_MAX_LEN = PRODUCT_BRAND_MAX_LEN;
  readonly PRODUCT_DESC_MAX_LEN = PRODUCT_DESC_MAX_LEN;
  readonly PRODUCT_PRICE_MIN = PRODUCT_PRICE_MIN;
  readonly PRODUCT_QUANTITY_MIN = PRODUCT_QUANTITY_MIN;
  imageError = 'please use a valid image URL with HTTP or HTTPS';
  readonly EDIT = FormMode.EDIT;
  readonly CREATE = FormMode.CREATE;
  productForm: FormGroup;

  constructor(
    private fb: FormBuilder
  ) { }
  get name(): AbstractControl { return this.productForm.get('name'); }
  get image(): AbstractControl { return this.productForm.get('image'); }
  get brand(): AbstractControl { return this.productForm.get('brand'); }
  get description(): AbstractControl { return this.productForm.get('description'); }
  get price(): AbstractControl { return this.productForm.get('price'); }
  get quantity(): AbstractControl { return this.productForm.get('quantity'); }
  get isDisable(): boolean {
    return this.mode === this.EDIT ? this.productForm.invalid || !this.productForm.touched : this.productForm.invalid;
  }

  ngOnInit(): void {
    const name = this.fb.control(
      this.product?.name || '',
      [Validators.required, Validators.maxLength(PRODUCT_NAME_MAX_LEN)]
    );
    const image = this.fb.control(
      this.product?.image || '',
      [Validators.required, Validators.maxLength(IMG_URL_MAX_LEN), Validators.pattern(URL_PATTERN)]
    );
    const brand = this.fb.control(
      this.product?.brand || '',
      [Validators.required, Validators.maxLength(PRODUCT_BRAND_MAX_LEN)]
    );
    const description = this.fb.control(
      this.product?.description || '',
      [Validators.required, Validators.maxLength(PRODUCT_DESC_MAX_LEN)]
    );
    const price =  this.fb.control(
      this.product?.price || '',
      [Validators.required, Validators.min(PRODUCT_PRICE_MIN)]
    );
    const quantity =  this.fb.control(
      this.product?.quantity || '',
      [Validators.required, Validators.min(PRODUCT_QUANTITY_MIN)]
    );
    this.productForm = this.fb.group({
      _id: this.product?._id || null,
      name, image, brand, description, price, quantity
    });
  }

  action(): void {
    this.actionOutput.emit(this.productForm.value);
  }

  cancel(): void {
    this.cancelOutPut.emit();
  }
}
