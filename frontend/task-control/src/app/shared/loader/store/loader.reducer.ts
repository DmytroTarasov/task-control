import { createReducer, on } from '@ngrx/store';
import * as LoadingActions from './loader.actions';

export interface State {
  loading: boolean;
}

const initialState: State = {
  loading: false,
};

export const loadingReducer = createReducer(
  initialState,
  on(LoadingActions.startLoading, (state) => ({ ...state, loading: true })),
  on(LoadingActions.completeLoading, (state) => ({ ...state, loading: false }))
);
