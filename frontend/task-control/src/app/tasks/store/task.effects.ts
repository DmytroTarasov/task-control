import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs';
import * as TaskActions from './task.actions';
import { environment } from 'src/environments/environment';
import { TaskModel } from 'src/app/_models/task.model';
import { CommentModel } from 'src/app/_models/comment.model';

@Injectable()
export class TaskEffects {
  @Effect()
  getTaskById = this.actions$.pipe(
    ofType(TaskActions.GET_TASK_BY_ID),
    switchMap((action: TaskActions.GetTaskById) => {
      return this.http.get<TaskModel>(
        `${environment.serverUrl}/tasks/${action.payload}`
      );
    }),
    map((task) => {
      return new TaskActions.SetSelectedTask(task);
    })
  );

  @Effect()
  addCommentToTask = this.actions$.pipe(
    ofType(TaskActions.CREATE_TASK_COMMENT),
    switchMap((action: TaskActions.CreateTaskComment) => {
      return this.http.post<CommentModel>(`${environment.serverUrl}/comments`, action.payload);
    }),
    map((comment) => {
      return new TaskActions.AddCommentToTask(comment);
    })
  );

  @Effect({ dispatch: false })
  deleteCommentTask = this.actions$.pipe(
    ofType(TaskActions.DELETE_TASK_COMMENT),
    switchMap((action: TaskActions.DeleteCommentTask) => {
      return this.http.delete<string>(`${environment.serverUrl}/comments/${action.payload}`);
    })
  )

  constructor(private actions$: Actions, private http: HttpClient) {}
}
