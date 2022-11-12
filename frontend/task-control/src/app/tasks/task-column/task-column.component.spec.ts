import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { TestBed, ComponentFixture, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormsModule } from '@angular/forms';

import { AppState } from '../../store/app.reducer';
import { TaskColumnComponent } from './task-column.component';

import { getSelectedBoard } from '../../boards/store/board.selectors';
import { Subscription } from 'rxjs';
import { Board } from 'src/app/_models/board.model';
import { MockTaskItemComponent } from '../mocks/mock-task-item.component';
import { FilterPipe } from 'src/app/_pipes/filter.pipe';
import { HandleColorChangeDirective } from 'src/app/_directives/handle-color-change.directive';

describe('TaskColumnComponent', () => {
  let fixture: ComponentFixture<TaskColumnComponent>;
  let component: TaskColumnComponent;
  let store: MockStore<AppState>;

  const board: Board = { _id: '1', name: 'board1', description: 'description1', created_at: '2022-11-10', tasks: [] };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideMockStore()],
      imports: [HttpClientTestingModule, FormsModule, DragDropModule],
      declarations: [
        TaskColumnComponent,
        MockTaskItemComponent,
        FilterPipe,
        HandleColorChangeDirective
      ]
    });

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(TaskColumnComponent);
    component = fixture.componentInstance;

    component.status = 'Todo';

    store.overrideSelector(getSelectedBoard, board);

    fixture.detectChanges();
    spyOn(store, 'dispatch').and.callFake(() => {});
  });

  it('should render column', waitForAsync(() => {
    fixture.whenStable().then(() => {
      expect(fixture.debugElement.query(By.css('.col'))).not.toBeNull();
    });
  }));

  it('should emit openModalEvent', waitForAsync(() => {
    spyOn(component.openModalEvent, 'emit').and.callFake(() => {});
    const addTaskElement = fixture.debugElement.query(By.css('.add-task'));
    addTaskElement.nativeElement.click();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.openModalEvent.emit).toHaveBeenCalledTimes(1);
    });
  }));

  it('should return transformed status', () => {
    spyOn(component, 'transformStatus').and.callThrough();
    expect(component.transformStatus()).toBe('todo_color');
  });

  it('should create container id', () => {
    spyOn(component, 'createContainerId').and.callThrough();
    expect(component.createContainerId('In Progress')).toBe('in_progress');
  });

  it('should transform container id', () => {
    spyOn(component, 'transformContainerId').and.callThrough();
    expect(component.transformContainerId('in_progress')).toBe('In Progress');
  });

  it('should unsubscribe from store after ngOnDestroy', () => {
    const spy = spyOn(Subscription.prototype, 'unsubscribe');
    component.ngOnDestroy();
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
