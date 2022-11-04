import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
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

  getBoards$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BoardActions.getBoards),
      switchMap((action) => {
        const params = createParams(action.queryParams);
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
        // will be automatically dispatched by ngrx/effects
        return BoardActions.setBoards({ boards });
      })
    )
  );

  updateBoard$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(BoardActions.updateBoard),
        switchMap((action) => {
          return this.http.patch<string>(
            `${environment.serverUrl}/boards/${action.id}`,
            {
              name: action.newName,
            }
          );
        })
      ),
    { dispatch: false }
  );

  createBoard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BoardActions.createBoard),
      switchMap((action) => {
        return this.http.post<Board>(
          `${environment.serverUrl}/boards`,
          action.board
        );
      }),
      map((board) => {
        return BoardActions.addBoard({ board });
      })
    )
  );

  getBoardById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BoardActions.getBoardById),
      switchMap((action) => {
        const params = createParams(action.queryParams);
        return this.http.get<Board>(
          `${environment.serverUrl}/boards/${action.id}`,
          {
            observe: 'response',
            params,
          }
        );
      }),
      map((resData) => {
        return BoardActions.setSelectedBoard({ board: resData.body });
      })
    )
  );

  deleteBoard$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(BoardActions.deleteBoard),
        switchMap((action) => {
          return this.http.delete<string>(
            `${environment.serverUrl}/boards/${action.id}`
          );
        }),
        tap(() => {
          this.router.navigateByUrl('/boards');
        })
      ),
    { dispatch: false }
  );

  setColumnColor$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(BoardActions.setColumnColor),
        withLatestFrom(this.store.select('boards')),
        switchMap(([actionData, boardsState]) => {
          return this.http.patch<string>(
            `${environment.serverUrl}/boards/${boardsState.selectedBoard._id}/setColumnColor`,
            {
              colorType: actionData['colorType'],
              color: actionData['color'],
            }
          );
        })
      ),
    { dispatch: false }
  );

  createTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BoardActions.createTask),
      withLatestFrom(this.store.select('boards')),
      switchMap(([actionData, boardsState]) => {
        return this.http.post<TaskModel>(`${environment.serverUrl}/tasks`, {
          name: actionData['name'],
          status: actionData['status'],
          board: boardsState.selectedBoard._id,
        });
      }),
      map((task) => {
        return BoardActions.addTaskToBoard({ task });
      })
    )
  );

  updateBoardTask$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(BoardActions.updateBoardTask),
        switchMap((action) => {
          return this.http.patch<string>(
            `${environment.serverUrl}/tasks/${action.id}`,
            { name: action.newName, status: action.newStatus }
          );
        })
      ),
    { dispatch: false }
  );

  deleteBoardTask$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(BoardActions.deleteBoardTask),
        switchMap((action) => {
          return this.http.delete<string>(
            `${environment.serverUrl}/tasks/${action.id}`
          );
        })
      ),
    { dispatch: false }
  );

  archiveBoardTask = createEffect(
    () =>
      this.actions$.pipe(
        ofType(BoardActions.archiveBoardTask),
        switchMap((action) => {
          return this.http.post<string>(
            `${environment.serverUrl}/tasks/${action.id}/archive`,
            {}
          );
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {}
}
