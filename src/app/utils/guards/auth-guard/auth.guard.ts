import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  CanActivateChild,
  Router
} from '@angular/router';

import { Observable } from 'rxjs';
import { map, tap } from "rxjs/operators";

import { UserService } from "../../../services/user-service/user.service";
import { AuthService } from "../../../services/auth-service/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(
    private router: Router,
    private userService: UserService,
    private authService: AuthService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return false;

    // const token = this.authService.getToken();
    // const user = this.userService.localUser;
    //
    // if (!token) {
    //   return this.router.parseUrl('/auth/login');
    // }
    //
    // return user ? true : this.userService.getUser().pipe(
    //   tap(res => this.userService.localUser = res ),
    //   map(res =>  true )
    // );
  }

  // tslint:disable-next-line:max-line-length
  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token = this.authService.getToken();
    const user = this.userService.localUser;

    if (!token) {
      return this.router.parseUrl('/auth/login');
    }

    return user ? true : this.userService.getUser().pipe(
      tap(res => this.userService.localUser = res ),
      map(res =>  true )
    );
  }
}
