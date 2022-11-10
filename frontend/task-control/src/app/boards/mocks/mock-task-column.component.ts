import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: 'app-task-column',
  template: '',
})
export class MockTaskColumnComponent {
  @Input() title: string;
  @Input() status: string;
  @Output() openModalEvent: EventEmitter<string> = new EventEmitter<string>();
}
