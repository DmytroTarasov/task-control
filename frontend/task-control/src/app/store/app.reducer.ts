import { ActionReducerMap } from '@ngrx/store';

import * as fromAuth from '../auth/store/auth.reducer';
import * as fromBoards from '../boards/store/board.reducer';


export interface AppState {
    auth: fromAuth.State;
    boards: fromBoards.State
}

export const appReducer: ActionReducerMap<AppState> = {
    auth: fromAuth.authReducer,
    boards: fromBoards.boardReducer
};
