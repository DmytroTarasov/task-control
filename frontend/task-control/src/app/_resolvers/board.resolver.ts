import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { filter, map, Observable, take, tap } from 'rxjs';

import { select, Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as BoardActions from '../boards/store/board.actions';

import { getSelectedBoard } from '../boards/store/board.selectors';

@Injectable({
  providedIn: 'root',
})
export class BoardResolver implements Resolve<boolean> {
  constructor(private store: Store<fromApp.AppState>) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    const boardId = route.paramMap.get('boardId');

    // return this.store.select('boards').pipe(
    //   map((boardsState) => boardsState.selectedBoard),
    //   tap((board) => {
    //     if (!board || board._id !== boardId) {
    //       this.store.dispatch(BoardActions.getBoardById({ id: boardId }));
    //     }
    //   }),
    //   filter((board) => !!board && board._id === boardId),
    //   take(1)
    // );

    return this.store.pipe(
      select(getSelectedBoard),
      tap((board) => {
        if (!board || board._id !== boardId) {
          this.store.dispatch(BoardActions.getBoardById({ id: boardId }));
        }
      }),
      filter((board) => !!board && board._id === boardId),
      take(1)
    );
  }
}
