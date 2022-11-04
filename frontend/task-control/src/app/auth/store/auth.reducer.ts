import { createReducer, on } from '@ngrx/store';
import { User } from '../../_models/user.model';
import * as AuthActions from './auth.actions';

export interface State {
  user: User;
  authError: string;
  registerMessage: string;
}

const initialState: State = {
  user: null,
  authError: null,
  registerMessage: null,
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.authenticateSuccess, (state, { user }) => ({ ...state, user: { ...user }, authError: null })),
  on(AuthActions.logout, (state) => ({ ...state, user: null, authError: null, registerMessage: null })),
  on(AuthActions.login, AuthActions.signup, AuthActions.clearError, (state) => ({ ...state, authError: null })),
  on(AuthActions.signupSuccess, (state, { message }) => ({ ...state, registerMessage: message })),
  on(AuthActions.authenticateFail, (state, { error }) => ({ ...state, user: null, authError: error })),
  on(AuthActions.clearRegisterMessage, (state) => ({ ...state, registerMessage: null }))
);
