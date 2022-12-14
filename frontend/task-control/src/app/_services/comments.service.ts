import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CommentModel } from '../_models/comment.model';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private http: HttpClient) { }

  createComment(comment: CommentModel) {
    return this.http.post<CommentModel>(`${environment.serverUrl}/comments`, comment);
  }

  deleteComment(id: string) {
    return this.http.delete<string>(`${environment.serverUrl}/comments/${id}`);
  }
}
