import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { catchError, map } from "rxjs/operators";

import { Res } from "../../models/res.model";
import { User } from "../../models/user.model";
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  storeToken(token: string): void {
    try {
      const index = Math.floor((Math.random() * 20) + 1);
      const encrypted = btoa([token.slice(0, index), environment.RANDOM_TEXT, token.slice(index)].join(''));
      localStorage.setItem(environment.TOKEN_KEY, encrypted);
    } catch (e) {
      throw new Error(`error occurred while storing token: ${e.toString()}`);
    }
  }

  getToken(): string {
    const encrypted = localStorage.getItem(environment.TOKEN_KEY);
    if (encrypted) {
      try {
        const decrypted = atob(encrypted);
        const index = decrypted.indexOf(environment.RANDOM_TEXT);
        return decrypted.slice(0, index) + decrypted.slice(index + environment.RANDOM_TEXT.length);
      } catch (e) {
        this.removeToken();
        return null;
      }
    }
  }

  removeToken(): void {
    localStorage.clear();
  }

  login(credential: { identify: string, password: string }): Observable<{ token: string }> {
    return this.http.post<Res<{ token: string }>>(`${environment.API_URL}/auth/login`, credential)
      .pipe(
        map(res => res.data),
        catchError(err => throwError(`failed to sign in: invalid credential`))
      );
  }

  register(user: User): Observable<{ token: string }> {
    return this.http.post<Res<{ token: string }>>(`${environment.API_URL}/auth/register`, user)
      .pipe(
        map(res  => res.data),
        catchError(err => throwError(`failed to register user: ${err?.error?.message}`))
      );
  }
}
