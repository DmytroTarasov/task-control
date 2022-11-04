import { createAction, props } from '@ngrx/store';
import { CommentModel } from 'src/app/_models/comment.model';
import { TaskModel } from 'src/app/_models/task.model';

export const setSelectedTask = createAction('[Tasks] Set Selected Task', props<{ task: TaskModel }>());
export const getTaskById = createAction('[Tasks] Get Task By Id', props<{ id: string }>());
export const createTaskComment = createAction('[Tasks] Create Task Comment', props<{ comment: CommentModel }>());
export const addCommentToTask = createAction('[Tasks] Add Comment To Task', props<{ comment: CommentModel }>());
export const deleteTaskComment = createAction('[Tasks] Delete Task Comment', props<{ id: string }>());

