import { Component, OnInit } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

import { ActivatedRoute, Params } from '@angular/router';
import { Board } from 'src/app/_models/board.model';
import { QueryParams } from 'src/app/_models/queryParams.model';
import { BoardsService } from 'src/app/_services/boards.service';
import { ModalService } from 'src/app/_services/modal.service';
import { TaskModel } from 'src/app/_models/task.model';
import { TasksService } from 'src/app/_services/tasks.service';
import { take } from 'rxjs';

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
    private route: ActivatedRoute,
    private modalService: ModalService,
    private tasksService: TasksService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.boardId = params['boardId'];

      if (this.boardId) {
        this.boardsService.getBoardById(this.boardId!!);

        this.boardsService.selectedBoardSource.subscribe(
          (board) => {
            if (board) this.board = board;
          }
        );
      }
    });
  }

  openModal(status: string) {
    this.taskStatus = status;
    this.modalService.open();
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

    this.boardsService.getBoardById(this.boardId, queryParams);
  }

  filterTasks(filterValue: string) {
    const queryParams = new QueryParams(null, null, null, filterValue);
    this.boardsService.getBoardById(this.board._id, queryParams);
  }

  resetFilter() {
    this.boardsService.getBoardById(this.board._id);
  }

  drop(event: CdkDragDrop<TaskModel[]>, newStatus: string) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      let newStatus: string;
      switch(event.container.id) {
        case "cdk-drop-list-0":
          newStatus = 'Todo';
          break;
        case "cdk-drop-list-1":
          newStatus = 'In Progress';
          break;
        default:
          newStatus = 'Done';
          break;
      }
      const modifiedTask = event.previousContainer.data[event.previousIndex];
      this.tasksService.editTask(modifiedTask._id, modifiedTask.name, newStatus).subscribe({
        next: () => {
          this.boardsService.selectedBoardSource.pipe(take(1)).subscribe(board => {
            const updatedTask = board.tasks.find(task => task._id === modifiedTask._id);
            const updatedTaskIndex = board.tasks.indexOf(updatedTask);
            updatedTask.status = newStatus;
            board.tasks = [...board.tasks.slice(0, updatedTaskIndex), updatedTask, ...board.tasks.slice(updatedTaskIndex + 1)];
            this.boardsService.selectedBoardSource.next(board);
          });
        }
      });
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
