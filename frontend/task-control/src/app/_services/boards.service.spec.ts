import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { BoardsService } from './boards.service';
import { Board } from '../_models/board.model';
import { QueryParams } from '../_models/queryParams.model';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs';

describe('Boards Service', () => {
  let httpMock: HttpTestingController;
  let boardsService: BoardsService;
  const initialBoards: Board[] = [
    { _id: '1', name: 'Board1', description: 'Description1 ' },
    { _id: '2', name: 'Board2', description: 'Description2 ' },
    { _id: '3', name: 'Board3', description: 'Description3 ' }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BoardsService],
    });

    httpMock = TestBed.inject(HttpTestingController);
    boardsService = TestBed.inject(BoardsService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('getBoards', () => {
    it('should return all boards', () => {
      boardsService
        .getBoards()
        .pipe(map((resData) => resData.body))
        .subscribe((boards) => expect(boards).toEqual(initialBoards));

      const req = httpMock.expectOne(`${environment.serverUrl}/boards`);
      req.flush(initialBoards);
    });

    it('should return boards sorted by name', () => {
      const queryParams = new QueryParams('name', 'asc');
      boardsService
        .getBoards(queryParams)
        .pipe(map((resData) => resData.body))
        .subscribe((boards) => expect(boards).toEqual(initialBoards));

      const req = httpMock.expectOne(`${environment.serverUrl}/boards?sortBy=name&sortDirection=asc`);
      req.flush(initialBoards);
    });
  });

  describe('updateBoard', () => {
    it('should return the success message', () => {
      const message = 'Board was updated successfully';
      boardsService
        .updateBoard('1', 'Board1_updated')
        .subscribe(mes => expect(mes).toEqual(message));

      const req = httpMock.expectOne(`${environment.serverUrl}/boards/1`);
      req.flush(message);
    });
  });

  describe('createBoard', () => {
    it('should create a new board', () => {
      const newBoard = { name: 'Board4', description: 'Description4' };
      boardsService
        .createBoard(newBoard)
        .subscribe(board => expect(board).toEqual(newBoard));

      const req = httpMock.expectOne(`${environment.serverUrl}/boards`);
      req.flush(newBoard);
    });
  });

  describe('getBoardById', () => {
    it('should get board by id', () => {
      boardsService
        .getBoardById('1')
        .pipe(map((resData) => resData.body))
        .subscribe(board => expect(board).toEqual(initialBoards[0]));

      const req = httpMock.expectOne(`${environment.serverUrl}/boards/1`);
      req.flush(initialBoards[0]);
    });
  });

  describe('deleteBoard', () => {
    it('should delete board by id', () => {
      const message = 'Board was deleted successfully';
      boardsService
        .deleteBoard('1')
        .subscribe(mes => expect(mes).toEqual(message));

      const req = httpMock.expectOne(`${environment.serverUrl}/boards/1`);
      req.flush(message);
    });
  });

  describe('setColumnColor', () => {
    it('should set column color', () => {
      const message = 'Color was assigned successfully';
      boardsService
        .setColumnColor('1', 'colorType', 'color')
        .subscribe(mes => expect(mes).toEqual(message));

      const req = httpMock.expectOne(`${environment.serverUrl}/boards/1/setColumnColor`);
      req.flush(message);
    });
  });
});
