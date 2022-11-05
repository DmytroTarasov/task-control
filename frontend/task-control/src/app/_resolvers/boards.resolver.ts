import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { catchError, filter, map, Observable, of, switchMap, take, tap } from 'rxjs';

import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as BoardActions from '../boards/store/board.actions';

@Injectable({
  providedIn: 'root',
})
export class BoardsResolver implements Resolve<boolean> {
  constructor(private store: Store<fromApp.AppState>) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.store.select('boards').pipe(
      map(boardsState => boardsState.boards),
      tap(boards => {
        if (!boards) {
          this.store.dispatch(BoardActions.getBoards({}))
        }
      }),
      filter(boards => !!boards),
      take(1)
    );
  }
}
