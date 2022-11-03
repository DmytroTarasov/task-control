import { Action } from '@ngrx/store';
import { CommentModel } from 'src/app/_models/comment.model';
import { TaskModel } from 'src/app/_models/task.model';

export const SET_SELECTED_TASK = '[Tasks] SET_SELECTED_TASK';
export const GET_TASK_BY_ID = '[Tasks] GET_TASK_BY_ID';
export const CREATE_TASK_COMMENT = '[Tasks] CREATE_TASK_COMMENT';
export const ADD_COMMENT_TO_TASK = '[Tasks] ADD_COMMENT_TO_TASK';
export const DELETE_TASK_COMMENT = '[Tasks] DELETE_TASK_COMMENT';

export class SetSelectedTask implements Action {
  readonly type = SET_SELECTED_TASK;

  constructor(public payload: TaskModel) {}
}

export class GetTaskById implements Action {
  readonly type = GET_TASK_BY_ID;

  constructor(public payload: string) {}
}

export class CreateTaskComment implements Action {
  readonly type = CREATE_TASK_COMMENT;

  constructor(public payload: CommentModel) {}
}

export class AddCommentToTask implements Action {
  readonly type = ADD_COMMENT_TO_TASK;

  constructor(public payload: CommentModel) {}
}

export class DeleteCommentTask implements Action {
  readonly type = DELETE_TASK_COMMENT;

  constructor(public payload: string) {}
}

export type TaskActions =
  | SetSelectedTask
  | GetTaskById
  | AddCommentToTask
  | DeleteCommentTask;
