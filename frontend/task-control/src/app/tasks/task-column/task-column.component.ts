import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

import { Component, Input, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { Board } from 'src/app/_models/board.model';
import { TaskModel } from 'src/app/_models/task.model';
import { BoardsService } from 'src/app/_services/boards.service';
import { ModalService } from 'src/app/_services/modal.service';
import { TasksService } from 'src/app/_services/tasks.service';

@Component({
  selector: 'app-task-column',
  templateUrl: './task-column.component.html',
  styleUrls: ['./task-column.component.css'],
})
export class TaskColumnComponent implements OnInit {
  @Input() board: Board;
  @Input() title: string;
  @Input() status: string;
  color: string = '#F0F0F0';
  taskStatus: string = 'Todo';

  constructor(
    private boardsService: BoardsService,
    private tasksService: TasksService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.color = this.board[this.transformStatus()];
  }

  openModal(status: string) {
    this.taskStatus = status;
    this.modalService.open();
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
      this.tasksService
        .editTask(modifiedTask._id, modifiedTask.name, newStatus)
        .subscribe({
          next: () => {
            this.boardsService.selectedBoardSource
              .pipe(take(1))
              .subscribe((board) => {
                const updatedTask = board.tasks.find(
                  (task) => task._id === modifiedTask._id
                );
                const updatedTaskIndex = board.tasks.indexOf(updatedTask);
                updatedTask.status = newStatus;
                board.tasks = [
                  ...board.tasks.slice(0, updatedTaskIndex),
                  updatedTask,
                  ...board.tasks.slice(updatedTaskIndex + 1),
                ];
                this.boardsService.selectedBoardSource.next(board);
              });
          },
        });

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
