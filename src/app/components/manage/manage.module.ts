import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageRoutingModule } from './manage-routing.module';
import { ShareModule } from '../share/share.module';
import { UserComponent } from './user/user.component';
import { ProductComponent } from './product/product.component';
import { ManageComponent } from './manage.component';
import { EditUserModalComponent } from './user/edit-user-modal/edit-user-modal.component';
import { CreateUserModalComponent } from './user/create-user-modal/create-user-modal.component';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CreateProductModalComponent } from './product/create-product-modal/create-product-modal.component';
import { EditProductModalComponent } from './product/edit-product-modal/edit-product-modal.component';
import { ProductFormComponent } from './product/product-form/product-form.component';

@NgModule({
  declarations: [
    ManageComponent,
    UserComponent,
    ProductComponent,
    EditUserModalComponent,
    CreateUserModalComponent,
    CreateProductModalComponent,
    EditProductModalComponent,
    ProductFormComponent
  ],
  imports: [
    CommonModule,
    ManageRoutingModule,

    MatTableModule,
    MatPaginatorModule,

    ShareModule
  ]
})
export class ManageModule { }
