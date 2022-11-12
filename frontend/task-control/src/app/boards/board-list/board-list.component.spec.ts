import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { TestBed, ComponentFixture, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { MemoizedSelector } from '@ngrx/store';

import { AppState } from '../../store/app.reducer';
import { BoardListComponent } from './board-list.component';
import { BoardsService } from 'src/app/_services/boards.service';

import * as fromBoards from '../store/board.reducer';
import { getBoards } from '../store/board.selectors';
import * as BoardActions from '../store/board.actions';
import * as ModalActions from '../../shared/modal/store/modal.actions';
import { Board } from 'src/app/_models/board.model';
import { QueryParams } from 'src/app/_models/queryParams.model';
import { Subscription } from 'rxjs';
import { MockBoardItemComponent } from '../mocks/mock-board-item.component';
import { MockFilterComponent } from '../mocks/mock-filter.component';
import { MockModalComponent } from '../mocks/mock-modal.component';

describe('BoardListComponent', () => {
  let fixture: ComponentFixture<BoardListComponent>;
  let component: BoardListComponent;
  let store: MockStore<AppState>;
  let mockGetBoardsSelector: MemoizedSelector<fromBoards.State, Board[]>;
  let boardsService: BoardsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideMockStore(), BoardsService],
      imports: [HttpClientTestingModule],
      declarations: [
        BoardListComponent,
        MockBoardItemComponent,
        MockModalComponent,
        MockFilterComponent
      ]
    });

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(BoardListComponent);
    component = fixture.componentInstance;
    boardsService = TestBed.inject(BoardsService);

    mockGetBoardsSelector = store.overrideSelector(getBoards, []);

    fixture.detectChanges();
    spyOn(store, 'dispatch').and.callFake(() => {});
  });

  it('should open modal', waitForAsync(() => {
    spyOn(component, 'openModal').and.callThrough();
    const newBoardElement = fixture.debugElement.query(By.css('.new-board'));
    newBoardElement.nativeElement.click();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.openModal).toHaveBeenCalledTimes(1);
      expect(store.dispatch).toHaveBeenCalledWith(ModalActions.openModal());
    });
  }));

  it('should dispatch getBoards action with filterValue', waitForAsync(() => {
    const filterValue = 'fix';
    const queryParams = new QueryParams(null, null, filterValue);
    component.filterBoards(filterValue);
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(store.dispatch).toHaveBeenCalledWith(
        BoardActions.getBoards({ queryParams })
      );
    });
  }));

  it('should dispatch getBoards action with no parameters', waitForAsync(() => {
    component.resetFilter();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(store.dispatch).toHaveBeenCalledWith(BoardActions.getBoards({}));
    });
  }));

  it('should unsubscribe from store after ngOnDestroy', () => {
    const spy = spyOn(Subscription.prototype, 'unsubscribe');
    component.ngOnDestroy();
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should sort boards and dispatch setBoards action', waitForAsync(() => {
    spyOn(boardsService, 'sortBoards').and.callFake(() => []);
    const htmlElement = document.createElement('input');
    htmlElement.textContent = 'asc';
    component.sortBoards({ target: htmlElement, sortByValue: 'todo', filterValue: '' });
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(boardsService.sortBoards).toHaveBeenCalledTimes(1);
      expect(store.dispatch).toHaveBeenCalledWith(BoardActions.setBoards({ boards: []}));
    });
  }));

  it('should dispatch getBoards action with queryParams', waitForAsync(() => {
    const htmlElement = document.createElement('input');
    htmlElement.textContent = 'asc';
    component.sortBoards({ target: htmlElement, sortByValue: 'name', filterValue: '' });
    const queryParams = new QueryParams('name', htmlElement.textContent.toLowerCase(), '');
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(store.dispatch).toHaveBeenCalledWith(BoardActions.getBoards({ queryParams }));
    });
  }));
});
