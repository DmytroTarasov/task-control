import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../_guards/auth.guard';
import { BoardGuard } from '../_guards/board.guard';
import { BoardsGuard } from '../_guards/boards.guard';
import { BoardDetailsComponent } from './board-details/board-details.component';
import { BoardListComponent } from './board-list/board-list.component';

const routes: Routes = [
  {
    path: '',
    component: BoardListComponent,
    canActivate: [AuthGuard, BoardsGuard]
  },
  {
    path: ':boardId',
    component: BoardDetailsComponent,
    canActivate: [AuthGuard, BoardGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BoardsRoutingModule {}
