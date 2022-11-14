import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, tap, withLatestFrom } from 'rxjs';
import * as BoardActions from './board.actions';
import * as fromApp from '../../store/app.reducer';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { BoardsService } from 'src/app/_services/boards.service';
import { TasksService } from 'src/app/_services/tasks.service';

import { getSelectedBoard  } from './board.selectors';

@Injectable()
export class BoardEffects {
  getBoards$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BoardActions.getBoards),
      switchMap((action) => {
        return this.boardsService.getBoards(action.queryParams).pipe(
          map((resData) => resData.body),
          map((boards) => {
            return boards.map((board) => {
              return {
                ...board,
                tasks: board.tasks ? board.tasks : [],
              };
            });
          }),
          map((boards) => {
            return BoardActions.setBoards({ boards });
          })
        );
      })
    )
  );

  updateBoard$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(BoardActions.updateBoard),
        switchMap((action) =>
          this.boardsService.updateBoard(action.id, action.newName)
        )
      ),
    { dispatch: false }
  );

  createBoard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BoardActions.createBoard),
      switchMap((action) => {
        return this.boardsService.createBoard(action.board).pipe(
          map((board) => {
            return BoardActions.addBoard({ board });
          })
        );
      })
    )
  );

  getBoardById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BoardActions.getBoardById),
      switchMap((action) => {
        return this.boardsService
          .getBoardById(action.id, action.queryParams)
          .pipe(
            map((resData) => {
              return BoardActions.setSelectedBoard({ board: resData.body });
            })
          );
      })
    )
  );

  deleteBoard$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(BoardActions.deleteBoard),
        switchMap((action) => {
          return this.boardsService.deleteBoard(action.id).pipe(
            tap(() => {
              this.router.navigateByUrl('/boards');
            })
          );
        })
      ),
    { dispatch: false }
  );

  setColumnColor$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(BoardActions.setColumnColor),
        withLatestFrom(this.store.select(getSelectedBoard)),
        switchMap(([actionData, board]) =>
          this.boardsService.setColumnColor(
            board._id,
            actionData['colorType'],
            actionData['color']
          )
        )
      ),
    { dispatch: false }
  );

  createBoardTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BoardActions.createTask),
      withLatestFrom(this.store.select(getSelectedBoard)),
      switchMap(([actionData, board]) => {
        return this.tasksService
          .createTask(
            board._id,
            actionData['name'],
            actionData['status']
          )
          .pipe(
            map((task) => {
              return BoardActions.addTaskToBoard({ task });
            })
          );
      })
    )
  );

  updateBoardTask$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(BoardActions.updateBoardTask),
        switchMap((action) =>
          this.tasksService.updateTask(
            action.id,
            action.newName,
            action.newStatus
          )
        )
      ),
    { dispatch: false }
  );

  deleteBoardTask$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(BoardActions.deleteBoardTask),
        switchMap((action) => this.tasksService.deleteTask(action.id))
      ),
    { dispatch: false }
  );

  archiveBoardTask$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(BoardActions.archiveBoardTask),
        switchMap((action) => this.tasksService.archiveTask(action.id))
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private boardsService: BoardsService,
    private tasksService: TasksService,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {}
}
