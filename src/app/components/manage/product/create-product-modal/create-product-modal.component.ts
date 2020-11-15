import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

import { faUserPlus } from '@fortawesome/free-solid-svg-icons';

import { ButtonConfig, FormMode } from '../../../../models/form.config';
import { Product } from '../../../../models/product.model';
import { ProductService } from '../../../../services/product-service/product.service';

@Component({
  selector: 'app-create-product-modal',
  templateUrl: './create-product-modal.component.html',
  styleUrls: ['./create-product-modal.component.scss']
})
export class CreateProductModalComponent implements OnInit {

  readonly faUserPlus = faUserPlus;
  buttonConfig: ButtonConfig = {
    action: { color: 'ui-success', text: 'Create' },
    cancel: { color: 'ui-warning', text: 'Cancel' }
  };
  mode = FormMode.CREATE;
  error = '';

  constructor(
    private dialogRef: MatDialogRef<CreateProductModalComponent>,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
  }

  createProduct(product: Product): void {
    this.productService.createProduct(product).subscribe(
      res => this.dialogRef.close(res),
      error => this.error = error
    );
  }

  cancel(): void {
    this.dialogRef.close(null);
  }
}
