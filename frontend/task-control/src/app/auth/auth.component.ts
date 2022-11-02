import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { User } from '../_models/user.model';

import * as fromApp from '../store/app.reducer';
import { Store } from '@ngrx/store';
import * as AuthActions from '../auth/store/auth.actions';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {
  isLoginMode = false;
  authForm!: FormGroup;

  registerMessage = '';
  error = '';
  user: User;
  private storeSub: Subscription;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.authForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
    this.handleUsernameControl();

    this.storeSub = this.store.select('auth').subscribe((authState) => {
      this.error = authState.authError;
      this.user = authState.user;
      this.registerMessage = authState.registerMessage;
    });
  }

  onSwitchMode() {
    this.store.dispatch(new AuthActions.ClearError());
    this.store.dispatch(new AuthActions.ClearRegisterMessage());
    this.isLoginMode = !this.isLoginMode;
    this.handleUsernameControl();
  }

  onSubmit() {
    if (!this.authForm.valid) {
      return;
    }

    const { email, username, password } = this.authForm.value;

    if (this.isLoginMode) {
      this.store.dispatch(new AuthActions.Login({ email, password }));
    } else {
      this.store.dispatch(
        new AuthActions.Signup({ email, password, username })
      );
    }

    this.authForm.reset();
  }

  private handleUsernameControl() {
    if (!this.isLoginMode) {
      this.authForm.addControl(
        'username',
        new FormControl(null, [Validators.required])
      );
    } else {
      this.authForm.removeControl('username');
    }
  }

  ngOnDestroy() {
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }
}
