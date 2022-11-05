import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import {
  catchError,
  filter,
  map,
  Observable,
  of,
  switchMap,
  take,
  tap,
} from 'rxjs';

import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as BoardActions from '../boards/store/board.actions';
import { BoardsService } from '../_services/boards.service';

@Injectable({
  providedIn: 'root',
})
export class BoardResolver implements Resolve<boolean> {
  constructor(
    private boardsService: BoardsService,
    private store: Store<fromApp.AppState>
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    const boardId = route.paramMap.get('boardId');

    // return this.boardsService.getBoardById(boardId).pipe(
    //   map((resData) => resData.body),
    //   map((board) => {
    //     console.log(board);
    //     this.store.dispatch(BoardActions.setSelectedBoard({ board }));
    //   })
    // );

    return this.store.select('boards').pipe(
      map((boardsState) => boardsState.selectedBoard),
      tap(board => {
        if (!board || board._id !== boardId) {
          this.store.dispatch(BoardActions.getBoardById({ id: boardId }));
        }
      }),
      filter((board) => !!board && board._id === boardId),
      take(1)
    );
  }
}
