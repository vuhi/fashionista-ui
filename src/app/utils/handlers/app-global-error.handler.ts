import { ErrorHandler, Inject, Injectable, Injector, NgZone } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AppGlobalErrorHandler implements ErrorHandler {
  constructor(
    @Inject(NgZone) private ngZone: NgZone,
    @Inject(Injector) private injector: Injector
  ) {}

  private get toastr(): ToastrService { return this.injector.get(ToastrService); }

  handleError(error: any): void {
    this.ngZone.run(() => {
      console.log(error);
      let message;
      error = error.rejection ? error.rejection : error; // handle uncaught error in promise
      if (error instanceof HttpErrorResponse) {
        message =  error.error.message || error.message;
      } else {
        message = error instanceof Error ? error.message : `unknown error caught: ${error.toString()}`;
      }
      this.toastr.error(message, 'Error');
    });
  }
}



