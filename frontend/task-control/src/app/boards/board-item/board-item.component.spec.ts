import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { TestBed, ComponentFixture, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { MemoizedSelector } from '@ngrx/store';

import { AppState } from '../../store/app.reducer';
import { BoardItemComponent } from './board-item.component';
import { BoardsService } from 'src/app/_services/boards.service';

import * as fromBoards from '../store/board.reducer';
import {
  getBoards,
  getBoardById,
  getBoardsState,
} from '../store/board.selectors';
import * as BoardActions from '../store/board.actions';
import { Board } from 'src/app/_models/board.model';
import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { LengthPipe } from 'src/app/_pipes/length.pipe';
import { FilterPipe } from 'src/app/_pipes/filter.pipe';
import { FocusDirective } from 'src/app/_directives/focus.directive';
import { HoverDirective } from 'src/app/_directives/hover.directive';

@Component({
  template: '',
})
class DummyComponent {}

describe('BoardItemComponent', () => {
  let fixture: ComponentFixture<BoardItemComponent>;
  let component: BoardItemComponent;
  let store: MockStore<AppState>;
  let boardsService: BoardsService;
  let router: Router;

  const boards: Board[] = [
    { _id: '1', name: 'Board1', description: 'descr1', tasks: [] },
    { _id: '2', name: 'Board2', description: 'descr2', tasks: [] },
    { _id: '3', name: 'Board3', description: 'descr3', tasks: [] },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideMockStore(), BoardsService],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          { path: ':boardId', component: DummyComponent },
        ]),
      ],
      declarations: [
        BoardItemComponent,
        LengthPipe,
        FilterPipe,
        FocusDirective,
        HoverDirective,
        DummyComponent,
      ],
    });

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(BoardItemComponent);
    component = fixture.componentInstance;
    boardsService = TestBed.inject(BoardsService);
    router = TestBed.inject(Router);

    component.id = '1';
    store.overrideSelector(getBoardsState, { boards, selectedBoard: null });

    fixture.detectChanges();
    spyOn(store, 'dispatch').and.callFake(() => {});
  });

  it('should render board info block', waitForAsync(() => {
    fixture.whenStable().then(() => {
      expect(fixture.debugElement.query(By.css('.board-item'))).not.toBeNull();
    });
  }));

  it('should render board title', waitForAsync(() => {
    fixture.whenStable().then(() => {
      expect(
        fixture.debugElement.query(By.css('.board-title')).nativeElement.value
      ).toBe(boards[0].name);
    });
  }));

  it('should render board description', waitForAsync(() => {
    fixture.whenStable().then(() => {
      expect(
        fixture.debugElement.query(By.css('.board-body')).nativeElement
          .textContent
      ).toBe(boards[0].description);
    });
  }));

  it('should go to url /boardId', waitForAsync(() => {
    fixture.debugElement.query(By.css('.board-link')).nativeElement.click();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(router.url).toBe(`/${boards[0]._id}`);
    });
  }));

  it('should not dispatch updateBoard action', waitForAsync(() => {
    const boardTitleElement = fixture.debugElement.query(By.css('.board-title'));
    boardTitleElement.nativeElement.blur();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(store.dispatch).not.toHaveBeenCalledWith(
        BoardActions.updateBoard({
          id: boards[0]._id,
          newName: boardTitleElement.nativeElement.value,
        })
      );
    });
  }));

  it('should dispatch updateBoard action', waitForAsync(() => {
    spyOn(component, 'editBoard').and.callThrough();
    const boardTitleElement = fixture.debugElement.query(By.css('.board-title')).nativeElement;
    boardTitleElement.value = 'NewBoard';
    boardTitleElement.dispatchEvent(new Event('blur'));
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.editBoard).toHaveBeenCalledTimes(1);
      expect(store.dispatch).toHaveBeenCalledWith(
        BoardActions.updateBoard({
          id: boards[0]._id,
          newName: boardTitleElement.value,
        })
      );
    });
  }));

  it('should unsubscribe from store after ngOnDestroy', () => {
    const spy = spyOn(Subscription.prototype, 'unsubscribe');
    component.ngOnDestroy();
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
