import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Board } from '../_models/board.model';
import { QueryParams } from '../_models/queryParams.model';

@Injectable({
  providedIn: 'root',
})
export class BoardsService {
  public boardsSource = new BehaviorSubject<Board[]>([]);
  public selectedBoardSource = new BehaviorSubject<Board>(null);

  constructor(private http: HttpClient) {}

  getBoards(queryParams?: QueryParams) {
    const params = this.createParams(queryParams);

    return this.http
      .get<Board[]>(`${environment.serverUrl}/boards`, {
        observe: 'response',
        params,
      })
      .pipe(
        tap((response) => {
          this.boardsSource.next(response.body);
        })
      )
      .subscribe();
  }

  createBoard(name: string, description: string) {
    return this.http.post<Board>(`${environment.serverUrl}/boards`, {
      name,
      description,
    });
  }

  editBoard(id: string, name: string) {
    return this.http.patch<string>(`${environment.serverUrl}/boards/${id}`, {
      name,
    });
  }

  deleteBoard(id: string) {
    return this.http.delete<string>(`${environment.serverUrl}/boards/${id}`);
  }

  getBoardById(id: string, queryParams?: QueryParams) {
    const params = this.createParams(queryParams);

    return this.http
      .get<Board>(`${environment.serverUrl}/boards/${id}`, {
        observe: 'response',
        params,
      })
      .pipe(
        tap((response) => {
          this.selectedBoardSource.next(response.body);
        })
      )
      .subscribe();
  }

  private createParams(queryParams?: QueryParams) {
    var params = new HttpParams();
    for (let key in queryParams) {
      if (!!queryParams[key]) {
        params = params.append(key, queryParams[key]);
      }
    }
    return params;
  }

  sortBoards(sortBy: string, value: string, orderBy: string = 'asc') {
    this.boardsSource.pipe(take(1)).subscribe((boards) => {
      boards.sort((board1, board2) => {
        const board1TasksCount = board1.tasks.filter(t => t[sortBy].toLowerCase() === value.toLowerCase()).length;
        const board2TasksCount = board2.tasks.filter(t => t[sortBy].toLowerCase() === value.toLowerCase()).length;
        return orderBy === 'asc' ? board1TasksCount - board2TasksCount : board2TasksCount - board1TasksCount;
      });
      this.boardsSource.next(boards);
    });
  }

  setColumnColor(id: string, colorType: string, color: string) {
    return this.http
      .patch<string>(`${environment.serverUrl}/boards/${id}/setColumnColor`, {
        colorType,
        color,
      })
      .subscribe();
  }
}
