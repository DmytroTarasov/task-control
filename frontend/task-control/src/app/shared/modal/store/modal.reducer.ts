import * as ModalActions from './modal.actions';

export interface State {
  open: boolean;
}

const initialState: State = {
  open: false
};

export function modalReducer(
  state: State = initialState,
  action: ModalActions.ModalActions
) {
  switch (action.type) {
    case ModalActions.MODAL_OPEN:
      return {
        ...state,
        open: true
      };
    case ModalActions.MODAL_CLOSE:
      return {
        ...state,
        open: false
      };
    default:
      return state;
  }
}
