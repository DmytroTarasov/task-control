import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { convertToParamMap } from '@angular/router';

import { TaskGuard } from './task.guard';
import { AppState } from '../store/app.reducer';

import { getSelectedTask } from '../tasks/store/task.selectors';
import * as TaskActions from '../tasks/store/task.actions';

describe('Task Guard', () => {
  let guard: TaskGuard;
  let routeMock: any = { paramMap: convertToParamMap({ taskId: '1' }) };
  let store: MockStore<AppState>;
  const task = { _id: '1', name: 'task1', status: 'Todo', board: '1' };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockStore(),
        TaskGuard
      ]
    });

    guard = TestBed.inject(TaskGuard);
    store = TestBed.inject(MockStore);

    store.overrideSelector(getSelectedTask, null);
  });

  afterEach(() => {
    store.complete();
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should dispatch getTaskById action and return true', waitForAsync(() => {
    spyOn(store, 'dispatch').and.callFake(() => {
      store.overrideSelector(getSelectedTask, task);
      store.refreshState();
    });
    guard.canActivate(routeMock, null).subscribe(value => {
      expect(store.dispatch).toHaveBeenCalledWith(TaskActions.getTaskById({ id: routeMock.paramMap.get('taskId') }));
      expect(value).toBeTrue();
    });
  }));

  it('should not dispatch getTaskById action but return true', waitForAsync(() => {
    store.overrideSelector(getSelectedTask, task);
    store.refreshState();
    spyOn(store, 'dispatch').and.callFake(() => {});
    guard.canActivate(routeMock, null).subscribe(value => {
      expect(store.dispatch).not.toHaveBeenCalledWith(TaskActions.getTaskById({ id: routeMock.paramMap.get('taskId') }));
      expect(value).toBeTrue();
    });
  }));

  it('should dispatch getTaskById action and return false', waitForAsync(() => {
    spyOn(store, 'dispatch').and.throwError('');
    guard.canActivate(routeMock, null).subscribe(value => {
      expect(store.dispatch).toHaveBeenCalledWith(TaskActions.getTaskById({ id: routeMock.paramMap.get('taskId') }));
      expect(value).toBeFalse();
    });
  }));
});
