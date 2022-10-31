import { Directive, ElementRef, HostListener } from '@angular/core';
import { take } from 'rxjs';
import { BoardsService } from '../_services/boards.service';

@Directive({
  selector: '[appHandleColorChange]',
})
export class HandleColorChangeDirective {
  constructor(
    private elementRef: ElementRef,
    private boardsService: BoardsService
  ) {}

  @HostListener('focusout') handleFocusOut() {
    console.log(this.elementRef.nativeElement.attributes.getNamedItem('ng-reflect-name').value);
    this.boardsService.selectedBoardSource.pipe(take(1)).subscribe(board => {
      this.boardsService.setColumnColor(
        board._id,
        this.elementRef.nativeElement.attributes.getNamedItem('ng-reflect-name').value,
        this.elementRef.nativeElement.value
      );
    });
  }
}
