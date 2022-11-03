import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Params, Router } from '@angular/router';
import { Board } from 'src/app/_models/board.model';
import { QueryParams } from 'src/app/_models/queryParams.model';
import { BoardsService } from 'src/app/_services/boards.service';
import { ModalService } from 'src/app/_services/modal.service';

import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import * as BoardActions from '../store/board.actions';
import { map, switchMap } from 'rxjs';

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
    private boardsService: BoardsService,
    private modalService: ModalService,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    // this.route.params.subscribe((params: Params) => {
    //   this.boardId = params['boardId'];

    //   if (this.boardId) {
    //     this.boardsService.getBoardById(this.boardId!!);

    //     this.boardsService.selectedBoardSource.subscribe((board) => {
    //       if (board) this.board = board;
    //     });
    //   }
    // });
    this.route.params
      .pipe(
        map(params => {
          return params['boardId'];
        }),
        switchMap(boardId => {
          this.boardId = boardId;
          this.store.dispatch(new BoardActions.GetBoardById({ id: this.boardId }));
          return this.store.select('boards');
        }),
        map(boardsState => {
          return boardsState.selectedBoard;
        })
      )
      .subscribe(board => this.board = board);
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

    // this.boardsService.getBoardById(this.boardId, queryParams);
    this.store.dispatch(new BoardActions.GetBoardById({ id: this.boardId, queryParams }));
  }

  filterTasks(filterValue: string) {
    const queryParams = new QueryParams(null, null, null, filterValue);
    // this.boardsService.getBoardById(this.board._id, queryParams);
    this.store.dispatch(new BoardActions.GetBoardById({ id: this.boardId, queryParams }));
  }

  resetFilter() {
    // this.boardsService.getBoardById(this.board._id);
    this.store.dispatch(new BoardActions.GetBoardById({ id: this.boardId }));
  }

  openModal(data: string) {
    this.taskStatus = data;
    this.modalService.open();
  }

  deleteBoard() {
    // this.boardsService.deleteBoard(this.board._id).subscribe({
    //   next: () => {
    //     this.router.navigateByUrl('/boards');
    //   }
    // });
    this.store.dispatch(new BoardActions.DeleteBoard(this.board._id));
  }
}
