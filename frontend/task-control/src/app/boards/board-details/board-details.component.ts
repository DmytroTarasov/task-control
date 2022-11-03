import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs';

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
export class BoardDetailsComponent implements OnInit {
  boardId: string;
  board: Board;
  taskStatus: string = 'Todo';

  constructor(
    private route: ActivatedRoute,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(
        map((params) => {
          return params['boardId'];
        }),
        switchMap((boardId) => {
          this.boardId = boardId;
          this.store.dispatch(
            new BoardActions.GetBoardById({ id: this.boardId })
          );
          return this.store.select('boards');
        }),
        map((boardsState) => {
          return boardsState.selectedBoard;
        })
      )
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
      new BoardActions.GetBoardById({ id: this.boardId, queryParams })
    );
  }

  filterTasks(filterValue: string) {
    const queryParams = new QueryParams(null, null, null, filterValue);
    this.store.dispatch(
      new BoardActions.GetBoardById({ id: this.boardId, queryParams })
    );
  }

  resetFilter() {
    this.store.dispatch(new BoardActions.GetBoardById({ id: this.boardId }));
  }

  openModal(data: string) {
    this.taskStatus = data;
    this.store.dispatch(new ModalActions.ModalOpen());
  }

  deleteBoard() {
    this.store.dispatch(new BoardActions.DeleteBoard(this.board._id));
  }
}
