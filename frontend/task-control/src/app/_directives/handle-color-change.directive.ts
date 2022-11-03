import { Directive, ElementRef, HostListener } from '@angular/core';

import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as BoardActions from '../boards/store/board.actions';

@Directive({
  selector: '[appHandleColorChange]',
})
export class HandleColorChangeDirective {
  constructor(
    private elementRef: ElementRef,
    private store: Store<fromApp.AppState>
  ) {}

  @HostListener('focusout') handleFocusOut() {
    const colorType = this.elementRef.nativeElement.attributes.getNamedItem('ng-reflect-name').value;
    this.store.dispatch(
      new BoardActions.SetColumnColor({
        colorType,
        color: this.elementRef.nativeElement.value,
      })
    );
  }
}
