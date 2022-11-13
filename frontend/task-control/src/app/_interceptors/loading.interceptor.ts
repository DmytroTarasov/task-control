import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as LoadingActions from '../shared/loader/store/loading.actions';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  constructor(private store: Store<fromApp.AppState>) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.store.dispatch(LoadingActions.startLoading());
    return next.handle(request).pipe(
      finalize(() => {
        this.store.dispatch(LoadingActions.completeLoading());
      })
    );
  }
}
