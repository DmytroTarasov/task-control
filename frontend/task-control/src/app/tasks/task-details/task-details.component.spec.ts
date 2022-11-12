import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { TestBed, ComponentFixture, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { Subscription } from 'rxjs';

import { AppState } from '../../store/app.reducer';
import { TaskDetailsComponent } from './task-details.component';

import { getSelectedTask } from '../store/task.selectors';
import * as TaskActions from '../store/task.actions';
import { TaskModel } from 'src/app/_models/task.model';
import { CommentModel } from 'src/app/_models/comment.model';

describe('TaskDetailsComponent', () => {
  let fixture: ComponentFixture<TaskDetailsComponent>;
  let component: TaskDetailsComponent;
  let store: MockStore<AppState>;

  const comment: CommentModel = { _id: '1', text: 'hello', created_at: '2022-11-10', task: '1' };

  const task: TaskModel = { _id: '1', name: 'task1', status: 'Todo', created_at: '2022-11-10',
    comments: [comment], board: '1', created_by: { username: 'Bob' } };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideMockStore()],
      imports: [HttpClientTestingModule],
      declarations: [
        TaskDetailsComponent
      ]
    });

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(TaskDetailsComponent);
    component = fixture.componentInstance;

    store.overrideSelector(getSelectedTask, task);

    fixture.detectChanges();
    spyOn(store, 'dispatch').and.callFake(() => {});
  });

  it('should render task info block', waitForAsync(() => {
    fixture.whenStable().then(() => {
      expect(fixture.debugElement.query(By.css('.task-content'))).not.toBeNull();
    });
  }));

  it('should not display no comments title', waitForAsync(() => {
    fixture.whenStable().then(() => {
      expect(fixture.debugElement.query(By.css('.no-comments'))).toBeNull();
    });
  }));

  it('should return 1 comment item', waitForAsync(() => {
    fixture.whenStable().then(() => {
      expect(fixture.debugElement.queryAll(By.css('.comment-item')).length).toBe(1);
    });
  }));

  it('should dispatch deleteTaskComment action', waitForAsync(() => {
    spyOn(component, 'deleteComment').and.callThrough();
    fixture.debugElement.query(By.css('.delete-comment')).nativeElement.click();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.deleteComment).toHaveBeenCalledTimes(1);
      expect(store.dispatch).toHaveBeenCalledWith(TaskActions.deleteTaskComment({ id: comment._id }));
    });
  }));

  it('should dispatch createTaskComment action', waitForAsync(() => {
    spyOn(component, 'createComment').and.callThrough();
    fixture.debugElement.query(By.css('.btn')).nativeElement.click();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.createComment).toHaveBeenCalledTimes(1);
      expect(store.dispatch).toHaveBeenCalledWith(TaskActions.createTaskComment({ comment: { text: '', task: task._id } }));
    });
  }));

  it('should unsubscribe from store after ngOnDestroy', () => {
    const spy = spyOn(Subscription.prototype, 'unsubscribe');
    component.ngOnDestroy();
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
