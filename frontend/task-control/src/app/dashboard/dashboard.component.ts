import { Component, OnInit } from '@angular/core';
import { Board } from '../_models/board.model';
import { User } from '../_models/user.model';
import { BoardsService } from '../_services/boards.service';
import { ModalService } from '../_services/modal.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  boards!: Board[];

  constructor(private boardsService: BoardsService, private modalService: ModalService) { }

  ngOnInit(): void {
    this.getAllBoards();
  }

  getAllBoards() {
    this.boardsService.getAllBoards().subscribe(boards => {
      this.boards = boards
    }, error => console.log(error)); // replace by a proper error handling
  }

  openModal() {
    this.modalService.open();
  }

}
