import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { TaskModel } from 'src/app/_models/task.model';
import { TasksService } from 'src/app/_services/tasks.service';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css']
})
export class TaskItemComponent implements OnInit {
  @Input('task') task: TaskModel;
  @ViewChild('taskName') taskNameField: ElementRef;
  @ViewChild('options') options: ElementRef;

  constructor(private tasksService: TasksService) { }

  ngOnInit(): void {
  }

  editTask(task: TaskModel) {
    if (this.taskNameField.nativeElement.value !== task.name) {
      this.tasksService.editTask(task._id, this.taskNameField.nativeElement.value).subscribe({
        next: () => {
          task.name = this.taskNameField.nativeElement.value;
          this.options.nativeElement.classList.add('hide');
        }
      });
    }
  }

}
