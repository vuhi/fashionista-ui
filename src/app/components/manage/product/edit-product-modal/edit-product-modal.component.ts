import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { faUserEdit } from '@fortawesome/free-solid-svg-icons';

import { ButtonConfig, FormMode } from '../../../../models/form.config';
import { ProductService } from '../../../../services/product-service/product.service';
import { Product } from '../../../../models/product.model';

@Component({
  selector: 'app-edit-product-modal',
  templateUrl: './edit-product-modal.component.html',
  styleUrls: ['./edit-product-modal.component.scss']
})
export class EditProductModalComponent implements OnInit {

  readonly faUserEdit = faUserEdit;
  buttonConfig: ButtonConfig = {
    action: { color: 'ui-primary', text: 'Save' },
    cancel: { color: 'ui-warning', text: 'Cancel' }
  };
  mode = FormMode.EDIT;
  error = '';

  constructor(
    private dialogRef: MatDialogRef<EditProductModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { product: Product },
    private productService: ProductService
  ) {}

  ngOnInit(): void {
  }

  editProduct(product: Product): void {
    this.productService.updateProduct(this.data.product._id, product).subscribe(
      res => this.dialogRef.close(res),
      error => this.error = error
    );
  }

  cancel(): void {
    this.dialogRef.close(null);
  }
}
