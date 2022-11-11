import { TypedAction } from '@ngrx/store/src/models';
import * as fromReducer from './modal.reducer';
import * as ModalActions from './modal.actions';

describe('ModalReducer', () => {
  const { initialState } = fromReducer;

  const performAction = (action: TypedAction<string>) =>
    fromReducer.modalReducer(initialState, action);

  describe('unknown action', () => {
    it('should return the default state', () => {
      const action = {
        type: 'Unknown',
      };
      const state = performAction(action);
      expect(state).toBe(initialState);
    });
  });

  describe('[Modal] Open Modal', () => {
    it('should set open to true', () => {
      const state = performAction(ModalActions.openModal());
      expect(state).toEqual({ ...initialState, open: true });
    });
  });

  describe('[Modal] Close Modal', () => {
    it('should set open to false', () => {
      const state = performAction(ModalActions.closeModal());
      expect(state).toEqual({ ...initialState, open: false });
    });
  });
});
