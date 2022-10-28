import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appEditBoard]'
})
export class EditBoardDirective {
  @Input() appEditBoard: HTMLElement;

  constructor() { }

  @HostListener('click') setFocusOnBoardNameField() {
    this.appEditBoard.focus();
  }

}
