import * as fromReducer from './auth.reducer';
import * as AuthActions from './auth.actions';
import { User } from '../../_models/user.model';
import { TypedAction } from '@ngrx/store/src/models';

describe('AuthReducer', () => {
  const { initialState } = fromReducer;
  const performAction = (action: TypedAction<string>) =>
    fromReducer.authReducer(initialState, action);

  describe('unknown action', () => {
    it('should return the default state', () => {
      const action = {
        type: 'Unknown'
      };
      const state = performAction(action);
      expect(state).toBe(initialState);
    });
  });

  describe('[Auth] Login', () => {
    it('should clear the auth error', () => {
      const action = AuthActions.login({ email: 'bob@test.com', password: '1111111' });
      const state = performAction(action);
      expect(state).toEqual({ ...initialState, authError: null });
    });
  });

  describe('[Auth] Signup', () => {
    it('should clear the auth error', () => {
      const action = AuthActions.signup({ email: 'bob@test.com', password: '1111111', username: 'Bob' });
      const state = performAction(action);
      expect(state).toEqual({ ...initialState, authError: null });
    });
  });

  describe('[Auth] Clear Error', () => {
    it('should clear the auth error', () => {
      const action = AuthActions.clearError();
      const state = performAction(action);
      expect(state).toEqual({ ...initialState, authError: null });
    });
  });

  describe('[Auth] Authenticate Success', () => {
    it('should set the user and clear the auth error', () => {
      const user = new User('bob@test.com', 'Bob', '2022-11-06', 'token');
      const action = AuthActions.authenticateSuccess({ user, redirect: false });
      const state = performAction(action);
      expect(state).toEqual({ ...initialState, user: JSON.parse(JSON.stringify(user)), authError: null });
    });
  });

  describe('[Auth] Authenticate Fail', () => {
    it('should set the auth error', () => {
      const error = 'Invalid creds';
      const action = AuthActions.authenticateFail({ error });
      const state = performAction(action);
      expect(state).toEqual({ ...initialState, authError: error });
    });
  });

  describe('[Auth] Signup Success', () => {
    it('should set the register message', () => {
      const message = 'Profile was created successfully';
      const action = AuthActions.signupSuccess({ message });
      const state = performAction(action);
      expect(state).toEqual({ ...initialState, registerMessage: message });
    });
  });

  describe('[Auth] Logout', () => {
    it('should set user, authError and register message to null', () => {
      const action = AuthActions.logout();
      const state = performAction(action);
      expect(state).toEqual({ ...initialState });
    });
  });

  describe('[Auth] Clear Register Message', () => {
    it('should set register message to null', () => {
      const action = AuthActions.clearRegisterMessage();
      const state = performAction(action);
      expect(state).toEqual({ ...initialState, registerMessage: null });
    });
  });

});
