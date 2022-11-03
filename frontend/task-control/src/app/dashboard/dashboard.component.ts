import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { map, Subscription } from 'rxjs';
import { Board } from '../_models/board.model';
import { QueryParams } from '../_models/queryParams.model';
import { BoardsService } from '../_services/boards.service';
import { ModalService } from '../_services/modal.service';

import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as BoardActions from '../boards/store/board.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  boards: Board[];
  storeSub: Subscription;
  @ViewChild('sortAsc') sortAsc: ElementRef;
  @ViewChild('sortDesc') sortDesc: ElementRef;
  @ViewChild('sortBy') sortBy: ElementRef;
  @ViewChild('filter') filter: ElementRef;

  constructor(
    private boardsService: BoardsService,
    private modalService: ModalService,
    private renderer: Renderer2,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    // this.boardsService.getBoards();

    // this.boardsService.boardsSource.subscribe(
    //   (boards) => (this.boards = boards)
    // );
    this.store.dispatch(new BoardActions.GetBoards());

    this.storeSub = this.store
      .select('boards')
      .pipe(map((boardsState) => boardsState.boards))
      .subscribe((boards: Board[]) => {
        this.boards = boards;
      });
  }

  openModal() {
    this.modalService.open();
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
      this.boardsService.sortBoards(
        'status',
        sortByValue,
        target.innerText.toLowerCase()
      );
    } else {
      // this.boardsService.getBoards(queryParams);
      this.store.dispatch(new BoardActions.GetBoards(queryParams));
    }
  }

  filterBoards(filterValue: string) {
    const queryParams = new QueryParams(null, null, filterValue);
    // this.boardsService.getBoards(queryParams);
    this.store.dispatch(new BoardActions.GetBoards(queryParams));
  }

  resetFilter() {
    // this.boardsService.getBoards();
    this.store.dispatch(new BoardActions.GetBoards());
  }

  ngOnDestroy(): void {
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }
}
