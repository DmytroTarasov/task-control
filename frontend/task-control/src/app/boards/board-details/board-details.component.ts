import { Component, OnDestroy, OnInit } from '@angular/core';
import { map, Subscription } from 'rxjs';

import { Board } from 'src/app/_models/board.model';
import { QueryParams } from 'src/app/_models/queryParams.model';

import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import * as BoardActions from '../store/board.actions';
import * as ModalActions from '../../shared/modal/store/modal.actions';

@Component({
  selector: 'app-board-details',
  templateUrl: './board-details.component.html',
  styleUrls: ['./board-details.component.css'],
})
export class BoardDetailsComponent implements OnInit, OnDestroy {
  board: Board;
  taskStatus: string = 'Todo';
  private storeSub: Subscription;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.storeSub = this.store
      .select('boards')
      .pipe(map((boardsState) => boardsState.selectedBoard))
      .subscribe((board) => (this.board = board));
  }

  sortTasks(data: {
    target: HTMLElement;
    sortByValue: string;
    filterValue: string;
  }) {
    const { target, sortByValue, filterValue } = data;

    const queryParams = new QueryParams(
      sortByValue,
      target.innerText.toLowerCase(),
      null,
      filterValue
    );

    this.store.dispatch(
      BoardActions.getBoardById({ id: this.board._id, queryParams })
    );
  }

  filterTasks(filterValue: string) {
    const queryParams = new QueryParams(null, null, null, filterValue);
    this.store.dispatch(
      BoardActions.getBoardById({ id: this.board._id, queryParams })
    );
  }

  resetFilter() {
    this.store.dispatch(BoardActions.getBoardById({ id: this.board._id }));
  }

  openModal(data: string) {
    this.taskStatus = data;
    this.store.dispatch(ModalActions.openModal());
  }

  deleteBoard() {
    this.store.dispatch(BoardActions.deleteBoard({ id: this.board._id }));
  }

  ngOnDestroy(): void {
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }
}
