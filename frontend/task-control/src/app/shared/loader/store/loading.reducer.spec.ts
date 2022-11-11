import { TypedAction } from '@ngrx/store/src/models';
import * as fromReducer from './loading.reducer';
import * as LoadingActions from './loading.actions';

describe('LoadingReducer', () => {
  const { initialState } = fromReducer;

  const performAction = (action: TypedAction<string>) =>
    fromReducer.loadingReducer(initialState, action);

  describe('unknown action', () => {
    it('should return the default state', () => {
      const action = {
        type: 'Unknown',
      };
      const state = performAction(action);
      expect(state).toBe(initialState);
    });
  });

  describe('[Loading] Start Loading', () => {
    it('should set loading to true', () => {
      const state = performAction(LoadingActions.startLoading());
      expect(state).toEqual({ ...initialState, loading: true });
    });
  });

  describe('[Loading] Complete Loading', () => {
    it('should set loading to false', () => {
      const state = performAction(LoadingActions.completeLoading());
      expect(state).toEqual({ ...initialState, loading: false });
    });
  });
});
