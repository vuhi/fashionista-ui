import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';

import { of, Subject } from 'rxjs';
import { switchMap, takeUntil, tap } from 'rxjs/operators';

import { UserService } from '../../../services/user-service/user.service';
import { User, UserKeys } from '../../../models/user.model';
import { ConfirmModalComponent } from '../../share/confirm-modal/confirm-modal.component';
import { ToastrService } from 'ngx-toastr';
import { EditUserModalComponent } from './edit-user-modal/edit-user-modal.component';
import { CreateUserModalComponent } from './create-user-modal/create-user-modal.component';
import { FadeInFWD } from '../../../utils/animations/fade-in-fwd.animation';
import { FormMode } from '../../../models/form.config';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  animations: [FadeInFWD]
})
export class UserComponent implements OnInit, OnDestroy, AfterViewInit  {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayProperties: string[] = [];
  displayedColumns: string[] = [];
  dataSource: MatTableDataSource<User> = new MatTableDataSource<User>([]);
  private readonly unsubscribe = new Subject<void>();

  constructor(
    private dialog: MatDialog,
    private toastr: ToastrService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.userService.getUsers()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(res => {
        this.dataSource.data = res;
        this.displayProperties = UserKeys.filter(prop => !['_id', 'password'].includes(prop));
        this.displayedColumns = ['#', ...this.displayProperties, 'actions'];
      });
  }

  deleteUser(id: string): void {
    const confirmModal = this.dialog.open(ConfirmModalComponent, {
      data: { title: `Delete user`, msg: 'Are you sure, it will be delete?' }
    });

    confirmModal.afterClosed().pipe(
      switchMap(res => res ?
        this.userService.deleteUser(id).pipe(
          tap(user => {
            this.toastr.success('User has been deleted', 'Deleted');
            this.dataSource.data = this.dataSource.data.filter(u => u._id !== user._id);
          })
        ) :
        of(null))
      )
      .subscribe();
  }

  openEditUserModal(user): void {
    const editUserModal = this.dialog.open(EditUserModalComponent, {
      width: '500px', autoFocus: false,
      data: { user, mode: FormMode.EDIT, title: 'Edit User' }
    });

    editUserModal.afterClosed().subscribe(res => {
      if (res) {
        this.toastr.success('User has been updated', 'Updated');
        const index = this.dataSource.data.findIndex(u => u._id === user._id);
        this.dataSource.data[index] = res;
        this.dataSource.data = [...this.dataSource.data];
      }
    });
  }

  openCreateUserModal(): void {
    const createUserModal = this.dialog.open(CreateUserModalComponent, {
      width: '500px', autoFocus: false,
      data: { mode: FormMode.CREATE, title: 'Create User' }
    });

    createUserModal.afterClosed().subscribe(res => {
      if (res) {
        console.log(res);
        this.toastr.success('User has been created', 'Created');
        this.dataSource.data.push(res);
        this.dataSource.data = [...this.dataSource.data];
      }
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
