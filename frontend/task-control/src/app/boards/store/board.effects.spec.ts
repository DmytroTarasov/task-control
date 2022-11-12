import { TestBed, waitForAsync } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';

import { AppState } from '../../store/app.reducer';
import * as BoardActions from './board.actions';
import { getSelectedBoard } from './board.selectors';
import { BoardEffects } from './board.effects';
import { initialState } from './board.reducer';
import { BoardsService } from 'src/app/_services/boards.service';
import { TasksService } from 'src/app/_services/tasks.service';

describe('BoardEffects', () => {
  let actions$: Observable<any>;
  let effects: BoardEffects;
  let mockBoardsService;
  let mockTasksService;
  let store: MockStore<AppState>;
  let router: Router;
  const task = { _id: '1', name: 'task1', status: 'done', board: '1' };
  const boards = [{ _id: '1', name: 'board1', description: 'descr1', tasks: []}];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BoardEffects,
        provideMockActions(() => actions$),
        provideMockStore({ initialState }),
        {
          provide: BoardsService,
          useValue: jasmine.createSpyObj('BoardsService',
          ['getBoards', 'updateBoard', 'createBoard', 'getBoardById', 'deleteBoard', 'setColumnColor']),
        },
        {
          provide: TasksService,
          useValue: jasmine.createSpyObj('TasksService',
          ['createTask', 'updateTask', 'deleteTask', 'archiveTask'])
        },
        {
          provide: Router,
          useValue: jasmine.createSpyObj('Router', ['navigateByUrl'])
        }
      ]
    });

    effects = TestBed.inject(BoardEffects);
    mockBoardsService = TestBed.inject(BoardsService);
    mockTasksService = TestBed.inject(TasksService);
    store = TestBed.inject(MockStore);
    router = TestBed.inject(Router);

    store.overrideSelector(getSelectedBoard, boards[0]);
  });

  it('should be constructed', () => {
    expect(effects).toBeTruthy();
  });

  describe('getBoards', () => {
    it('should return setBoards action with boards', waitForAsync(() => {
      mockBoardsService.getBoards.and.returnValue(of(new HttpResponse({ body: boards })));
      actions$ = of(BoardActions.getBoards);
      effects.getBoards$.subscribe((res) => {
        expect(res).toEqual(BoardActions.setBoards({ boards }));
        expect(mockBoardsService.getBoards).toHaveBeenCalledTimes(1);
      });
    }));
  });

  describe('updateBoard', () => {
    it('should call updateBoard method in boards service', waitForAsync(() => {
      mockBoardsService.updateBoard.and.returnValue(of({}));
      actions$ = of(BoardActions.updateBoard);
      effects.updateBoard$.subscribe((res) => {
        expect(mockBoardsService.updateBoard).toHaveBeenCalledTimes(1);
      });
    }));
  });

  describe('createBoard', () => {
    it('should return addBoard action with board', waitForAsync(() => {
      mockBoardsService.createBoard.and.returnValue(of(boards[0]));
      actions$ = of(BoardActions.createBoard);
      effects.createBoard$.subscribe((res) => {
        expect(res).toEqual(BoardActions.addBoard({ board: boards[0] }));
        expect(mockBoardsService.createBoard).toHaveBeenCalledTimes(1);
      });
    }));
  });

  describe('getBoardById', () => {
    it('should return setSelectedBoard action with board', waitForAsync(() => {
      mockBoardsService.getBoardById.and.returnValue(of(new HttpResponse({ body: boards[0] })));
      actions$ = of(BoardActions.getBoardById);
      effects.getBoardById$.subscribe((res) => {
        expect(res).toEqual(BoardActions.setSelectedBoard({ board: boards[0] }));
        expect(mockBoardsService.getBoardById).toHaveBeenCalledTimes(1);
      });
    }));
  });

  describe('deleteBoard', () => {
    it('should navigate to url /boards', waitForAsync(() => {
      mockBoardsService.deleteBoard.and.returnValue(of(''));
      actions$ = of(BoardActions.deleteBoard);
      effects.deleteBoard$.subscribe((res) => {
        expect(router.navigateByUrl).toHaveBeenCalled();
        expect(mockBoardsService.deleteBoard).toHaveBeenCalledTimes(1);
      });
    }));
  });

  describe('setColumnColor', () => {
    it('should call setColumnColor method in boards service', waitForAsync(() => {
      mockBoardsService.setColumnColor.and.returnValue(of(''));
      actions$ = of(BoardActions.setColumnColor);
      effects.setColumnColor$.subscribe((res) => {
        expect(mockBoardsService.setColumnColor).toHaveBeenCalledTimes(1);
      });
    }));
  });

  describe('createBoardTask', () => {
    it('should return addTaskToBoard action with task', waitForAsync(() => {
      mockTasksService.createTask.and.returnValue(of(task));
      actions$ = of(BoardActions.createTask);
      effects.createBoardTask$.subscribe((res) => {
        expect(res).toEqual(BoardActions.addTaskToBoard({ task }));
        expect(mockTasksService.createTask).toHaveBeenCalledTimes(1);
      });
    }));
  });

  describe('updateBoardTask', () => {
    it('should call updateTask method in tasks service', waitForAsync(() => {
      mockTasksService.updateTask.and.returnValue(of(''));
      actions$ = of(BoardActions.updateBoardTask);
      effects.updateBoardTask$.subscribe((res) => {
        expect(mockTasksService.updateTask).toHaveBeenCalledTimes(1);
      });
    }));
  });

  describe('deleteBoardTask', () => {
    it('should call deleteTask method in tasks service', waitForAsync(() => {
      mockTasksService.deleteTask.and.returnValue(of(''));
      actions$ = of(BoardActions.deleteBoardTask);
      effects.deleteBoardTask$.subscribe((res) => {
        expect(mockTasksService.deleteTask).toHaveBeenCalledTimes(1);
      });
    }));
  });

  describe('archiveBoardTask', () => {
    it('should call archiveTask method in tasks service', waitForAsync(() => {
      mockTasksService.archiveTask.and.returnValue(of(''));
      actions$ = of(BoardActions.archiveBoardTask);
      effects.archiveBoardTask$.subscribe((res) => {
        expect(mockTasksService.archiveTask).toHaveBeenCalledTimes(1);
      });
    }));
  });
});
