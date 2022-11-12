import { TestBed, waitForAsync } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';

import { AppState } from '../../store/app.reducer';
import * as AuthActions from './auth.actions';
import { AuthService } from 'src/app/_services/auth.service';
import { AuthEffects } from './auth.effects';
import { initialState } from './auth.reducer';
import { User } from 'src/app/_models/user.model';

describe('AuthEffects', () => {
  let actions$: Observable<any>;
  let effects: AuthEffects;
  let service;
  let store: MockStore<AppState>;
  let router: Router;
  const user = new User('bob@test.com', 'Bob', '2022-11-06', 'token');

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthEffects,
        provideMockActions(() => actions$),
        provideMockStore({ initialState }),
        {
          provide: AuthService,
          useValue: jasmine.createSpyObj('AuthService', ['login', 'signup']),
        },
        {
          provide: Router,
          useValue: jasmine.createSpyObj('Router', ['navigateByUrl', 'navigate'])
        }
      ],
    });

    effects = TestBed.inject(AuthEffects);
    service = TestBed.inject(AuthService);
    store = TestBed.inject(MockStore);
    router = TestBed.inject(Router);
  });

  it('should be constructed', () => {
    expect(effects).toBeTruthy();
  });

  describe('authLogin', () => {
    it('should return authenticateSuccess action with user on success', waitForAsync(() => {
      const spy = spyOn(localStorage, 'setItem').and.callFake(() => {});
      service.login.and.returnValue(of(user));
      actions$ = of(AuthActions.login);
      effects.authLogin$.subscribe((res) => {
        expect(spy).toHaveBeenCalled();
        expect(res).toEqual(AuthActions.authenticateSuccess({ user, redirect: true }));
        expect(service.login).toHaveBeenCalledTimes(1);
      });
    }));

    it('should return authenticateFail action with error on failure', waitForAsync(() => {
      const error = 'Invalid creds';
      service.login.and.returnValue(throwError(() => new HttpErrorResponse({ error: { message: error }})));
      actions$ = of(AuthActions.login);
      effects.authLogin$.subscribe((res) => {
        expect(res).toEqual(AuthActions.authenticateFail({ error }));
        expect(service.login).toHaveBeenCalledTimes(1);
      });
    }));
  });

  describe('authRedirect', () => {
    it('should redirect after authenticateSuccess action with redirect value set to true ', waitForAsync(() => {
      actions$ = of(AuthActions.authenticateSuccess({ user, redirect: true }));
      effects.authRedirect$.subscribe((res) => {
        expect(router.navigateByUrl).toHaveBeenCalled();
      });
    }));

    it('should not redirect after authenticateSuccess action with redirect value set to false ', waitForAsync(() => {
      actions$ = of(AuthActions.authenticateSuccess({ user, redirect: false }));
      effects.authRedirect$.subscribe((res) => {
        expect(router.navigateByUrl).toHaveBeenCalledTimes(0);
      });
    }));
  });

  describe('authSignup', () => {
    it('should return signupSuccess action with register message on success', waitForAsync(() => {
      const message = 'Profile was created successfully';
      service.signup.and.returnValue(of({ message }));
      actions$ = of(AuthActions.signup);
      effects.authSignup$.subscribe((res) => {
        expect(res).toEqual(AuthActions.signupSuccess({ message }));
        expect(service.signup).toHaveBeenCalledTimes(1);
      });
    }));

    it('should return authenticateFail action with error on failure', waitForAsync(() => {
      const error = 'Dummy error';
      service.signup.and.returnValue(throwError(() => new HttpErrorResponse({ error: { message: error }})));
      actions$ = of(AuthActions.signup);
      effects.authSignup$.subscribe((res) => {
        expect(res).toEqual(AuthActions.authenticateFail({ error }));
        expect(service.signup).toHaveBeenCalledTimes(1);
      });
    }));
  });

  describe('autoLogin', () => {
    it('should return authenticateSuccess action with user if the user is present in localStorage', waitForAsync(() => {
      const spy = spyOn(localStorage, 'getItem').and.callFake(() => JSON.stringify(user));
      actions$ = of(AuthActions.autoLogin);
      effects.autoLogin$.subscribe((res) => {
        expect(spy).toHaveBeenCalledTimes(1);
        expect(res).toEqual(AuthActions.authenticateSuccess({ user, redirect: false }));
      });
    }));

    it('should return action with type nothing if the user is not present in localStorage', waitForAsync(() => {
      const spy = spyOn(localStorage, 'getItem').and.callFake(() => null);
      actions$ = of(AuthActions.autoLogin);
      effects.autoLogin$.subscribe((res) => {
        expect(spy).toHaveBeenCalledTimes(1);
        expect(res).toEqual({ type: 'NOTHING' });
      });
    }));

    it('should return action with type nothing if the user token is not present in localStorage', waitForAsync(() => {
      const spy = spyOn(localStorage, 'getItem').and.callFake(() => JSON.stringify({ ...user, token: null }));
      actions$ = of(AuthActions.autoLogin);
      effects.autoLogin$.subscribe((res) => {
        expect(spy).toHaveBeenCalledTimes(1);
        expect(res).toEqual({ type: 'NOTHING' });
      });
    }));
  });

  describe('authLogout', () => {
    it('should remove user from localStorage and redirect after logout action', waitForAsync(() => {
      const spy = spyOn(localStorage, 'removeItem').and.callFake(() => {});
      actions$ = of(AuthActions.logout());
      effects.authLogout$.subscribe((res) => {
        expect(spy).toHaveBeenCalled();
        expect(router.navigate).toHaveBeenCalled();
      });
    }));
  });
});
