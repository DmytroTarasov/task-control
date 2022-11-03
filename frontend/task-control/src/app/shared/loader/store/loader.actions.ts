import { Action } from '@ngrx/store';

export const LOADING_START = '[Loader] LOADING_START';
export const LOADING_COMPLETE = '[Loader] LOADING_COMPLETE';

export class LoadingStart implements Action {
  readonly type = LOADING_START;
}

export class LoadingComplete implements Action {
  readonly type = LOADING_COMPLETE;
}

export type LoadingActions = LoadingStart | LoadingComplete;
