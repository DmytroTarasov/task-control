import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Board } from '../_models/board.model';
import { QueryParams } from '../_models/queryParams.model';
import { TaskModel } from '../_models/task.model';

@Injectable({
  providedIn: 'root',
})
export class BoardsService {
  constructor(private http: HttpClient) {}

  createParams(queryParams?: QueryParams) {
    let params = new HttpParams();
    for (let key in queryParams) {
      if (!!queryParams[key]) {
        params = params.append(key, queryParams[key]);
      }
    }
    return params;
  }

  sortBoards(
    boards: Board[],
    sortBy: string,
    value: string,
    orderBy: string = 'asc'
  ) {
    const boardsCopy = [...boards];
    boardsCopy.sort((board1, board2) => {
      const board1TasksCount = board1.tasks.filter(
        (t) => t[sortBy].toLowerCase() === value.toLowerCase()
      ).length;
      const board2TasksCount = board2.tasks.filter(
        (t) => t[sortBy].toLowerCase() === value.toLowerCase()
      ).length;
      return orderBy === 'asc'
        ? board1TasksCount - board2TasksCount
        : board2TasksCount - board1TasksCount;
    });

    return boardsCopy;
  }

  getBoards(queryParams?: QueryParams) {
    const params = this.createParams(queryParams);
    return this.http.get<Board[]>(`${environment.serverUrl}/boards`, {
      observe: 'response',
      params,
    });
  }

  updateBoard(id: string, newName: string) {
    return this.http.patch<string>(`${environment.serverUrl}/boards/${id}`, {
      name: newName,
    });
  }

  createBoard(board: Board) {
    return this.http.post<Board>(`${environment.serverUrl}/boards`, board);
  }

  getBoardById(id: string, queryParams?: QueryParams) {
    const params = this.createParams(queryParams);
    return this.http.get<Board>(`${environment.serverUrl}/boards/${id}`, {
      observe: 'response',
      params,
    });
  }

  deleteBoard(id: string) {
    return this.http.delete<string>(`${environment.serverUrl}/boards/${id}`);
  }

  setColumnColor(id: string, colorType: string, color: string) {
    return this.http.patch<string>(
      `${environment.serverUrl}/boards/${id}/setColumnColor`,
      {
        colorType,
        color,
      }
    );
  }
}
