import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { catchError, map } from 'rxjs/operators';

import { User } from '../../models/user.model';
import { environment } from '../../../environments/environment';
import { Res } from '../../models/res.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private user$: BehaviorSubject<User> = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient) { }

  get localUser(): User { return this.user$.getValue(); }
  set localUser(next: User) { this.user$.next(next); }

  get localUser$(): Observable<User> { return this.user$.asObservable(); }

  getUser(): Observable<User> {
    return this.http.get<Res<User>>(`${environment.API_URL}/users/me`)
      .pipe(map(res => res.data));
  }

  getUsers(): Observable<User[]> {
    return this.http.get<Res<User[]>>(`${environment.API_URL}/users/all`)
      .pipe(map(res => res.data));
  }

  createUser(user: User): Observable<User> {
    return this.http.post<Res<User>>(`${environment.API_URL}/users`, user)
      .pipe(
        map(res => res.data),
        catchError(err => throwError(`failed to create: ${err.error.message || err.message}`))
      );
  }

  updateUser(id: string, user: User): Observable<User> {
    return this.http.put<Res<User>>(`${environment.API_URL}/users/${id}`, user)
      .pipe(
        map(res => res.data),
        catchError(err => throwError(`failed to update: ${err.error.message || err.message}`))
      );
  }

  deleteUser(id: string): Observable<User> {
    return this.http.delete<Res<User>>(`${environment.API_URL}/users/${id}`)
      .pipe(map(res => res.data));
  }
}
