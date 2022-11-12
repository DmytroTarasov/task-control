import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';

import { BoardsGuard } from './boards.guard';
import { AppState } from '../store/app.reducer';

import { getBoards } from '../boards/store/board.selectors';
import * as BoardActions from '../boards/store/board.actions';

describe('Boards Guard', () => {
  let guard: BoardsGuard;
  let routeMock: any = { snapshot: {} };
  let store: MockStore<AppState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockStore(),
        BoardsGuard
      ]
    });

    guard = TestBed.inject(BoardsGuard);
    store = TestBed.inject(MockStore);

    store.overrideSelector(getBoards, null);
  });

  afterEach(() => {
    store.complete();
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should dispatch getBoards action and return true', waitForAsync(() => {
    spyOn(store, 'dispatch').and.callFake(() => {
      store.overrideSelector(getBoards, []);
      store.refreshState();
    });
    guard.canActivate(routeMock, null).subscribe(value => {
      expect(store.dispatch).toHaveBeenCalledWith(BoardActions.getBoards({}));
      expect(value).toBeTrue();
    });
  }));

  it('should not dispatch getBoards action and return true', waitForAsync(() => {
    spyOn(store, 'dispatch').and.callFake(() => {});
    store.overrideSelector(getBoards, []);
    store.refreshState();
    guard.canActivate(routeMock, null).subscribe(value => {
      expect(store.dispatch).not.toHaveBeenCalledWith(BoardActions.getBoards({}));
      expect(value).toBeTrue();
    });
  }));

  it('should dispatch getBoards action and return false', waitForAsync(() => {
    spyOn(store, 'dispatch').and.throwError('');
    guard.canActivate(routeMock, null).subscribe(value => {
      expect(store.dispatch).toHaveBeenCalledWith(BoardActions.getBoards({}));
      expect(value).toBeFalse();
    });
  }));
});
