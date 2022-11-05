import { createFeatureSelector, createSelector } from "@ngrx/store";
import { State } from './board.reducer';

export const getBoardsState = createFeatureSelector<State>('boards');

export const getBoards = createSelector(
  getBoardsState,
  (state: State) => state.boards
)

export const getSelectedBoard = createSelector(
  getBoardsState,
  (state: State) => state.selectedBoard
)

export const getBoardById = (id: string) => createSelector(
  getBoardsState,
  (state: State) => state.boards.find(board => board._id === id)
)
