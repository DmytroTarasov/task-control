import { Injectable } from '@angular/core';
import { Board } from '../_models/board.model';

@Injectable({
  providedIn: 'root',
})
export class BoardsService {

  sortBoards(boards: Board[], sortBy: string, value: string, orderBy: string = 'asc') {
    const boardsCopy = [...boards];
    boardsCopy.sort((board1, board2) => {
      const board1TasksCount = board1.tasks.filter(t => t[sortBy].toLowerCase() === value.toLowerCase()).length;
      const board2TasksCount = board2.tasks.filter(t => t[sortBy].toLowerCase() === value.toLowerCase()).length;
      return orderBy === 'asc' ? board1TasksCount - board2TasksCount : board2TasksCount - board1TasksCount;
    });

    return boardsCopy;
  }
}
