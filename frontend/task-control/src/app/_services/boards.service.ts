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

  constructor(private http: HttpClient) {}

  getBoards(queryParams?: QueryParams) {
    var params = new HttpParams();
    // if (!!name) {
    //   params = params.append('boardName', name);
    // }
    for(let key in queryParams) {
      if (!!queryParams[key]) {
        params = params.append(key, queryParams[key]);
      }
    }

    console.log(params);

    return this.http
      .get<Board[]>(`${environment.serverUrl}/boards`, { observe: 'response', params })
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
      name
    });
  }
}
