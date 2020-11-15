import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { EnterExitRight } from '../../../utils/animations/enter-exist-right.animation';
import { FadeSlideInOut } from '../../../utils/animations/fide-slidin-out.animation';
import { AuthService } from '../../../services/auth-service/auth.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [EnterExitRight, FadeSlideInOut]
})
export class LoginComponent implements OnInit, OnDestroy {

  signInForm: FormGroup;
  error = '';
  private readonly unsubscribe = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) { }

  get email(): AbstractControl { return this.signInForm.get('email'); }
  get password(): AbstractControl { return this.signInForm.get('password'); }

  ngOnInit(): void {
    this.signInForm = this.fb.group({
      email: this.fb.control('', [Validators.required]),
      password: this.fb.control('', [Validators.required])
    });
  }

  signIn(): void {
    const { email, password } = this.signInForm.value;
    this.authService.login({ identify: email, password })
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
