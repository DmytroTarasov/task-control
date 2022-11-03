import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { map } from 'rxjs';
import { Board } from 'src/app/_models/board.model';
import { TaskModel } from 'src/app/_models/task.model';

import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import * as BoardActions from '../../boards/store/board.actions';

@Component({
  selector: 'app-task-column',
  templateUrl: './task-column.component.html',
  styleUrls: ['./task-column.component.css'],
})
export class TaskColumnComponent implements OnInit {
  board: Board;
  @Input() title: string;
  @Input() status: string;
  @Output() openModalEvent: EventEmitter<string> = new EventEmitter<string>();
  color: string = '#F0F0F0';

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.store
      .select('boards')
      .pipe(
        map((boardsState) => {
          return boardsState.selectedBoard;
        })
      )
      .subscribe((board) => {
        this.board = board;
        this.color = this.board[this.transformStatus()];
      });
  }

  openModal(status: string) {
    this.openModalEvent.emit(status);
  }

  drop(event: CdkDragDrop<TaskModel[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      let newStatus: string;
      switch (event.container.id) {
        case 'cdk-drop-list-0':
          newStatus = 'Todo';
          break;
        case 'cdk-drop-list-1':
          newStatus = 'In Progress';
          break;
        default:
          newStatus = 'Done';
          break;
      }
      const modifiedTask = event.previousContainer.data[event.previousIndex];

      this.store.dispatch(
        new BoardActions.UpdateBoardTask({
          id: modifiedTask._id,
          newName: modifiedTask.name,
          newStatus,
        })
      );

      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  transformStatus() {
    return this.status.toLowerCase().split(' ').join('_') + '_color';
  }
}
