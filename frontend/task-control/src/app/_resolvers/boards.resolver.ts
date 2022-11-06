import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { filter, Observable, take, tap } from 'rxjs';

import { select, Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as BoardActions from '../boards/store/board.actions';

import { getBoards } from '../boards/store/board.selectors';

@Injectable({
  providedIn: 'root',
})
export class BoardsResolver implements Resolve<boolean> {
  constructor(private store: Store<fromApp.AppState>) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.store.pipe(
      select(getBoards),
      tap((boards) => {
        if (!boards) {
          this.store.dispatch(BoardActions.getBoards({}));
        }
      }),
      filter((boards) => !!boards),
      take(1)
    );
  }
}
