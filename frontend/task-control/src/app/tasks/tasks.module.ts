import { NgModule } from '@angular/core';
import { TaskDetailsComponent } from './task-details/task-details.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../_guards/auth.guard';
import { TaskGuard } from '../_guards/task.guard';

@NgModule({
  declarations: [TaskDetailsComponent],
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: ':taskId',
        component: TaskDetailsComponent,
        canActivate: [AuthGuard, TaskGuard]
      }
    ])
  ]
})
export class TasksModule {}
