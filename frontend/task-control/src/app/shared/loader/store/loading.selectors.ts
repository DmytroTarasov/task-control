import { createFeatureSelector, createSelector } from "@ngrx/store";
import { State } from './loading.reducer';

export const getLoadingState = createFeatureSelector<State>('loading');

export const getLoading = createSelector(
  getLoadingState,
  (state: State) => state.loading
)
