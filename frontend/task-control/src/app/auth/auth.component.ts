import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import * as fromApp from '../store/app.reducer';
import { select, Store } from '@ngrx/store';
import * as AuthActions from '../auth/store/auth.actions';
import { getAuthError, getAuthMessage } from '../auth/store/auth.selectors';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  isLoginMode = false;
  authForm: FormGroup;

  authError$: Observable<string>;
  authMessage$: Observable<string>;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.authForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
    this.handleUsernameControl();

    this.authError$ = this.store.pipe(select(getAuthError));
    this.authMessage$ = this.store.pipe(select(getAuthMessage));
  }

  onSwitchMode() {
    this.store.dispatch(AuthActions.clearError());
    this.store.dispatch(AuthActions.clearRegisterMessage());
    this.isLoginMode = !this.isLoginMode;
    this.handleUsernameControl();
  }

  onSubmit() {
    if (!this.authForm.valid) {
      return;
    }

    const { email, username, password } = this.authForm.value;

    if (this.isLoginMode) {
      this.store.dispatch(AuthActions.login({ email, password }));
    } else {
      this.store.dispatch(AuthActions.signup({ email, password, username }));
    }
  }

  private handleUsernameControl() {
    if (!this.isLoginMode) {
      this.authForm.addControl(
        'username',
        new FormControl('', [Validators.required])
      );
    } else {
      this.authForm.removeControl('username');
    }
  }
}
