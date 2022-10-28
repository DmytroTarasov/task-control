import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Board } from 'src/app/_models/board.model';
import { BoardsService } from 'src/app/_services/boards.service';

@Component({
  selector: 'app-board-item',
  templateUrl: './board-item.component.html',
  styleUrls: ['./board-item.component.css']
})
export class BoardItemComponent implements OnInit {
  @Input('board') board!: Board;
  @ViewChild('boardName') boardNameField: ElementRef;

  constructor(private boardsService: BoardsService) { }

  ngOnInit(): void {
  }

  editBoard() {
    if (this.boardNameField.nativeElement.value !== this.board.name) {
      this.boardsService.editBoard(this.board._id, this.boardNameField.nativeElement.value).subscribe({
        next: () => this.board.name = this.boardNameField.nativeElement.value
      });
    }
  }

}
