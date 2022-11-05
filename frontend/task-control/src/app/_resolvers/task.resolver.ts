import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { filter, map, Observable, take, tap } from 'rxjs';

import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as TaskActions from '../tasks/store/task.actions';

@Injectable({
  providedIn: 'root'
})
export class TaskResolver implements Resolve<boolean> {
  constructor(
    private store: Store<fromApp.AppState>
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const taskId = route.paramMap.get('taskId');

    return this.store.select('tasks').pipe(
      map((tasksState) => tasksState.selectedTask),
      tap(task => {
        if (!task || task._id !== taskId) {
          this.store.dispatch(TaskActions.getTaskById({ id: taskId }));
        }
      }),
      filter((task) => !!task && task._id === taskId),
      take(1)
    );
  }
}
