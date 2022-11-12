import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { TestBed, ComponentFixture, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Component } from '@angular/core';

import { AppState } from '../../store/app.reducer';
import { TaskItemComponent } from './task-item.component';

import * as BoardActions from '../../boards/store/board.actions';

import { OpenOptionsDirective } from 'src/app/_directives/open-options.directive';
import { FocusDirective } from 'src/app/_directives/focus.directive';

@Component({
  template: '',
})
class DummyComponent {}

describe('TaskItemComponent', () => {
  let fixture: ComponentFixture<TaskItemComponent>;
  let component: TaskItemComponent;
  let store: MockStore<AppState>;
  let router: Router;

  const task = { _id: '1', name: 'task1', status: 'Todo', created_at: '2022-11-10', archived: false, board: '2' };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideMockStore()],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          { path: 'tasks/:taskId', component: DummyComponent },
        ]),
      ],
      declarations: [
        TaskItemComponent,
        OpenOptionsDirective,
        FocusDirective,
        DummyComponent,
      ],
    });

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(TaskItemComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);

    component.task = task;

    fixture.detectChanges();
    spyOn(store, 'dispatch').and.callFake(() => {});
  });

  it('should render task info block', () => {
    expect(fixture.debugElement.query(By.css('.task-item'))).not.toBeNull();
  });

  it('should go to /tasks/1', waitForAsync(() => {
    fixture.debugElement.query(By.css('.task-link')).nativeElement.click();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(router.url).toBe('/tasks/1');
    });
  }));

  it('should display not crossed out input', () => {
    expect(
      fixture.debugElement.query(By.css('input')).nativeElement.classList
    ).not.toContain('text-crossed-out');
  });

  it('should dispatch updateBoardTask action', waitForAsync(() => {
    spyOn(component, 'editTask').and.callThrough();
    const inputElement = fixture.debugElement.query(By.css('input'));
    inputElement.nativeElement.value = 'newTask1';
    inputElement.nativeElement.dispatchEvent(new Event('blur'));
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.editTask).toHaveBeenCalledTimes(1);
      expect(store.dispatch).toHaveBeenCalledWith(
        BoardActions.updateBoardTask({
          id: task._id,
          newName: 'newTask1',
          newStatus: task.status,
        })
      );
    });
  }));

  it('should dispatch deleteBoardTask action', waitForAsync(() => {
    spyOn(component, 'deleteTask').and.callThrough();
    const paragraphElement = fixture.debugElement.query(By.css('.delete'));
    paragraphElement.nativeElement.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.deleteTask).toHaveBeenCalledTimes(1);
      expect(store.dispatch).toHaveBeenCalledWith(
        BoardActions.deleteBoardTask({
          id: task._id
        })
      );
    });
  }));

  it('should dispatch archiveBoardTask action', waitForAsync(() => {
    component.task.status = 'Done';
    fixture.detectChanges();
    spyOn(component, 'archiveTask').and.callThrough();
    const paragraphElement = fixture.debugElement.query(By.css('.archive'));
    paragraphElement.nativeElement.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.archiveTask).toHaveBeenCalledTimes(1);
      expect(store.dispatch).toHaveBeenCalledWith(
        BoardActions.archiveBoardTask({
          id: task._id
        })
      );
    });
  }));
});
