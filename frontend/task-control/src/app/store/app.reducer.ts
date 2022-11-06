import { ActionReducerMap } from '@ngrx/store';

import * as fromAuth from '../auth/store/auth.reducer';
import * as fromBoards from '../boards/store/board.reducer';
import * as fromTasks from '../tasks/store/task.reducer';
import * as fromLoading from '../shared/loader/store/loading.reducer';
import * as fromModal from '../shared/modal/store/modal.reducer';

export interface AppState {
  auth: fromAuth.State;
  boards: fromBoards.State;
  tasks: fromTasks.State;
  loading: fromLoading.State;
  modal: fromModal.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  auth: fromAuth.authReducer,
  boards: fromBoards.boardReducer,
  tasks: fromTasks.taskReducer,
  loading: fromLoading.loadingReducer,
  modal: fromModal.modalReducer
};
