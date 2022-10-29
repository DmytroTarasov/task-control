import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Board } from 'src/app/_models/board.model';
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

  constructor(
    private boardsService: BoardsService,
    private route: ActivatedRoute,
    private modalService: ModalService
  ) {}

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
}
