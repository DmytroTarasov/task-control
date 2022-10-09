import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Board } from '../_models/board.model';

@Injectable({
  providedIn: 'root'
})
export class BoardsService {

  constructor(private http: HttpClient) { }

  getAllBoards() {
    return this.http.get<Board[]>(`${environment.serverUrl}/boards`);
  }
}
