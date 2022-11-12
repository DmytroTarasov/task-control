import { TestBed, waitForAsync } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';

import { AppState } from '../../store/app.reducer';
import * as TaskActions from './task.actions';
import { getSelectedTask } from './task.selectors';
import { TaskEffects } from './task.effects';
import { initialState } from './task.reducer';
import { TasksService } from 'src/app/_services/tasks.service';
import { TaskModel } from 'src/app/_models/task.model';
import { CommentModel } from 'src/app/_models/comment.model';
import { CommentsService } from 'src/app/_services/comments.service';

describe('BoardEffects', () => {
  let actions$: Observable<any>;
  let effects: TaskEffects;
  let mockTasksService;
  let mockCommentsService;
  let store: MockStore<AppState>;
  const comment: CommentModel = { _id: '1', text: 'text', created_at: '2022-11-10', task: '1' };
  const task: TaskModel = { _id: '1', name: 'task1', status: 'done', board: '1', comments: [] };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TaskEffects,
        provideMockActions(() => actions$),
        provideMockStore({ initialState }),
        {
          provide: TasksService,
          useValue: jasmine.createSpyObj('TasksService', ['getTaskById'])
        },
        {
          provide: CommentsService,
          useValue: jasmine.createSpyObj('TasksService', ['createComment', 'deleteComment'])
        }
      ]
    });

    effects = TestBed.inject(TaskEffects);
    mockTasksService = TestBed.inject(TasksService);
    mockCommentsService = TestBed.inject(CommentsService);
    store = TestBed.inject(MockStore);

    // store.overrideSelector(getSelectedTask, task);
  });

  it('should be constructed', () => {
    expect(effects).toBeTruthy();
  });

  describe('getTaskById', () => {
    it('should return setSelectedTask action with task', waitForAsync(() => {
      mockTasksService.getTaskById.and.returnValue(of(task));
      actions$ = of(TaskActions.getTaskById);
      effects.getTaskById$.subscribe((res) => {
        expect(res).toEqual(TaskActions.setSelectedTask({ task }));
        expect(mockTasksService.getTaskById).toHaveBeenCalledTimes(1);
      });
    }));
  });

  describe('addCommentToTask', () => {
    it('should return addCommentToTask action with comment', waitForAsync(() => {
      mockCommentsService.createComment.and.returnValue(of(comment));
      actions$ = of(TaskActions.createTaskComment);
      effects.addCommentToTask$.subscribe((res) => {
        expect(res).toEqual(TaskActions.addCommentToTask({ comment }));
        expect(mockCommentsService.createComment).toHaveBeenCalledTimes(1);
      });
    }));
  });

  describe('deleteCommentTask', () => {
    it('should delete comment from task', waitForAsync(() => {
      const message = 'Comment was deleted successfully';
      mockCommentsService.deleteComment.and.returnValue(of(message));
      actions$ = of(TaskActions.deleteTaskComment);
      effects.deleteCommentTask$.subscribe(() => {
        expect(mockCommentsService.deleteComment).toHaveBeenCalledTimes(1);
      });
    }));
  });
});
