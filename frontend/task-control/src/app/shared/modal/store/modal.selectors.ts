import { createFeatureSelector, createSelector } from "@ngrx/store";
import { State } from './modal.reducer';

export const getModalState = createFeatureSelector<State>('modal');

export const getModalOpen = createSelector(
  getModalState,
  (state: State) => state.open
)
