import { Component, Input, OnInit } from '@angular/core';
import { Board } from 'src/app/_models/board.model';

@Component({
  selector: 'app-board-item',
  templateUrl: './board-item.component.html',
  styleUrls: ['./board-item.component.css']
})
export class BoardItemComponent implements OnInit {
  @Input('board') board!: Board;

  constructor() { }

  ngOnInit(): void {
  }

}
