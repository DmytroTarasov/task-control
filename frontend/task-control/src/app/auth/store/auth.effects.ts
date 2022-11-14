import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { User } from 'src/app/_models/user.model';
import { AuthService } from 'src/app/_services/auth.service';

import * as AuthActions from './auth.actions';

@Injectable()
export class AuthEffects {
  authLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      switchMap((action) => {
        return this.authService.login(action.email, action.password).pipe(
          map((user) => {
            localStorage.setItem('userData', JSON.stringify(user));
            return AuthActions.authenticateSuccess({
              user,
              redirect: true,
            });
          }),
          catchError((errorRes) => {
            return of(
              AuthActions.authenticateFail({
                error: errorRes?.error?.message,
              })
            );
          })
        );
      })
    )
  );

  authRedirect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.authenticateSuccess),
        tap((action) => {
          if (action.redirect) {
            this.router.navigateByUrl('/boards');
          }
        })
      ),
    { dispatch: false }
  );

  authSignup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signup),
      switchMap((action) => {
        return this.authService
          .signup(action.email, action.username, action.password)
          .pipe(
            map((resData) => {
              return AuthActions.signupSuccess({ message: resData.message });
            }),
            catchError((errorRes) => {
              return of(
                AuthActions.authenticateFail({
                  error: errorRes?.error?.message,
                })
              );
            })
          );
      })
    )
  );

  autoLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.autoLogin),
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
          return AuthActions.authenticateSuccess({
            user: loadedUser,
            redirect: false,
          });
        }
        return { type: 'NOTHING' };
      })
    )
  );

  authLogout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logout),
        tap(() => {
          localStorage.removeItem('userData');
          this.router.navigate(['/auth']);
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}
}
