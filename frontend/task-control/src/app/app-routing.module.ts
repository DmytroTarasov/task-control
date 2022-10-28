import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './_guards/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BoardDetailsComponent } from './boards/board-details/board-details.component';

const routes: Routes = [
  { path: 'boards', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'auth', component: AuthComponent },
  { path: 'boards/:boardId', component: BoardDetailsComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
