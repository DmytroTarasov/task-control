import { provideMockStore, MockStore } from '@ngrx/store/testing';
import {
  TestBed,
  ComponentFixture,
  waitForAsync
} from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { AppState } from '../store/app.reducer';
import { AuthComponent } from './auth.component';
import { TextInputComponent } from '../shared/_forms/text-input/text-input.component';

import * as fromAuth from '../auth/store/auth.reducer';
import { getAuthError, getAuthMessage } from '../auth/store/auth.selectors';
import * as AuthActions from '../auth/store/auth.actions';
import { MemoizedSelector } from '@ngrx/store';

describe('AuthComponent', () => {
  let fixture: ComponentFixture<AuthComponent>;
  let component: AuthComponent;
  let store: MockStore<AppState>;
  let mockAuthErrorSelector: MemoizedSelector<fromAuth.State, string>;
  let mockAuthMessageSelector: MemoizedSelector<fromAuth.State, string>;
  const querySubmitButton = () =>
    fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement;
  const querySwitchModeButton = () =>
    fixture.debugElement.query(By.css('button[type="button"]')).nativeElement;
  const queryAuthForm = () =>
    fixture.debugElement.query(By.css('.auth-form')).nativeElement;
  const queryInput = (idx: number) =>
    fixture.debugElement.queryAll(By.css('input'))[idx].nativeElement;
  const fillAuthForm = (email: string, password: string, username?: string) => {
    component.authForm.get('email').setValue(email);
    component.authForm.get('password').setValue(password);
    if (username) {
      component.authForm.get('username').setValue(username);
    }
    fixture.detectChanges();
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideMockStore()],
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      declarations: [AuthComponent, TextInputComponent]
    });

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;

    mockAuthErrorSelector = store.overrideSelector(getAuthError, '');
    mockAuthMessageSelector = store.overrideSelector(getAuthMessage, '');

    fixture.detectChanges();
    spyOn(store, 'dispatch').and.callFake(() => {});
  });

  it('number of rendered inputs in UI should equal to 3 if loginMode is set to false', () => {
    // component.ngOnInit();
    const inputElements = queryAuthForm().querySelectorAll('input');
    expect(inputElements.length).toEqual(3);
  });

  it('initial form values should be empty', () => {
    const authFormValues = {
      email: '',
      password: '',
      username: '',
    };
    expect(component.authForm.value).toEqual(authFormValues);
  });

  it('email input should have required error if it was blured but not filled', waitForAsync(() => {
    const emailInput = queryInput(0);
    emailInput.value = '';
    emailInput.dispatchEvent(new Event('blur'));
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const emailValueFromGroup = component.authForm.get('email');
      expect(emailValueFromGroup.errors?.required).toBeTruthy();
    });
  }));

  it('email input should have pattern error if it was typed in a wrong format', waitForAsync(() => {
    const emailInput = queryInput(0);
    emailInput.value = 'someemailtest.com';
    emailInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const emailValueFromGroup = component.authForm.get('email');
      expect(emailValueFromGroup.errors?.pattern).toBeTruthy();
    });
  }));

  it('password input should have minlength error if its length is less than 6', waitForAsync(() => {
    const passwordInput = queryInput(2);
    passwordInput.value = '11111';
    passwordInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const passwordValueFromGroup = component.authForm.get('password');
      expect(passwordValueFromGroup.errors?.minlength).toBeTruthy();
    });
  }));

  it('should change the loginMode, number of form controls and dispatch two actions', waitForAsync(() => {
    // switchModeButton.dispatchEvent(new Event('click'));
    querySwitchModeButton().click();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const inputElements = fixture.debugElement.nativeElement.querySelectorAll('input');
      expect(component.isLoginMode).toBeTruthy();
      expect(inputElements.length).toEqual(2);
      expect(store.dispatch).toHaveBeenCalledWith(AuthActions.clearError());
      expect(store.dispatch).toHaveBeenCalledWith(AuthActions.clearRegisterMessage());
    });
  }));

  it('should display an error if invalid creds were provided in login', () => {
    const error = 'Invalid creds';
    mockAuthErrorSelector.setResult(error);
    store.refreshState();
    fixture.detectChanges();
    const errorParagraphContent = fixture.debugElement.query(By.css('.text-danger')).nativeElement.textContent;
    // component.authError$.subscribe(error => expect(error).toEqual(errorMessage));
    expect(errorParagraphContent).toEqual(error);
  });

  it('it should display a message if user successfully registered', () => {
    const message = 'Profile was created successfully';
    mockAuthMessageSelector.setResult(message);
    store.refreshState();
    fixture.detectChanges();
    const messageParagraphContent = fixture.debugElement.query(By.css('.text-success')).nativeElement.textContent;
    expect(messageParagraphContent).toEqual(message);
  });

  it('should make the form not-valid', waitForAsync(() => {
    querySwitchModeButton().click();
    fillAuthForm('bob@test.com', '');

    fixture.whenStable().then(() => {
      expect(component.authForm.valid).toBeFalsy();
    });
  }));

  it('should dispatch a signup action', waitForAsync(() => {
    fillAuthForm('bob@test.com', '1111111', 'Bob');
    querySubmitButton().click();
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(component.authForm.valid).toBeTruthy();
      expect(store.dispatch).toHaveBeenCalledWith(AuthActions.signup({ ...component.authForm.value }));
    });
  }));

  it('should dispatch a login action', waitForAsync(() => {
    querySwitchModeButton().click();
    fillAuthForm('bob@test.com', '1111111');
    querySubmitButton().click();
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(component.authForm.valid).toBeTruthy();
      expect(store.dispatch).toHaveBeenCalledWith(AuthActions.login({ ...component.authForm.value }));
    });
  }));
});
