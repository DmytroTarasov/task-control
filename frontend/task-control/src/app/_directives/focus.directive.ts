import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appFocus]'
})
export class FocusDirective {
  @Input() appFocus: HTMLElement;

  constructor() { }

  @HostListener('click') setFocus() {
    this.appFocus.focus();
  }

}
