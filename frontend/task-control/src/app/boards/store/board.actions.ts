import { Action } from '@ngrx/store';
import { QueryParams } from '../../_models/queryParams.model';
import { Board } from '../../_models/board.model';
import { TaskModel } from 'src/app/_models/task.model';

export const SET_SELECTED_BOARD = '[Boards] SET_SELECTED_BOARD';
export const SET_BOARDS = '[Boards] SET_BOARDS';
export const GET_BOARDS = '[Boards] GET_BOARDS';
export const GET_BOARD_BY_ID = '[Boards] GET_BOARD_BY_ID';
export const ADD_BOARD = '[Boards] ADD_BOARD';
export const CREATE_BOARD = '[Boards] CREATE_BOARD';
export const UPDATE_BOARD = '[Boards] UPDATE_BOARD';
export const DELETE_BOARD = '[Boards] DELETE_BOARD';
export const SET_COLUMN_COLOR = '[Boards] SET_COLUMN_COLOR';

export const CREATE_TASK = '[Boards] CREATE_TASK';
export const ADD_TASK_TO_BOARD = '[Boards] ADD_TASK_TO_BOARD';
export const UPDATE_BOARD_TASK = '[Boards] UPDATE_BOARD_TASK';
export const DELETE_BOARD_TASK = '[Boards] DELETE_BOARD_TASK';
export const ARCHIVE_BOARD_TASK = '[Boards] ARCHIVE_BOARD_TASK';

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

export class CreateBoard implements Action {
  readonly type = CREATE_BOARD;

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

export class SetColumnColor implements Action {
  readonly type = SET_COLUMN_COLOR;

  constructor(public payload: { colorType: string, color: string }) {}
}

// tasks
export class CreateTask implements Action {
  readonly type = CREATE_TASK;

  constructor(public payload: { name: string, status: string }) {}
}

export class AddTaskToBoard implements Action {
  readonly type = ADD_TASK_TO_BOARD;

  constructor(public payload: TaskModel) {}
}

export class UpdateBoardTask implements Action {
  readonly type = UPDATE_BOARD_TASK;

  constructor(
    public payload: { id: string; newName: string; newStatus: string }
  ) {}
}

export class DeleteBoardTask implements Action {
  readonly type = DELETE_BOARD_TASK;

  constructor(public payload: string) {}
}

export class ArchiveBoardTask implements Action {
  readonly type = ARCHIVE_BOARD_TASK;

  constructor(public payload: string) {}
}

export type BoardActions =
  SetSelectedBoard
  | SetBoards
  | GetBoards
  | GetBoardById
  | AddBoard
  | CreateBoard
  | UpdateBoard
  | DeleteBoard
  | SetColumnColor
  | AddTaskToBoard
  | UpdateBoardTask
  | DeleteBoardTask
  | ArchiveBoardTask;
