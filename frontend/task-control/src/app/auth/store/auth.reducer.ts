import { User } from '../../_models/user.model';
import * as AuthActions from './auth.actions';

export interface State {
  user: User;
  authError: string;
  registerMessage: string;
}

const initialState: State = {
  user: null,
  authError: null,
  registerMessage: null,
};

export function authReducer(
  state: State = initialState,
  action: AuthActions.AuthActions
) {
  switch (action.type) {
    case AuthActions.AUTHENTICATE_SUCCESS:
      const { email, username, created_date, token } = action.payload;
      const user = new User(email, username, created_date, token);
      return {
        ...state,
        authError: null,
        user
      };
    case AuthActions.LOGOUT:
      return {
        ...state,
        user: null,
        registerMessage: null
      };
    case AuthActions.LOGIN:
    case AuthActions.SIGNUP:
      return {
        ...state,
        authError: null
      };
    case AuthActions.SIGNUP_SUCCESS:
      return {
        ...state,
        registerMessage: action.payload
      };
    case AuthActions.AUTHENTICATE_FAIL:
      return {
        ...state,
        user: null,
        authError: action.payload
      };
    case AuthActions.CLEAR_ERROR:
      return {
        ...state,
        authError: null
      };
    case AuthActions.CLEAR_REGISTER_MESSAGE:
      return {
        ...state,
        registerMessage: null
      };
    default:
      return state;
  }
}
