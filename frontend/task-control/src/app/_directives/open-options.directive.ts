import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appOpenOptions]'
})
export class OpenOptionsDirective {
  @Input() appOpenOptions: HTMLElement;

  constructor(private renderer: Renderer2) { }

  @HostListener('click') openOptions() {
    const action = this.appOpenOptions.classList.contains('hide') ? 'removeClass' : 'addClass';
    this.renderer[action](this.appOpenOptions, 'hide');
  }
}
