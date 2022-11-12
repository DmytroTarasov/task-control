import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { TestBed, ComponentFixture, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';

import { AppState } from '../../store/app.reducer';
import { BoardDetailsComponent } from './board-details.component';

import { getSelectedBoard } from '../store/board.selectors';
import * as BoardActions from '../store/board.actions';
import * as ModalActions from '../../shared/modal/store/modal.actions';
import { Board } from 'src/app/_models/board.model';
import { Subscription } from 'rxjs';
import { QueryParams } from 'src/app/_models/queryParams.model';
import { MockFilterComponent } from '../mocks/mock-filter.component';
import { MockModalComponent } from '../mocks/mock-modal.component';
import { MockTaskColumnComponent } from '../mocks/mock-task-column.component';

describe('BoardDetailsComponent', () => {
  let fixture: ComponentFixture<BoardDetailsComponent>;
  let component: BoardDetailsComponent;
  let store: MockStore<AppState>;

  const boards: Board[] = [
    { _id: '1', name: 'Board1', description: 'descr1', tasks: [] },
    { _id: '2', name: 'Board2', description: 'descr2', tasks: [] },
    { _id: '3', name: 'Board3', description: 'descr3', tasks: [] },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideMockStore()],
      imports: [HttpClientTestingModule],
      declarations: [
        BoardDetailsComponent,
        MockModalComponent,
        MockFilterComponent,
        MockTaskColumnComponent
      ],
    });

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(BoardDetailsComponent);
    component = fixture.componentInstance;

    store.overrideSelector(getSelectedBoard, boards[0]);

    fixture.detectChanges();
    spyOn(store, 'dispatch').and.callFake(() => {});
  });

  it('should render board info block', waitForAsync(() => {
    fixture.whenStable().then(() => {
      expect(fixture.debugElement.query(By.css('.container'))).not.toBeNull();
    });
  }));

  it('should render board title', waitForAsync(() => {
    fixture.whenStable().then(() => {
      expect(
        fixture.debugElement.query(By.css('.board-name')).nativeElement
          .textContent
      ).toBe(boards[0].name);
    });
  }));

  it('should dispatch deleteBoard action', waitForAsync(() => {
    spyOn(component, 'deleteBoard').and.callThrough();
    fixture.debugElement.query(By.css('.delete-board')).nativeElement.click();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.deleteBoard).toHaveBeenCalledTimes(1);
      expect(store.dispatch).toHaveBeenCalledWith(
        BoardActions.deleteBoard({ id: boards[0]._id })
      );
    });
  }));

  it('should dispatch openModal action', waitForAsync(() => {
    component.openModal('todo');
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.taskStatus).toBe('todo');
      expect(store.dispatch).toHaveBeenCalledWith(ModalActions.openModal());
    });
  }));

  it('should dispatch getBoardById action without queryParams', waitForAsync(() => {
    component.resetFilter();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(store.dispatch).toHaveBeenCalledWith(
        BoardActions.getBoardById({ id: boards[0]._id })
      );
    });
  }));

  it('should dispatch getBoardById action with filterValue', waitForAsync(() => {
    const filterValue = 'fix';
    const queryParams = new QueryParams(null, null, null, filterValue);
    component.filterTasks(filterValue);
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(store.dispatch).toHaveBeenCalledWith(
        BoardActions.getBoardById({ id: boards[0]._id, queryParams })
      );
    });
  }));

  it('should dispatch getBoardById action with sort criterias', waitForAsync(() => {
    const htmlElement = document.createElement('input');
    htmlElement.textContent = 'asc';
    const queryParams = new QueryParams('name', htmlElement.innerText.toLowerCase(), null, '');
    component.sortTasks({ target: htmlElement, sortByValue: 'name', filterValue: '' });
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(store.dispatch).toHaveBeenCalledWith(BoardActions.getBoardById({ id: boards[0]._id, queryParams }));
    });
  }));

  it('should unsubscribe from store after ngOnDestroy', () => {
    const spy = spyOn(Subscription.prototype, 'unsubscribe');
    component.ngOnDestroy();
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
