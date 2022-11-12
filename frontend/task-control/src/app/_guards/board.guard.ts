import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot
} from '@angular/router';
import { select, Store } from '@ngrx/store';
import { catchError, filter, Observable, of, switchMap, take, tap } from 'rxjs';

import * as fromApp from '../store/app.reducer';
import * as BoardActions from '../boards/store/board.actions';

import { getSelectedBoard } from '../boards/store/board.selectors';

@Injectable({
  providedIn: 'root',
})
export class BoardGuard implements CanActivate {
  constructor(private store: Store<fromApp.AppState>) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    const boardId = route.paramMap.get('boardId');
    return this.store.pipe(
      select(getSelectedBoard),
      tap((board) => {
        if (!board || board._id !== boardId) {
          this.store.dispatch(BoardActions.getBoardById({ id: boardId }));
        }
      }),
      filter((board) => !!board && board._id === boardId),
      take(1),
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }
}
