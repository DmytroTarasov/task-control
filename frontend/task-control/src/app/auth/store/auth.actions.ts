import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/_models/user.model';

export const login = createAction('[Auth] Login', props<{ email: string; password: string }>());
export const authenticateSuccess = createAction('[Auth] Authenticate Success', props<{ user: User, redirect: boolean }>());
export const authenticateFail = createAction('[Auth] Authenticate Fail', props<{ error: string }>());
export const signupSuccess = createAction('[Auth] Signup Success', props<{ message: string }>());
export const logout = createAction('[Auth] Logout');
export const signup = createAction('[Auth] Signup', props<{ email: string; password: string, username: string }>());
export const clearError = createAction('[Auth] Clear Error');
export const clearRegisterMessage = createAction('[Auth] Clear Register Message');
export const autoLogin = createAction('[Auth] Auto Login');
