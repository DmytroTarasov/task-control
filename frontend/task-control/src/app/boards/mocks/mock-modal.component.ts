import { Component, Input } from "@angular/core";

@Component({
  selector: 'app-modal',
  template: '',
})
export class MockModalComponent {
  @Input('modalHeader') modalHeader: string;
  @Input('formInputNames') formInputNames: string[];
  @Input('btnSubmitText') btnSubmitText: string;
  @Input('mode') mode: string;
  @Input('taskStatus') taskStatus: string;
}
