import * as LoadingActions from './loader.actions';

export interface State {
  loading: boolean;
}

const initialState: State = {
  loading: false
};

export function loadingReducer(
  state: State = initialState,
  action: LoadingActions.LoadingActions
) {
  switch (action.type) {
    case LoadingActions.LOADING_START:
      return {
        ...state,
        loading: true
      };
    case LoadingActions.LOADING_COMPLETE:
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
}
