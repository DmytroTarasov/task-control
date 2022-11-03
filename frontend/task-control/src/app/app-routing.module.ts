import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './_guards/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BoardDetailsComponent } from './boards/board-details/board-details.component';
import { TaskDetailsComponent } from './tasks/task-details/task-details.component';

const routes: Routes = [
  // { path: 'boards', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'auth', component: AuthComponent },
  // { path: 'boards/:boardId', component: BoardDetailsComponent, canActivate: [AuthGuard] },
  { path: 'boards/:boardId', component: BoardDetailsComponent },
  { path: 'boards', component: DashboardComponent },
  { path: 'boards/:boardId/tasks/:taskId', component: TaskDetailsComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
