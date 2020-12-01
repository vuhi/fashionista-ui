import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PopInSlitOut } from '../../utils/animations/pop-in-slit-out.animation';
import { UserService } from '../../services/user-service/user.service';
import { User } from '../../models/user.model';
import { ADMIN } from '../../utils/configs/app-constant';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
  animations: [PopInSlitOut]
})
export class NavBarComponent implements OnInit, OnDestroy {

  readonly ADMIN = ADMIN;
  user: User;
  cartItems = 0;
  private readonly unsubscribe = new Subject<void>();

  constructor(
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.userService.localUser$
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(res => {
        this.user = res;
        this.cartItems = this.user?.cart?.items
          .map(i => i.quantity)
          .reduce((acc, current) => acc + current, 0);
      });
  }

  signOut(): void {
    this.router.navigate(['/', 'auth']).then();
  }

  showCart(): void {
    // this.cartItems++;
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
