import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, tap, withLatestFrom } from 'rxjs';
import * as BoardActions from './board.actions';
import * as fromApp from '../../store/app.reducer';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { BoardsService } from 'src/app/_services/boards.service';
import { TasksService } from 'src/app/_services/tasks.service';

@Injectable()
export class BoardEffects {
  getBoards$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BoardActions.getBoards),
      switchMap((action) => this.boardsService.getBoards(action.queryParams)),
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
        // will be automatically dispatched by ngrx/effects
        return BoardActions.setBoards({ boards });
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
      switchMap((action) => this.boardsService.createBoard(action.board)),
      map((board) => {
        return BoardActions.addBoard({ board });
      })
    )
  );

  getBoardById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BoardActions.getBoardById),
      switchMap((action) =>
        this.boardsService.getBoardById(action.id, action.queryParams)
      ),
      map((resData) => {
        return BoardActions.setSelectedBoard({ board: resData.body });
      })
    )
  );

  deleteBoard$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(BoardActions.deleteBoard),
        switchMap((action) => this.boardsService.deleteBoard(action.id)),
        tap(() => {
          this.router.navigateByUrl('/boards');
        })
      ),
    { dispatch: false }
  );

  setColumnColor$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(BoardActions.setColumnColor),
        withLatestFrom(this.store.select('boards')),
        switchMap(([actionData, boardsState]) =>
          this.boardsService.setColumnColor(
            boardsState.selectedBoard._id,
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
      withLatestFrom(this.store.select('boards')),
      switchMap(([actionData, boardsState]) =>
        this.tasksService.createTask(
          boardsState.selectedBoard._id,
          actionData['name'],
          actionData['status']
        )
      ),
      map((task) => {
        return BoardActions.addTaskToBoard({ task });
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

  archiveBoardTask = createEffect(
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
