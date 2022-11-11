import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

import { By } from '@angular/platform-browser';

import { LoaderComponent } from './loader.component';
import { AppState } from '../../store/app.reducer';
import { getLoading } from './store/loading.selectors';

describe('LoaderComponent', () => {
  let fixture: ComponentFixture<LoaderComponent>;
  let component: LoaderComponent;
  let store: MockStore<AppState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoaderComponent],
      providers: [provideMockStore()]
    });

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(LoaderComponent);
    component = fixture.componentInstance;

    store.overrideSelector(getLoading, true);
    fixture.detectChanges();
  });

  it('should display the loader', () => {
    const loaderElement = fixture.debugElement.query(By.css('.loader-wrapper'));
    expect(loaderElement.nativeElement).not.toBeNull();
  });

  it('should not display the loader', waitForAsync(() => {
    store.overrideSelector(getLoading, false);
    store.refreshState();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(fixture.debugElement.query(By.css('.loader-wrapper'))).toBeNull();
    });
  }));
});
