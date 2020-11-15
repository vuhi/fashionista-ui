import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { faUserEdit } from '@fortawesome/free-solid-svg-icons';

import { User } from '../../../../models/user.model';
import { UserService } from '../../../../services/user-service/user.service';
import { ButtonConfig, FormMode } from '../../../../models/form.config';

@Component({
  selector: 'app-edit-user-modal',
  templateUrl: './edit-user-modal.component.html',
  styleUrls: ['./edit-user-modal.component.scss']
})
export class EditUserModalComponent implements OnInit {

  readonly faUserEdit = faUserEdit;
  buttonConfig: ButtonConfig = {
    action: { color: 'ui-primary', text: 'Save' },
    cancel: { color: 'ui-warning', text: 'Cancel' }
  };
  mode = FormMode.EDIT;
  error = '';

  constructor(
    private dialogRef: MatDialogRef<EditUserModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { user: User },
    private userService: UserService
  ) {}

  ngOnInit(): void {
  }

  editUser(user: User): void {
    this.userService.updateUser(this.data.user._id, user).subscribe(
      res => this.dialogRef.close(res),
      error => this.error = error
    );
  }

  cancel(): void {
    this.dialogRef.close(null);
  }
}
