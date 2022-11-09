import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { MemoizedSelector } from '@ngrx/store';

import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { HeaderComponent } from './header.component';
import { AppState } from '../store/app.reducer';
import * as fromAuth from '../auth/store/auth.reducer';
import { getAuthUser } from '../auth/store/auth.selectors';
import * as AuthActions from '../auth/store/auth.actions';
import { User } from '../_models/user.model';

@Component({
  template: ''
})
class DummyComponent {}

describe('HeaderComponent', () => {
  let fixture: ComponentFixture<HeaderComponent>;
  let component: HeaderComponent;
  let store: MockStore<AppState>;
  let mockUserSelector: MemoizedSelector<fromAuth.State, User>;
  let router: Router;
  let navElement: DebugElement;
  const validUser = new User('bob@test.com', 'Bob', '2022-11-06', 'token');
  const invalidUser = new User('bob@test.com', 'Bob', '2022-11-06', null);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'boards', component: DummyComponent }
        ])
      ],
      declarations: [HeaderComponent, DummyComponent],
      providers: [provideMockStore()]
    });

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    navElement = fixture.debugElement.query(By.css('.nav'));

    mockUserSelector = store.overrideSelector(getAuthUser, validUser);
    fixture.detectChanges();
    spyOn(store, 'dispatch').and.callFake(() => {});
  });

  it('should create the header', () => {
    expect(component).toBeTruthy();
  });

  it('should render the navigation when the user is logged in', () => {
    expect(navElement).toBeDefined();
  });

  it('should go to url /boards', waitForAsync(() => {
    fixture.debugElement.query(By.css('.brand')).nativeElement.click();
    fixture.whenStable().then(() => {
      expect(router.url).toBe('/boards');
    });
  }));

  it('should display a username and go to url /boards', waitForAsync(() => {
    const usernameLink = fixture.debugElement.queryAll(By.css('.nav-link'))[0];
    usernameLink.nativeElement.click();
    fixture.whenStable().then(() => {
      expect(usernameLink.nativeElement.textContent).toBe(validUser.username);
      expect(router.url).toBe('/boards');
    });
  }));

  it('should dispatch a logout action', waitForAsync(() => {
    spyOn(component, 'onLogout').and.callThrough();
    const logoutLink = fixture.debugElement.queryAll(By.css('.nav-link'))[1];
    logoutLink.nativeElement.click();
    fixture.whenStable().then(() => {
      expect(component.onLogout).toHaveBeenCalledTimes(1);
      expect(store.dispatch).toHaveBeenCalledWith(AuthActions.logout());
    });
  }));

  it('should not render the navigation when the user is not logged in', () => {
    mockUserSelector.setResult(invalidUser);
    store.refreshState();
    expect(navElement).toBeNull();
  });
});
