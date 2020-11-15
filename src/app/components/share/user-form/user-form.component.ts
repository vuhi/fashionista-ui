import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { faKey } from '@fortawesome/free-solid-svg-icons';

import {
  ROLES,
  USER_EMAIL_MAX_LEN,
  USER_EMAIL_REG,
  USER_FN_MAX_LEN,
  USER_LN_MAX_LEN,
  USER_PASSWORD_REG,
  USER_PW_MIN_LEN
} from '../../../utils/configs/app-constant';
import { MustMatch } from '../../../utils/validators/must-match.validator';
import { EnterExitLeft } from '../../../utils/animations/enter-exit-left.animation';
import { FadeSlideInOut } from '../../../utils/animations/fide-slidin-out.animation';
import { ExpandCollapse } from '../../../utils/animations/expand-collapse.animation';

import { User } from '../../../models/user.model';
import { ButtonConfig, FormMode } from '../../../models/form.config';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
  animations: [EnterExitLeft, FadeSlideInOut, ExpandCollapse]
})
export class UserFormComponent implements OnInit {

  @Input('mode') mode: FormMode;
  @Input('error') error = '';
  @Input('user') user: User;
  @Input('buttonConfig') buttonConfig: ButtonConfig;

  @Output('actionOutput') actionOutput: EventEmitter<any> = new EventEmitter<any>();
  @Output('cancelOutPut') cancelOutPut: EventEmitter<any> = new EventEmitter<any>();

  readonly USER_EMAIL_MAX_LEN = USER_EMAIL_MAX_LEN;
  readonly USER_FN_MAX_LEN = USER_FN_MAX_LEN;
  readonly USER_LN_MAX_LEN = USER_LN_MAX_LEN;
  readonly USER_PW_MIN_LEN = USER_PW_MIN_LEN;
  readonly passwordHintError = `Minimum ${USER_PW_MIN_LEN} characters and must contain letter, number, special character (@$!%*#?&)`;
  readonly REGISTER = FormMode.REGISTER;
  readonly EDIT = FormMode.EDIT;
  readonly CREATE = FormMode.CREATE;
  readonly faKey = faKey;
  userForm: FormGroup;
  enablePW = true;
  hidePW = true;
  hideConfirmPW = true;
  roles = ROLES;

  constructor(
    private fb: FormBuilder,
    // private dialogRef: MatDialogRef<UserFormComponent>,
    // @Inject(MAT_DIALOG_DATA) private data: { user: User, mode: UserFormMode, title: string },
  ) { }

  get firstName(): AbstractControl { return this.userForm.get('firstName'); }
  get lastName(): AbstractControl { return this.userForm.get('lastName'); }
  get email(): AbstractControl { return this.userForm.get('email'); }
  get password(): AbstractControl { return this.enablePW ? this.userForm.get('password') : null; }
  get confirmPassword(): AbstractControl { return this.enablePW ? this.userForm.get('confirmPassword') : null; }
  get role(): AbstractControl { return this.enablePW ? this.userForm.get('role') : null; }
  get isDisable(): boolean { return this.mode === this.EDIT ? this.userForm.invalid || !this.userForm.touched : this.userForm.invalid; }

  ngOnInit(): void {
    const firstName = this.fb.control(this.user?.firstName || '', [Validators.required, Validators.maxLength(USER_FN_MAX_LEN)]);
    const lastName = this.fb.control(this.user?.lastName || '', [Validators.required, Validators.maxLength(USER_LN_MAX_LEN)]);
    const email = this.fb.control(this.user?.email || '', [
      Validators.required, Validators.maxLength(USER_EMAIL_MAX_LEN), Validators.pattern(new RegExp(USER_EMAIL_REG))
    ]);
    const password = this.fb.control(this.user?.password || '', [
      Validators.required, Validators.minLength(USER_PW_MIN_LEN), Validators.pattern(new RegExp(USER_PASSWORD_REG))
    ]);
    const confirmPassword =  this.fb.control('', [Validators.required]);
    const role =  this.fb.control('', [Validators.required]);

    switch (this.mode) {
      case FormMode.REGISTER: {
        this.userForm = this.fb.group({
          firstName, lastName, email, password, confirmPassword
        }, { validators: MustMatch('password', 'confirmPassword') });
        break;
      }
      case FormMode.EDIT: {
        this.enablePW = false;
        this.userForm = this.fb.group({
          _id: this.user?._id,
          firstName, lastName, email
        });
        break;
      }
      case FormMode.CREATE: {
        this.userForm = this.fb.group({
          firstName, lastName, email, role, password, confirmPassword
        }, { validators: MustMatch('password', 'confirmPassword') });
        break;
      }
    }
  }

  addPwCtrl(): void {
    const password = this.fb.control('', [
      Validators.required, Validators.minLength(USER_PW_MIN_LEN), Validators.pattern(new RegExp(USER_PASSWORD_REG))
    ]);
    const confirmPassword =  this.fb.control('', [Validators.required]);
    this.userForm.addControl('password', password);
    this.userForm.addControl('confirmPassword', confirmPassword);
    this.userForm.setValidators(MustMatch('password', 'confirmPassword'));
  }

  rmPwCtr(): void {
    this.userForm.clearValidators();
    this.userForm.removeControl('password');
    this.userForm.removeControl('confirmPassword');
  }

  toggleEditPW(): void {
    this.enablePW = !this.enablePW;
    this.enablePW ? this.addPwCtrl() : this.rmPwCtr();
  }

  action(): void {
    this.actionOutput.emit(this.userForm.value);
  }

  cancel(): void {
    this.cancelOutPut.emit();
  }
}

