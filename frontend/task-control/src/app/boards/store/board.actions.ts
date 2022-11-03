import { Action } from '@ngrx/store';
import { QueryParams } from '../../_models/queryParams.model';
import { Board } from '../../_models/board.model';

export const SET_SELECTED_BOARD = '[Boards] SET_SELECTED_BOARD';
export const SET_BOARDS = '[Boards] SET_BOARDS';
export const GET_BOARDS = '[Boards] GET_BOARDS';
export const GET_BOARD_BY_ID = '[Boards] GET_BOARD_BY_ID';
export const ADD_BOARD = '[Boards] ADD_BOARD';
export const UPDATE_BOARD = '[Boards] UPDATE_BOARD';
export const DELETE_BOARD = '[Boards] DELETE_BOARD';

export class SetSelectedBoard implements Action {
  readonly type = SET_SELECTED_BOARD;

  constructor(public payload: Board) {}
}

export class SetBoards implements Action {
  readonly type = SET_BOARDS;

  constructor(public payload: Board[]) {}
}

export class GetBoards implements Action {
  readonly type = GET_BOARDS;

  constructor(public payload?: QueryParams) {}
}

export class GetBoardById implements Action {
  readonly type = GET_BOARD_BY_ID;

  constructor(public payload: { id: string, queryParams?: QueryParams }) {}
}

export class AddBoard implements Action {
  readonly type = ADD_BOARD;

  constructor(public payload: Board) {}
}

export class UpdateBoard implements Action {
  readonly type = UPDATE_BOARD;

  constructor(public payload: { id: string; newName: string }) {}
}

export class DeleteBoard implements Action {
  readonly type = DELETE_BOARD;

  constructor(public payload: string) {}
}

export type BoardActions =
  SetSelectedBoard
  | SetBoards
  | GetBoards
  | GetBoardById
  | AddBoard
  | UpdateBoard
  | DeleteBoard;
