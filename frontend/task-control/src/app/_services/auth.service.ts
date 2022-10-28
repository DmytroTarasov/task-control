import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, throwError, catchError, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new BehaviorSubject<User | null>(null);
  token = new BehaviorSubject<string | null>(null);

  constructor(private http: HttpClient, private router: Router) {}

  register(email: string, username: string, password: string) {
    return this.http
      .post(`${environment.serverUrl}/auth/register`, {
        email,
        password,
        username,
      })
      .pipe(
        catchError((errorRes: HttpErrorResponse) =>
          throwError(() => new Error(errorRes?.error?.message))
        )
      );
  }

  login(email: string, password: string) {
    return this.http
      .post<User>(`${environment.serverUrl}/auth/login`, {
        email,
        password,
      })
      .pipe(
        catchError(errorRes => throwError(() => new Error(errorRes?.error?.message))),
        tap((responseData) => {
          localStorage.setItem('userData', JSON.stringify(responseData));
          this.user.next(responseData);
        })
      );
  }

  autoLogin() {
    const user = JSON.parse(localStorage.getItem('userData')!!);

    if (!user || !user.token) {
      return;
    }

    const loadedUser = new User(
      user.email,
      user.username,
      user.created_date,
      user.token
    );

    this.user.next(loadedUser);
  }

  logout() {
    localStorage.removeItem('userData');
    this.user.next(null);
    this.router.navigate(['/auth']);
  }
}
