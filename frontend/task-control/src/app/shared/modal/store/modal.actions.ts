import { Action } from '@ngrx/store';

export const MODAL_OPEN = '[Modal] MODAL_OPEN';
export const MODAL_CLOSE = '[Modal] MODAL_CLOSE';

export class ModalOpen implements Action {
  readonly type = MODAL_OPEN;
}

export class ModalClose implements Action {
  readonly type = MODAL_CLOSE;
}

export type ModalActions = ModalOpen | ModalClose;
