import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { TaskModel } from 'src/app/_models/task.model';

import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import * as BoardActions from '../../boards/store/board.actions';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css'],
})
export class TaskItemComponent implements OnInit {
  @Input('task') task: TaskModel;
  @ViewChild('taskName') taskNameField: ElementRef;
  @ViewChild('options') options: ElementRef;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {}

  editTask() {
    const inputValue = this.taskNameField.nativeElement.value;
    if (inputValue !== this.task.name) {
      this.store.dispatch(
        new BoardActions.UpdateBoardTask({
          id: this.task._id,
          newName: inputValue,
          newStatus: this.task.status,
        })
      );
      this.options.nativeElement.classList.add('hide');
    }
  }

  deleteTask() {
    this.store.dispatch(new BoardActions.DeleteBoardTask(this.task._id));
  }

  archiveTask() {
    this.store.dispatch(new BoardActions.ArchiveBoardTask(this.task._id));
  }
}
