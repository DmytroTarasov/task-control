import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { exhaustMap, map, take } from 'rxjs/operators';

import * as fromApp from '../store/app.reducer';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptor implements HttpInterceptor {
  constructor(private store: Store<fromApp.AppState>) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.store.select('auth').pipe(
      take(1),
      map((authState) => authState.user),
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
