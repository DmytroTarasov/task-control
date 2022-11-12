import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
} from '@angular/router';
import { catchError, filter, Observable, of, switchMap, take, tap } from 'rxjs';

import { select, Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as BoardActions from '../boards/store/board.actions';

import { getBoards } from '../boards/store/board.selectors';

@Injectable({
  providedIn: 'root',
})
export class BoardsGuard implements CanActivate {
  constructor(private store: Store<fromApp.AppState>) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.store.pipe(
      select(getBoards),
      tap((boards) => {
        if (!boards) {
          this.store.dispatch(BoardActions.getBoards({}));
        }
      }),
      filter((boards) => !!boards),
      take(1),
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }
}
