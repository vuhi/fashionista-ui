import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { AuthService } from "../../services/auth-service/auth.service";

@Injectable()
export class Interceptor implements HttpInterceptor  {

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();
    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `bearer ${token}`
        }
      });
    }

    req = req.clone({
      setHeaders: {
        'Content-Type': 'application/json',
        Accept : 'application/json'
      }
    });

    return next.handle(req).pipe(
      retry(environment.production ? 1 : 0),
      catchError((error: any) => {
        let message;
        if (error instanceof HttpErrorResponse) {
          switch (true) {
            case error.status === 0:
              message = `${error.statusText}: No response from endpoint. It might be a connectivity problem.`;
              return throwError(error);
            case error.status === 401 || error.status === 403:
              if (!req.url.includes('api/auth/login')) {
                this.authService.removeToken();
                message = 'Session is either invalid or expired!';
                this.router.navigate(
                  [ '/', 'error' ],
                  {queryParams: {status: error.status, title: 'Unauthorized', message}}
                ).then();
              }
              return throwError(error);
            default:
              return throwError(error);
          }
        }
      }));
  }
}
