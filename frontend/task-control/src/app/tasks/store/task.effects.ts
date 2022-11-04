import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs';
import * as TaskActions from './task.actions';
import { environment } from 'src/environments/environment';
import { TaskModel } from 'src/app/_models/task.model';
import { CommentModel } from 'src/app/_models/comment.model';

@Injectable()
export class TaskEffects {
  getTaskById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.getTaskById),
      switchMap((action) => {
        return this.http.get<TaskModel>(
          `${environment.serverUrl}/tasks/${action.id}`
        );
      }),
      map((task) => {
        return TaskActions.setSelectedTask({ task });
      })
    )
  );

  addCommentToTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.createTaskComment),
      switchMap((action) => {
        return this.http.post<CommentModel>(
          `${environment.serverUrl}/comments`,
          action.comment
        );
      }),
      map((comment) => {
        return TaskActions.addCommentToTask({ comment });
      })
    )
  );

  deleteCommentTask = createEffect(
    () =>
      this.actions$.pipe(
        ofType(TaskActions.deleteTaskComment),
        switchMap((action) => {
          return this.http.delete<string>(
            `${environment.serverUrl}/comments/${action.id}`
          );
        })
      ),
    { dispatch: false }
  );

  constructor(private actions$: Actions, private http: HttpClient) {}
}
