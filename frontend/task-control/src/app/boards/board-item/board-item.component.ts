import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Board } from 'src/app/_models/board.model';

import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import * as BoardActions from '../store/board.actions';
import { map, Subscription } from 'rxjs';

@Component({
  selector: 'app-board-item',
  templateUrl: './board-item.component.html',
  styleUrls: ['./board-item.component.css'],
})
export class BoardItemComponent implements OnInit, OnDestroy {
  @Input('id') id: string;
  @Input('board') board!: Board;
  @ViewChild('boardName') boardNameField: ElementRef;

  storeSub: Subscription;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.storeSub = this.store
      .select('boards')
      .pipe(
        map((boardsState) => {
          return boardsState.boards.find((board) => board._id === this.id);
        })
      )
      .subscribe((board) => {
        this.board = board;
      });
  }

  editBoard() {
    const inputValue = this.boardNameField.nativeElement.value;
    if (inputValue !== this.board.name) {
      this.store.dispatch(
        new BoardActions.UpdateBoard({
          id: this.board._id,
          newName: inputValue,
        })
      );
    }
  }

  ngOnDestroy() {
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }
}
