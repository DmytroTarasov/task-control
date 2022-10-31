import { Component, OnInit } from '@angular/core';


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
}
