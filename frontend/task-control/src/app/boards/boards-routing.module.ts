import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../_guards/auth.guard';
import { BoardsGuard } from '../_guards/boards.guard';
import { BoardResolver } from '../_resolvers/board.resolver';
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
    canActivate: [AuthGuard],
    resolve: { board: BoardResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BoardsRoutingModule {}
