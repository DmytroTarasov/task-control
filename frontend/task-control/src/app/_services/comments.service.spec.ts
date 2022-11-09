import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { CommentsService } from './comments.service';
import { environment } from 'src/environments/environment';

describe('Comments Service', () => {
  let httpMock: HttpTestingController;
  let commentsService: CommentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CommentsService],
    });

    httpMock = TestBed.inject(HttpTestingController);
    commentsService = TestBed.inject(CommentsService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('createComment', () => {
    it('should create new comment', () => {
      const newComment = { text: 'text', task: '1' };
      const returnedComment = { ...newComment, _id: '1', created_at: '2022-11-02', created_by: '1' };
      commentsService
        .createComment(newComment)
        .subscribe(comment => expect(comment).toEqual(returnedComment));

      const req = httpMock.expectOne(`${environment.serverUrl}/comments`);
      req.flush(returnedComment);
    });
  });

  describe('deleteComment', () => {
    it('should delete comment', () => {
      const message = 'Comment was deleted successfully';
      const commentId = '1';
      commentsService
        .deleteComment(commentId)
        .subscribe(mes => expect(mes).toEqual(message));

      const req = httpMock.expectOne(`${environment.serverUrl}/comments/${commentId}`);
      req.flush(message);
    });
  });
});
