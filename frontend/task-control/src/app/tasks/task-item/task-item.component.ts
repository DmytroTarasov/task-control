import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { take } from 'rxjs';
import { TaskModel } from 'src/app/_models/task.model';
import { BoardsService } from 'src/app/_services/boards.service';
import { TasksService } from 'src/app/_services/tasks.service';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css'],
})
export class TaskItemComponent implements OnInit {
  @Input('task') task: TaskModel;
  @ViewChild('taskName') taskNameField: ElementRef;
  @ViewChild('options') options: ElementRef;

  constructor(
    private tasksService: TasksService,
    private boardsService: BoardsService
  ) {}

  ngOnInit(): void {}

  editTask(task: TaskModel) {
    if (this.taskNameField.nativeElement.value !== task.name) {
      this.tasksService
        .editTask(task._id, this.taskNameField.nativeElement.value, task.status)
        .subscribe({
          next: () => {
            task = { ...task, name: this.taskNameField.nativeElement.value };
            this.options.nativeElement.classList.add('hide');
          },
        });
    }
  }

  deleteTask() {
    this.tasksService.deleteTask(this.task._id).subscribe({
      next: () => {
        this.boardsService.selectedBoardSource.pipe(take(1)).subscribe(board => {
          const taskIndex = board.tasks.indexOf(this.task);
          board.tasks = [...board.tasks.slice(0, taskIndex), ...board.tasks.slice(taskIndex + 1)];
          this.boardsService.selectedBoardSource.next(board);
        });
      },
    });
  }
}
