import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, of, switchMap, tap, withLatestFrom } from 'rxjs';
import { Board } from '../../_models/board.model';
import * as BoardActions from './board.actions';
import * as fromApp from '../../store/app.reducer';
import { Store } from '@ngrx/store';
import { QueryParams } from '../../_models/queryParams.model';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { TaskModel } from 'src/app/_models/task.model';

const createParams = (queryParams?: QueryParams) => {
  let params = new HttpParams();
  for (let key in queryParams) {
    if (!!queryParams[key]) {
      params = params.append(key, queryParams[key]);
    }
  }
  return params;
};

@Injectable()
export class BoardEffects {
  @Effect()
  getBoards = this.actions$.pipe(
    ofType(BoardActions.GET_BOARDS),
    switchMap((action: BoardActions.GetBoards) => {
      const params = createParams(action.payload);
      return this.http.get<Board[]>(`${environment.serverUrl}/boards`, {
        observe: 'response',
        params,
      });
    }),
    map((resData) => resData.body),
    map((boards) => {
      return boards.map((board) => {
        return {
          ...board,
          tasks: board.tasks ? board.tasks : [],
        };
      });
    }),
    map((boards) => {
      // will be automatically dispatched by a ngrx/effects
      return new BoardActions.SetBoards(boards);
    })
  );

  @Effect({ dispatch: false })
  updateBoard = this.actions$.pipe(
    ofType(BoardActions.UPDATE_BOARD),
    switchMap((action: BoardActions.UpdateBoard) => {
      return this.http.patch<string>(
        `${environment.serverUrl}/boards/${action.payload.id}`,
        {
          name: action.payload.newName,
        }
      );
    })
  );

  @Effect()
  createBoard = this.actions$.pipe(
    ofType(BoardActions.CREATE_BOARD),
    switchMap((action: BoardActions.CreateBoard) => {
      return this.http.post<Board>(`${environment.serverUrl}/boards`, action.payload);
    }),
    map(board => {
      return new BoardActions.AddBoard(board);
    })
  )

  @Effect()
  getBoardById = this.actions$.pipe(
    ofType(BoardActions.GET_BOARD_BY_ID),
    switchMap((action: BoardActions.GetBoardById) => {
      const params = createParams(action.payload.queryParams);
      return this.http.get<Board>(
        `${environment.serverUrl}/boards/${action.payload.id}`,
        {
          observe: 'response',
          params,
        }
      );
    }),
    map((resData) => {
      return new BoardActions.SetSelectedBoard(resData.body);
    })
  );

  @Effect({ dispatch: false })
  deleteBoard = this.actions$.pipe(
    ofType(BoardActions.DELETE_BOARD),
    switchMap((action: BoardActions.DeleteBoard) => {
      return this.http.delete<string>(
        `${environment.serverUrl}/boards/${action.payload}`
      );
    }),
    tap(() => {
      this.router.navigateByUrl('/boards');
    })
  );

  @Effect({ dispatch: false })
  setColumnColor = this.actions$.pipe(
    ofType(BoardActions.SET_COLUMN_COLOR),
    withLatestFrom(this.store.select('boards')),
    switchMap(([actionData, boardsState]) => {
      return this.http
      .patch<string>(`${environment.serverUrl}/boards/${boardsState.selectedBoard._id}/setColumnColor`, {
        colorType: actionData['payload']['colorType'],
        color: actionData['payload']['color']
      })
    })
  );

  @Effect()
  createTask = this.actions$.pipe(
    ofType(BoardActions.CREATE_TASK),
    withLatestFrom(this.store.select('boards')),
    switchMap(([actionData, boardsState]) => {
      return this.http.post<TaskModel>(
        `${environment.serverUrl}/tasks`,
        {
          name: actionData['payload']['name'],
          status: actionData['payload']['status'],
          board: boardsState.selectedBoard._id
        }
      );
    }),
    map(task => {
      return new BoardActions.AddTaskToBoard(task);
    })
  );

  @Effect({ dispatch: false })
  updateBoardTask = this.actions$.pipe(
    ofType(BoardActions.UPDATE_BOARD_TASK),
    switchMap((action: BoardActions.UpdateBoardTask) => {
      return this.http.patch<string>(
        `${environment.serverUrl}/tasks/${action.payload.id}`,
        { name: action.payload.newName, status: action.payload.newStatus }
      );
    })
  );

  @Effect({ dispatch: false })
  deleteBoardTask = this.actions$.pipe(
    ofType(BoardActions.DELETE_BOARD_TASK),
    switchMap((action: BoardActions.DeleteBoardTask) => {
      return this.http.delete<string>(`${environment.serverUrl}/tasks/${action.payload}`);
    })
  );

  @Effect({ dispatch: false })
  archiveBoardTask = this.actions$.pipe(
    ofType(BoardActions.ARCHIVE_BOARD_TASK),
    switchMap((action: BoardActions.ArchiveBoardTask) => {
      return this.http.post<string>(`${environment.serverUrl}/tasks/${action.payload}/archive`, {});
    })
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {}
}
