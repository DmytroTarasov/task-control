import { Component, Input, ViewChild, ElementRef, Output, EventEmitter } from "@angular/core";

@Component({
  selector: 'app-filter',
  template: '',
})
export class MockFilterComponent {
  @Input('selectOptions') selectOptions: { value: string; name: string }[];
  @ViewChild('filter') filter: ElementRef;
  @Output() sortEvent: EventEmitter<any> = new EventEmitter();
  @Output() filterEvent: EventEmitter<string> = new EventEmitter();
  @Output() resetEvent: EventEmitter<void> = new EventEmitter();
}
