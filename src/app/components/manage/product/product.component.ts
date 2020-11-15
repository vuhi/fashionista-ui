import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { switchMap, takeUntil, tap } from 'rxjs/operators';
import { of, Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

import { CreateProductModalComponent } from './create-product-modal/create-product-modal.component';
import { ProductService } from '../../../services/product-service/product.service';
import { FormMode } from '../../../models/form.config';
import { Product, ProductKeys } from '../../../models/product.model';
import { EditProductModalComponent } from './edit-product-modal/edit-product-modal.component';
import { ConfirmModalComponent } from '../../share/confirm-modal/confirm-modal.component';
import { FadeInFWD } from '../../../utils/animations/fade-in-fwd.animation';
import { ExpandCollapse, ExpandCollapseWithState } from '../../../utils/animations/expand-collapse.animation';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  animations: [FadeInFWD, ExpandCollapse, ExpandCollapseWithState]
})
export class ProductComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayProperties: string[] = [];
  displayedColumns: string[] = [];
  dataSource: MatTableDataSource<Product> = new MatTableDataSource<Product>([]);
  private readonly unsubscribe = new Subject<void>();
  isExpanded = false;

  constructor(
    private dialog: MatDialog,
    private toastr: ToastrService,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.productService.getDetailProducts()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(res => {
        this.dataSource.data = res;
        this.displayProperties = ProductKeys
          .filter(prop => !['_id', 'image', 'description', 'brand'].includes(prop));
        this.displayedColumns = ['#', ...this.displayProperties, 'actions'];
      });
  }

  openCreateProductModal(): void {
    console.log('called');
    const createProductModal = this.dialog.open(CreateProductModalComponent, {
      width: '600px', autoFocus: false,
      data: { mode: FormMode.CREATE, title: 'Create Product' }
    });

    createProductModal.afterClosed().subscribe(res => {
      if (res) {
        this.toastr.success('Product has been created', 'Created');
        this.dataSource.data.push(res);
        this.dataSource.data = [...this.dataSource.data];
      }
    });
  }

  openEditProductModal(product: Product): void {
    const editProductModal = this.dialog.open(EditProductModalComponent, {
      width: '600px', autoFocus: false,
      data: { product, mode: FormMode.EDIT, title: 'Edit Product' }
    });

    editProductModal.afterClosed().subscribe(res => {
      if (res) {
        this.toastr.success('Product has been updated', 'Updated');
        const index = this.dataSource.data.findIndex(p => p._id === product._id);
        this.dataSource.data[index] = res;
        this.dataSource.data = [...this.dataSource.data];
      }
    });
  }

  deleteProduct(id: string): void {
    const confirmModal = this.dialog.open(ConfirmModalComponent, {
      data: { title: `Delete user`, msg: 'Are you sure, it will be delete?' }
    });

    confirmModal.afterClosed().pipe(
      switchMap(res => res ?
        this.productService.deleteUser(id).pipe(
          tap(user => {
            this.toastr.success('Product has been deleted', 'Deleted');
            this.dataSource.data = this.dataSource.data.filter(p => p._id !== id);
          })
        ) :
        of(null))
    ).subscribe();
  }

  triggerExpand(element: Product): void {
    console.log(element);
    element.expand = !!!element.expand;
    this.isExpanded = !this.isExpanded;
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
