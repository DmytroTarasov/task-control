import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';

import { BoardGuard } from './board.guard';
import { AppState } from '../store/app.reducer';

import { getSelectedBoard } from '../boards/store/board.selectors';
import * as BoardActions from '../boards/store/board.actions';
import { convertToParamMap } from '@angular/router';

describe('Boards Guard', () => {
  let guard: BoardGuard;
  let routeMock: any = { paramMap: convertToParamMap({ boardId: '1' }) };
  let store: MockStore<AppState>;
  const board = { _id: '1', name: 'board1', description: 'description1' };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockStore(),
        BoardGuard
      ]
    });

    guard = TestBed.inject(BoardGuard);
    store = TestBed.inject(MockStore);

    store.overrideSelector(getSelectedBoard, null);
  });

  afterEach(() => {
    store.complete();
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should dispatch getBoardById action and return true', waitForAsync(() => {
    spyOn(store, 'dispatch').and.callFake(() => {
      store.overrideSelector(getSelectedBoard, board);
      store.refreshState();
    });
    guard.canActivate(routeMock, null).subscribe(value => {
      expect(store.dispatch).toHaveBeenCalledWith(BoardActions.getBoardById({ id: routeMock.paramMap.get('boardId') }));
      expect(value).toBeTrue();
    });
  }));

  it('should not dispatch getBoardById action but return true', waitForAsync(() => {
    store.overrideSelector(getSelectedBoard, board);
    store.refreshState();
    spyOn(store, 'dispatch').and.callFake(() => {});
    guard.canActivate(routeMock, null).subscribe(value => {
      expect(store.dispatch).not.toHaveBeenCalledWith(BoardActions.getBoardById({ id: routeMock.paramMap.get('boardId') }));
      expect(value).toBeTrue();
    });
  }));

  it('should dispatch getBoardById action and return false', waitForAsync(() => {
    spyOn(store, 'dispatch').and.throwError('');
    guard.canActivate(routeMock, null).subscribe(value => {
      expect(store.dispatch).toHaveBeenCalledWith(BoardActions.getBoardById({ id: routeMock.paramMap.get('boardId') }));
      expect(value).toBeFalse();
    });
  }));
});
