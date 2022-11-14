import { CdkDragDrop } from '@angular/cdk/drag-drop';

import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { Board } from 'src/app/_models/board.model';
import { TaskModel } from 'src/app/_models/task.model';

import { select, Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import * as BoardActions from '../../boards/store/board.actions';

import { getSelectedBoard } from '../../boards/store/board.selectors';

@Component({
  selector: 'app-task-column',
  templateUrl: './task-column.component.html',
  styleUrls: ['./task-column.component.css'],
})
export class TaskColumnComponent implements OnInit, OnDestroy {
  board: Board;
  @Input() title: string;
  @Input() status: string;
  @Output() openModalEvent: EventEmitter<string> = new EventEmitter<string>();
  color: string = '#F0F0F0';
  private storeSub: Subscription;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.storeSub = this.store.pipe(select(getSelectedBoard)).subscribe(board => {
      this.board = board;
      if (!!this.board) this.color = this.board[this.transformStatus()];
    })
  }

  openModal(status: string) {
    this.openModalEvent.emit(status);
  }

  drop(event: CdkDragDrop<TaskModel[]>) {
    if (event.previousContainer !== event.container) {
      const newStatus = this.transformContainerId(event.container.id);
      const modifiedTask = event.previousContainer.data[event.previousIndex];

      this.store.dispatch(
        BoardActions.updateBoardTask({
          id: modifiedTask._id,
          newName: modifiedTask.name,
          newStatus,
        })
      );
    }
  }

  transformStatus() {
    return this.status.toLowerCase().split(' ').join('_') + '_color';
  }

  createContainerId(status: string) {
    return status.toLowerCase().split(' ').join('_');
  }

  transformContainerId(containerId: string) {
    return containerId.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  }

  ngOnDestroy() {
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }
}
