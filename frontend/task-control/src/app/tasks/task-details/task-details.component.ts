import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { TaskModel } from 'src/app/_models/task.model';

import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import * as TaskActions from '../../tasks/store/task.actions';
import { map, Subscription } from 'rxjs';

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

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.storeSub = this.store
      .select('tasks')
      .pipe(map((tasksState) => tasksState.selectedTask))
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
