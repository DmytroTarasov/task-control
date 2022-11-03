import { Action } from '@ngrx/store';
import { User } from 'src/app/_models/user.model';

export const LOGIN = '[Auth] LOGIN';
export const AUTHENTICATE_SUCCESS = '[Auth] AUTHENTICATE_SUCCESS';
export const AUTHENTICATE_FAIL = '[Auth] AUTHENTICATE_FAIL';
export const SIGNUP_SUCCESS = '[Auth] SIGNUP_SUCCESS';
export const LOGOUT = '[Auth] LOGOUT';
export const SIGNUP = '[Auth] SIGNUP';
export const CLEAR_ERROR = '[Auth] CLEAR_ERROR';
export const CLEAR_REGISTER_MESSAGE = '[Auth] CLEAR_REGISTER_MESSAGE';
export const AUTO_LOGIN = '[Auth] AUTO_LOGIN';

export class AuthenticateSuccess implements Action {
  readonly type = AUTHENTICATE_SUCCESS;

  constructor(public payload: { user: User, redirect: boolean }) {}
}

export class Logout implements Action {
  readonly type = LOGOUT;
}

export class Login implements Action {
  readonly type = LOGIN;

  constructor(public payload: { email: string; password: string }) { }
}

export class AuthenticateFail implements Action {
  readonly type = AUTHENTICATE_FAIL;

  constructor(public payload: string) { }
}

export class Signup implements Action {
  readonly type = SIGNUP;

  constructor(public payload: { email: string; password: string, username: string }) { }
}

export class SignupSuccess implements Action {
  readonly type = SIGNUP_SUCCESS;

  constructor(public payload: string) { }
}

export class ClearError implements Action {
  readonly type = CLEAR_ERROR;
}

export class ClearRegisterMessage implements Action {
  readonly type = CLEAR_REGISTER_MESSAGE;
}

export class AutoLogin implements Action {
  readonly type = AUTO_LOGIN;
}

export type AuthActions =
    | AuthenticateSuccess
    | Logout
    | Login
    | AuthenticateFail
    | Signup
    | SignupSuccess
    | ClearError
    | ClearRegisterMessage
    | AutoLogin;
