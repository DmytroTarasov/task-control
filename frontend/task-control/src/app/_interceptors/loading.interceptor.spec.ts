import { TestBed, waitForAsync } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { MemoizedSelector } from '@ngrx/store';
import { finalize } from 'rxjs';

import { environment } from 'src/environments/environment';

import { LoadingInterceptor } from './loading.interceptor';
import { AppState } from '../store/app.reducer';
import * as fromLoading from '../shared/loader/store/loading.reducer';
import * as LoadingActions from '../shared/loader/store/loading.actions';
import { getLoading } from '../shared/loader/store/loading.selectors';
import { BoardsService } from '../_services/boards.service';

describe('Loading Interceptor', () => {
  let httpMock: HttpTestingController;
  let store: MockStore<AppState>;
  let boardsService: BoardsService;
  let mockLoadingSelector: MemoizedSelector<fromLoading.State, boolean>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        BoardsService,
        provideMockStore(),
        {
          provide: HTTP_INTERCEPTORS,
          useClass: LoadingInterceptor,
          multi: true
        }
      ]
    });

    httpMock = TestBed.inject(HttpTestingController);
    store = TestBed.inject(MockStore);
    boardsService = TestBed.inject(BoardsService);

    mockLoadingSelector = store.overrideSelector(getLoading, false);
    spyOn(store, 'dispatch').and.callFake(() => {});
  });

  afterEach(() => {
    store.complete();
  });

  afterAll(() => {
    httpMock.verify();
  });

it('should set loading to true when the request starts and to false when it ends', waitForAsync(() => {
    boardsService
      .getBoards()
      .pipe(
        finalize(() => {
          expect(store.dispatch).toHaveBeenCalledTimes(2);
          expect(store.dispatch).toHaveBeenCalledWith(LoadingActions.completeLoading());
        })
      )
      .subscribe(() => {
        expect(store.dispatch).toHaveBeenCalledTimes(1)
        expect(store.dispatch).toHaveBeenCalledWith(LoadingActions.startLoading());
      });

    httpMock.expectOne(`${environment.serverUrl}/boards`).flush([]);
  }));
});
