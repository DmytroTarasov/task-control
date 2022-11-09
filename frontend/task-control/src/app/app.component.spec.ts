import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import * as AuthActions from './auth/store/auth.actions';
import { HeaderComponent } from './header/header.component';
import { SharedModule } from './shared/shared.module';
import { AppState } from './store/app.reducer';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let store: MockStore<AppState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppRoutingModule, SharedModule],
      declarations: [AppComponent, HeaderComponent],
      providers: [provideMockStore()]
    });

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
    spyOn(store, 'dispatch').and.callFake(() => {});
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch an autoLogin action', () => {
    component.ngOnInit();
    expect(store.dispatch).toHaveBeenCalledWith(AuthActions.autoLogin());
  });
});
