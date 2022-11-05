import { createFeatureSelector, createSelector } from "@ngrx/store";
import { State } from './auth.reducer';

export const getAuthState = createFeatureSelector<State>('auth');

export const getAuthError = createSelector(
  getAuthState,
  (state: State) => state.authError
)

export const getAuthMessage = createSelector(
  getAuthState,
  (state: State) => state.registerMessage
)

export const getAuthUser = createSelector(
  getAuthState,
  (state: State) => state.user
)

