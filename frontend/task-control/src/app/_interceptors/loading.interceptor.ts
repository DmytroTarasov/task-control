import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { delay, finalize } from 'rxjs/operators';

import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as LoadingActions from '../shared/loader/store/loader.actions';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  constructor(private store: Store<fromApp.AppState>) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.store.dispatch(new LoadingActions.LoadingStart());
    return next.handle(request).pipe(
      delay(1000),
      finalize(() => {
        this.store.dispatch(new LoadingActions.LoadingComplete());
      })
    );
  }
}
