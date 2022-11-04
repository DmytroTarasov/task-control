import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskModel } from 'src/app/_models/task.model';

import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import * as TaskActions from '../../tasks/store/task.actions';
import { map, Subscription, switchMap } from 'rxjs';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css'],
})
export class TaskDetailsComponent implements OnInit, OnDestroy {
  @ViewChild('commentText') commentText: ElementRef;
  taskId: string;
  task: TaskModel;
  private storeSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.storeSub = this.route.params
      .pipe(
        map((params) => {
          return params['taskId'];
        }),
        switchMap((taskId) => {
          this.taskId = taskId;
          this.store.dispatch(TaskActions.getTaskById({ id: this.taskId }));
          return this.store.select('tasks');
        }),
        map((tasksState) => {
          return tasksState.selectedTask;
        })
      )
      .subscribe((task) => (this.task = task));
  }

  createComment(text: string) {
    this.store.dispatch(
      TaskActions.createTaskComment({ comment: { text, task: this.task._id } })
    );
    this.commentText.nativeElement.value = '';
  }

  deleteComment(id: string) {
    this.store.dispatch(TaskActions.deleteTaskComment({ id }));
  }

  ngOnDestroy(): void {
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }
}
