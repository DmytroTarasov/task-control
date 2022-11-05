import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../_models/user.model';

import * as fromApp from '../store/app.reducer';
import { select, Store } from '@ngrx/store';
import * as AuthActions from '../auth/store/auth.actions';
import { getAuthUser } from '../auth/store/auth.selectors';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  authUser$: Observable<User>;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.authUser$ = this.store.pipe(select(getAuthUser))
  }

  onLogout() {
    this.store.dispatch(AuthActions.logout());
  }
}
