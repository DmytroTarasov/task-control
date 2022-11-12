import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
} from '@angular/router';
import { catchError, filter, Observable, of, switchMap, take, tap } from 'rxjs';

import { select, Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as TaskActions from '../tasks/store/task.actions';

import { getSelectedTask } from '../tasks/store/task.selectors';

@Injectable({
  providedIn: 'root',
})
export class TaskGuard implements CanActivate {
  constructor(private store: Store<fromApp.AppState>) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    const taskId = route.paramMap.get('taskId');

    return this.store.pipe(
      select(getSelectedTask),
      tap((task) => {
        if (!task || task._id !== taskId) {
          this.store.dispatch(TaskActions.getTaskById({ id: taskId }));
        }
      }),
      filter((task) => !!task && task._id === taskId),
      take(1),
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }
}
