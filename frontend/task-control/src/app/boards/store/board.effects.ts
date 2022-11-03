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
    switchMap((getBoardsAction: BoardActions.GetBoards) => {
      const params = createParams(getBoardsAction.payload);
      return this.http.get<Board[]>(`${environment.serverUrl}/boards`, {
        observe: 'response',
        params,
      });
    }),
    map((resData) => resData.body), // pass boards further
    map((boards) => {
      console.log(boards);
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
    switchMap((updateBoardAction: BoardActions.UpdateBoard) => {
      return this.http.patch<string>(
        `${environment.serverUrl}/boards/${updateBoardAction.payload.id}`,
        {
          name: updateBoardAction.payload.newName,
        }
      );
    })
  );

  @Effect()
  getBoardById = this.actions$.pipe(
    ofType(BoardActions.GET_BOARD_BY_ID),
    switchMap((getBoardByIdAction: BoardActions.GetBoardById) => {
      const params = createParams(getBoardByIdAction.payload.queryParams);
      return this.http.get<Board>(
        `${environment.serverUrl}/boards/${getBoardByIdAction.payload.id}`,
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
    switchMap((deleteBoardAction: BoardActions.DeleteBoard) => {
      return this.http.delete<string>(`${environment.serverUrl}/boards/${deleteBoardAction.payload}`);
    }),
    tap(() => {
      this.router.navigateByUrl('/boards');
    })
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router
  ) {}
}
