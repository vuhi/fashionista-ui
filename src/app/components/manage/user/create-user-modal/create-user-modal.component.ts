import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

import { faUserPlus } from '@fortawesome/free-solid-svg-icons';

import { User } from '../../../../models/user.model';
import { UserService } from '../../../../services/user-service/user.service';
import { ButtonConfig, FormMode } from '../../../../models/form.config';

@Component({
  selector: 'app-create-user-modal',
  templateUrl: './create-user-modal.component.html',
  styleUrls: ['./create-user-modal.component.scss']
})
export class CreateUserModalComponent implements OnInit {

  readonly faUserPlus = faUserPlus;
  buttonConfig: ButtonConfig = {
    action: { color: 'ui-success', text: 'Create' },
    cancel: { color: 'ui-warning', text: 'Cancel' }
  };
  mode = FormMode.CREATE;
  error = '';

  constructor(
    private dialogRef: MatDialogRef<CreateUserModalComponent>,
    private userService: UserService
  ) { }

  ngOnInit(): void {
  }

  createUser(user: User): void {
    this.userService.createUser(user).subscribe(
      res => this.dialogRef.close(res),
      error => this.error = error
    );
  }

  cancel(): void {
    this.dialogRef.close(null);
  }
}
