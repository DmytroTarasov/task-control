import { Directive, ElementRef, HostBinding, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHighlightButton]'
})
export class HighlightButtonDirective {
  @Input() appHighlightButton: HTMLElement;

  constructor(private element: ElementRef, private render: Renderer2) { }

  @HostBinding('style.background-color') backgroundColor: string;

  @HostListener('click') highLightButton() {
    this.render.setStyle(this.element.nativeElement, "background-color", '#C7C8BE');
    this.render.setStyle(this.appHighlightButton, "background-color", "#F0F0F0");
  }

}
