import { Component, Input } from "@angular/core";
import { TaskModel } from "src/app/_models/task.model";

@Component({
  selector: 'app-task-item',
  template: '',
})
export class MockTaskItemComponent {
  @Input('task') task: TaskModel;
}
