import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { Router } from '@angular/router';
import { TestBed } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';
import { AppState } from '../store/app.reducer';

import { getAuthUser } from '../auth/store/auth.selectors';
import { User } from '../_models/user.model';
import * as fromAuth from '../auth/store/auth.reducer';
import { MemoizedSelector } from '@ngrx/store';

describe('Auth Guard', () => {
  let guard: AuthGuard;
  let routeMock: any = { snapshot: {} };
  let routeStateMock: any = { snapshot: {}, url: '/auth' };
  let routerMock = { createUrlTree: jasmine.createSpy('createUrlTree') };
  let mockUserSelector: MemoizedSelector<fromAuth.State, User>;
  let store: MockStore<AppState>;
  const validUser = new User('bob@test.com', 'Bob', '2022-11-06', 'token');
  const invalidUser = new User('bob@test.com', 'Bob', '2022-11-06', null);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockStore(),
        AuthGuard,
        { provide: Router, useValue: routerMock }
      ]
    });

    guard = TestBed.inject(AuthGuard);
    store = TestBed.inject(MockStore);

    mockUserSelector = store.overrideSelector(getAuthUser, validUser);
  });

  afterEach(() => {
    store.complete(); // kill subscriptions
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow an unauthenticated user to reach the route', () => {
    guard.canActivate(routeMock, routeStateMock).subscribe(value => {
      expect(value).toBeTruthy();
    });
  });

  it('should redirect an unauthenticated user to auth route', () => {
    mockUserSelector.setResult(invalidUser);
    store.refreshState();
    guard.canActivate(routeMock, routeStateMock).subscribe(() => {
      expect(routerMock.createUrlTree).toHaveBeenCalledWith(['/auth']);
    });
  });
});
