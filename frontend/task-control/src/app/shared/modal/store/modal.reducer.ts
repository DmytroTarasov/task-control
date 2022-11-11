import { createReducer, on } from '@ngrx/store';

import * as ModalActions from './modal.actions';

export interface State {
  open: boolean;
}

export const initialState: State = {
  open: false
};

export const modalReducer = createReducer(
  initialState,
  on(ModalActions.openModal, (state) => ({ ...state, open: true })),
  on(ModalActions.closeModal, (state) => ({ ...state, open: false }))
);
