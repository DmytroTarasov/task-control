import { createAction, props } from '@ngrx/store';
import { QueryParams } from '../../_models/queryParams.model';
import { Board } from '../../_models/board.model';
import { TaskModel } from 'src/app/_models/task.model';

export const setSelectedBoard = createAction('[Boards] Set Selected Board', props<{ board: Board }>());
export const setBoards = createAction('[Boards] Set Boards', props<{ boards: Board[] }>());
export const getBoards = createAction('[Boards] Get Boards', props<{ queryParams?: QueryParams }>());
export const getBoardById = createAction('[Boards] Get Board By Id', props<{ id: string, queryParams?: QueryParams}>());
export const addBoard = createAction('[Boards] Add Board', props<{ board: Board}>());
export const createBoard = createAction('[Boards] Create Board', props<{ board: Board }>());
export const updateBoard = createAction('[Boards] Update Board', props<{ id: string; newName: string }>());
export const deleteBoard = createAction('[Boards] Delete Board', props<{ id: string }>());
export const setColumnColor = createAction('[Boards] Set Column Color', props<{ colorType: string, color: string }>());

export const createTask = createAction('[Boards] Create Task', props<{ name: string, status: string }>());
export const addTaskToBoard = createAction('[Boards] Add Task To Board', props<{ task: TaskModel }>());
export const updateBoardTask = createAction('[Boards] Update Board Task', props<{ id: string; newName: string; newStatus: string }>());
export const deleteBoardTask = createAction('[Boards] Delete Board Task', props<{ id: string }>());
export const archiveBoardTask = createAction('[Boards] Archive Board Task', props<{ id: string }>());

