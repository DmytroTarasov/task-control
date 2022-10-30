import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Board } from 'src/app/_models/board.model';
import { QueryParams } from 'src/app/_models/queryParams.model';
import { BoardsService } from 'src/app/_services/boards.service';
import { ModalService } from 'src/app/_services/modal.service';

@Component({
  selector: 'app-board-details',
  templateUrl: './board-details.component.html',
  styleUrls: ['./board-details.component.css'],
})
export class BoardDetailsComponent implements OnInit {
  boardId: string;
  board: Board;
  taskStatus: string = 'Todo';
  context = this;

  constructor(
    private boardsService: BoardsService,
    private route: ActivatedRoute,
    private modalService: ModalService,
    private renderer: Renderer2
  ) {
    this.setElementColor = this.setElementColor.bind(this);
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.boardId = params['boardId'];

      if (this.boardId) {
        this.boardsService.getBoardById(this.boardId!!);

        this.boardsService.selectedBoardSource.subscribe(
          (board) => (this.board = board)
        );
      }
    });
  }

  openModal(status: string) {
    this.taskStatus = status;
    this.modalService.open();
  }

  setElementColor(element: HTMLElement, color: string = '#F0F0F0') {
    this.renderer.setStyle(element, 'background-color', color);
  }

  sortTasks(data: {
    target: HTMLElement;
    sortAsc: HTMLElement;
    sortDesc: HTMLElement;
    sortByValue: string;
    filterValue: string;
  }) {
    const { target, sortAsc, sortDesc, sortByValue, filterValue } = data;

    this.setElementColor(sortAsc);
    this.setElementColor(sortDesc);
    this.setElementColor(target, '#C7C8BE');

    const queryParams = new QueryParams(
      sortByValue,
      target.innerText.toLowerCase(),
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
