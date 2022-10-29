import { Pipe, PipeTransform } from '@angular/core';
import { Board } from '../_models/board.model';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: Board[], filterString: string, property: string = 'status'): Board[] {
    if (value.length === 0 || !filterString) return value;

    let filteredBoards: Board[] = [];
    for(let board of value) {
      if (board[property].toLowerCase().includes(filterString.toLowerCase())) {
        filteredBoards.push(board);
      }
    }

    return filteredBoards;
  }

}
