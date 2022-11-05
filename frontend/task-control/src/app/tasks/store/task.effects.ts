import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs';
import * as TaskActions from './task.actions';
import { TasksService } from 'src/app/_services/tasks.service';
import { CommentsService } from 'src/app/_services/comments.service';

@Injectable()
export class TaskEffects {
  getTaskById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.getTaskById),
      switchMap((action) => this.tasksService.getTaskById(action.id)),
      map((task) => {
        return TaskActions.setSelectedTask({ task });
      })
    )
  );

  addCommentToTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.createTaskComment),
      switchMap((action) =>
        this.commentsService.createComment(action.comment)
      ),
      map((comment) => {
        return TaskActions.addCommentToTask({ comment });
      })
    )
  );

  deleteCommentTask$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(TaskActions.deleteTaskComment),
        switchMap((action) => this.commentsService.deleteComment(action.id))
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private tasksService: TasksService,
    private commentsService: CommentsService
  ) {}
}
