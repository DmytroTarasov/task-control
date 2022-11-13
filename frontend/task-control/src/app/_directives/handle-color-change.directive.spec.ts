import { TestBed, ComponentFixture, waitForAsync } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

import { HandleColorChangeDirective } from './handle-color-change.directive';
import { AppState } from '../store/app.reducer';
import * as BoardActions from '../boards/store/board.actions';

@Component({
  template: `
    <input type="color" id="colorType1" value="#000000" appHandleColorChange>
  `
})
class TestColorChangeComponent {}

describe('HandleColorChange Directive', () => {
  let fixture: ComponentFixture<TestColorChangeComponent>;
  let inputElement: DebugElement;
  let store: MockStore<AppState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideMockStore()],
      declarations: [TestColorChangeComponent, HandleColorChangeDirective],
    });

    fixture = TestBed.createComponent(TestColorChangeComponent);
    store = TestBed.inject(MockStore);

    inputElement = fixture.debugElement.query(By.css('input'));

    fixture.detectChanges();
    spyOn(store, 'dispatch').and.callFake(() => {});
  });

  it('should handle focusout event', waitForAsync(() => {
    inputElement.nativeElement.dispatchEvent(new Event('focusout'));
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(store.dispatch).toHaveBeenCalledWith(
        BoardActions.setColumnColor({ colorType: 'colorType1', color: '#000000' })
      );
    });
  }));
});
