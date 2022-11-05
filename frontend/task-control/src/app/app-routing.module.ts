import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './_guards/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BoardDetailsComponent } from './boards/board-details/board-details.component';
import { TaskDetailsComponent } from './tasks/task-details/task-details.component';
import { BoardsResolver } from './_resolvers/boards.resolver';
import { BoardResolver } from './_resolvers/board.resolver';
import { TaskResolver } from './_resolvers/task.resolver';

const routes: Routes = [
  {
    path: 'boards',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    resolve: { boards: BoardsResolver },
  },
  { path: 'auth', component: AuthComponent },
  {
    path: 'boards/:boardId',
    component: BoardDetailsComponent,
    canActivate: [AuthGuard],
    resolve: { board: BoardResolver },
  },
  {
    path: 'boards/:boardId/tasks/:taskId',
    component: TaskDetailsComponent,
    canActivate: [AuthGuard],
    resolve: { task: TaskResolver }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
