import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Board } from '../_models/board.model';
import { BoardsService } from '../_services/boards.service';
import { ModalService } from '../_services/modal.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  boards!: Board[];
  filterValue: string;

  constructor(
    private boardsService: BoardsService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.boardsService.getBoards();

    this.boardsService.boardsSource.subscribe(boards => this.boards = boards);
  }

  openModal() {
    this.modalService.open();
  }

  filterBoards() {
    this.boardsService.getBoards(this.filterValue);
  }

  resetFilter() {
    this.filterValue = '';
    this.boardsService.getBoards();
  }

}
