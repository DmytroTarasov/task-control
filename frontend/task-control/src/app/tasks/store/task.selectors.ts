import { createFeatureSelector, createSelector } from "@ngrx/store";
import { State } from './task.reducer';

export const getTasksState = createFeatureSelector<State>('tasks');

export const getSelectedTask = createSelector(
  getTasksState,
  (state: State) => state.selectedTask
)
