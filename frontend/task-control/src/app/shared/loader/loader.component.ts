import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';

import { Observable } from 'rxjs';

import { getLoading } from './store/loading.selectors';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css'],
})
export class LoaderComponent implements OnInit {
  loading$: Observable<boolean>;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.loading$ = this.store.pipe(select(getLoading));
  }
}
