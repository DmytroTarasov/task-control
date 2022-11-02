import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { User } from 'src/app/_models/user.model';
import { environment } from 'src/environments/environment';

import * as AuthActions from './auth.actions';

@Injectable()
export class AuthEffects {
  // +
  @Effect()
  authLogin = this.actions$.pipe(
    ofType(AuthActions.LOGIN),
    switchMap((authData: AuthActions.Login) => {
      return this.http
        .post<User>(`${environment.serverUrl}/auth/login`, {
          email: authData.payload.email,
          password: authData.payload.password,
        })
        .pipe(
          map((user) => {
            localStorage.setItem('userData', JSON.stringify(user));
            return new AuthActions.AuthenticateSuccess(user);
          }),
          catchError((errorRes) => {
            return of(
              new AuthActions.AuthenticateFail(errorRes?.error?.message)
            );
          })
        );
    })
  );

  // +
  @Effect({ dispatch: false })
  authRedirect = this.actions$.pipe(
    ofType(AuthActions.AUTHENTICATE_SUCCESS),
    tap((authSuccessAction: AuthActions.AuthenticateSuccess) => {
      this.router.navigateByUrl('/boards');
    })
  );

  @Effect()
  authSignup = this.actions$.pipe(
    ofType(AuthActions.SIGNUP),
    switchMap((signupAction: AuthActions.Signup) => {
      return this.http
        .post<{ message: string }>(`${environment.serverUrl}/auth/register`, {
          email: signupAction.payload.email,
          password: signupAction.payload.password,
          username: signupAction.payload.username,
        })
        .pipe(
          map((resData) => {
            return new AuthActions.SignupSuccess(resData.message);
          }),
          catchError((errorRes) => {
            return of(
              new AuthActions.AuthenticateFail(errorRes?.error?.message)
            );
          })
        );
    })
  );

  // +
  @Effect()
  autoLogin = this.actions$.pipe(
    ofType(AuthActions.AUTO_LOGIN),
    map(() => {
      const userData = JSON.parse(localStorage.getItem('userData'));

      if (!userData) {
        return { type: 'NOTHING' };
      }

      const loadedUser = new User(
        userData.email,
        userData.username,
        userData.created_date,
        userData.token
      );

      if (loadedUser.token) {
        return new AuthActions.AuthenticateSuccess(loadedUser);
      }

      return { type: 'NOTHING' };
    })
  );

  // +
  @Effect({ dispatch: false })
  logout = this.actions$.pipe(
    ofType(AuthActions.LOGOUT),
    tap(() => {
      localStorage.removeItem('userData');
      this.router.navigate(['/auth']);
    })
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router
  ) {}
}
