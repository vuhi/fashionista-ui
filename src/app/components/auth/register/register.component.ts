import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { EnterExitLeft } from '../../../utils/animations/enter-exit-left.animation';
import { AuthService } from '../../../services/auth-service/auth.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { User } from '../../../models/user.model';
import { ButtonConfig, FormMode } from '../../../models/form.config';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  animations: [EnterExitLeft]
})
export class RegisterComponent implements OnInit, OnDestroy {

  mode = FormMode.REGISTER;
  buttonConfig: ButtonConfig = { action: { color: 'ui-warning', text: 'Sign Up' } };
  error = '';
  private readonly unsubscribe = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  register(user: User): void {
    this.authService.register(user)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(
      (res) => {
        this.authService.storeToken(res.token);
        this.router.navigate(['/', 'home']).then();
      },
      err => this.error = err
    );
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
