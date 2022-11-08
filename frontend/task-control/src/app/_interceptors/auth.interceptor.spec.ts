import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

import { AuthInterceptor } from './auth.interceptor';
import { AppState } from '../store/app.reducer';
import * as fromAuth from '../auth/store/auth.reducer';
import { MemoizedSelector } from '@ngrx/store';
import { User } from '../_models/user.model';
import { getAuthUser } from '../auth/store/auth.selectors';
import { BoardsService } from '../_services/boards.service';
import { environment } from 'src/environments/environment';

describe('Auth Interceptor', () => {
  let httpTestingController: HttpTestingController;
  let store: MockStore<AppState>;
  let boardsService: BoardsService;
  let mockUserSelector: MemoizedSelector<fromAuth.State, User>;
  const validUser = new User('bob@test.com', 'Bob', '2022-11-06', 'token');
  const invalidUser = new User('bob@test.com', 'Bob', '2022-11-06', null);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        BoardsService,
        provideMockStore(),
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptor,
          multi: true,
        },
      ],
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    store = TestBed.inject(MockStore);
    boardsService = TestBed.inject(BoardsService);

    mockUserSelector = store.overrideSelector(getAuthUser, validUser);
  });

  afterEach(() => {
    store.complete();
  });

  afterAll(() => {
    httpTestingController.verify();
  });

  it('should add authorization header to the request in case the user is logged in', () => {
    boardsService.getBoards().subscribe();

    const req = httpTestingController.expectOne(
      `${environment.serverUrl}/boards`
    );

    expect(req.request.headers.has('Authorization')).toEqual(true);
    expect(req.request.headers.get('Authorization')).toEqual(`Bearer ${validUser.token}`);
  });

  it('should not add authorization header to the request in case the user is not logged in', () => {
    mockUserSelector.setResult(invalidUser);
    store.refreshState();
    boardsService.getBoards().subscribe();

    const req = httpTestingController.expectOne(
      `${environment.serverUrl}/boards`
    );

    expect(req.request.headers.has('Authorization')).toEqual(false);
  });
});
