import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
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
}
