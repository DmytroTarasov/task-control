import { Action } from '@ngrx/store';
import { TaskModel } from 'src/app/_models/task.model';

export const SET_SELECTED_TASK = '[Tasks] SET_SELECTED_TASK';
export const GET_TASK_BY_ID = '[Tasks] GET_TASK_BY_ID';
export const ADD_TASK = '[Tasks] ADD_TASK';
export const UPDATE_TASK = '[Tasks] UPDATE_TASK';
export const DELETE_TASK = '[Tasks] DELETE_TASK';
export const ARCHIVE_TASK = '[Tasks] ARCHIVE_TASK';

export class SetSelectedTask implements Action {
  readonly type = SET_SELECTED_TASK;

  constructor(public payload: TaskModel) {}
}

export class GetTaskById implements Action {
  readonly type = GET_TASK_BY_ID;

  constructor(public payload: string) {}
}

export class AddTask implements Action {
  readonly type = ADD_TASK;

  constructor(public payload: TaskModel) {}
}

export class UpdateTask implements Action {
  readonly type = UPDATE_TASK;

  constructor(
    public payload: { id: string; newName: string; newStatus: string }
  ) {}
}

export class DeleteTask implements Action {
  readonly type = DELETE_TASK;

  constructor(public payload: string) {}
}

export class ArchiveTask implements Action {
  readonly type = ARCHIVE_TASK;

  constructor(public payload: string) {}
}

export type BoardActions =
  | SetSelectedTask
  | GetTaskById
  | AddTask
  | UpdateTask
  | DeleteTask
  | ArchiveTask;
