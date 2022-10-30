import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appHover]',
})
export class HoverDirective {
  @Input() appHover: HTMLElement;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  @HostListener('mouseenter') handleMouseOver() {
    this.renderer.removeClass(this.appHover, 'hide');
    this.renderer.addClass(this.elementRef.nativeElement, 'hide-text');
  }

  @HostListener('mouseleave') handleMouseLeave() {
    this.renderer.addClass(this.appHover, 'hide');
    this.renderer.removeClass(this.elementRef.nativeElement, 'hide-text');
  }
}
