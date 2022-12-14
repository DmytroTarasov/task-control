import { Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Board } from 'src/app/_models/board.model';
import { QueryParams } from 'src/app/_models/queryParams.model';
import { BoardsService } from 'src/app/_services/boards.service';

import * as fromApp from '../../store/app.reducer';
import * as BoardActions from '../../boards/store/board.actions';
import * as ModalActions from '../../shared/modal/store/modal.actions';

import { getBoards } from '../../boards/store/board.selectors';

@Component({
  selector: 'app-board-list',
  templateUrl: './board-list.component.html',
  styleUrls: ['./board-list.component.css']
})
export class BoardListComponent implements OnInit, OnDestroy {
  boards: Board[];
  storeSub: Subscription;
  @ViewChild('sortAsc') sortAsc: ElementRef;
  @ViewChild('sortDesc') sortDesc: ElementRef;
  @ViewChild('sortBy') sortBy: ElementRef;
  @ViewChild('filter') filter: ElementRef;

  constructor(
    private boardsService: BoardsService,
    private renderer: Renderer2,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.storeSub = this.store
      .pipe(select(getBoards))
      .subscribe((boards) => (this.boards = boards));
  }

  openModal() {
    this.store.dispatch(ModalActions.openModal());
  }

  setElementColor(element: HTMLElement, color: string = '#F0F0F0') {
    this.renderer.setStyle(element, 'background-color', color);
  }

  sortBoards(data: {
    target: HTMLElement;
    sortByValue: string;
    filterValue: string;
  }) {
    const { target, sortByValue, filterValue } = data;

    const queryParams = new QueryParams(
      sortByValue,
      target.innerText.toLowerCase(),
      filterValue
    );

    if (['todo', 'in progress', 'done'].includes(sortByValue)) {
      const sortedBoards = this.boardsService.sortBoards(
        this.boards,
        'status',
        sortByValue,
        target.innerText.toLowerCase()
      );

      this.store.dispatch(BoardActions.setBoards({ boards: sortedBoards }));
    } else {
      this.store.dispatch(BoardActions.getBoards({ queryParams }));
    }
  }

  filterBoards(filterValue: string) {
    const queryParams = new QueryParams(null, null, filterValue);
    this.store.dispatch(BoardActions.getBoards({ queryParams }));
  }

  resetFilter() {
    this.store.dispatch(BoardActions.getBoards({}));
  }

  ngOnDestroy(): void {
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }
}
