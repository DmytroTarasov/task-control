import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { exhaustMap, take } from 'rxjs/operators';

import * as fromApp from '../store/app.reducer';
import { select, Store } from '@ngrx/store';
import { getAuthUser } from '../auth/store/auth.selectors';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private store: Store<fromApp.AppState>) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.store.pipe(
      select(getAuthUser),
      take(1),
      exhaustMap((user) => {
        if (!user || !user.token) {
          return next.handle(req);
        }

        const modifiedRequest = req.clone({
          setHeaders: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        return next.handle(modifiedRequest);
      })
    );
  }
}
