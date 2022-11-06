import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../_guards/auth.guard';
import { BoardResolver } from '../_resolvers/board.resolver';
import { BoardsResolver } from '../_resolvers/boards.resolver';
import { BoardDetailsComponent } from './board-details/board-details.component';
import { BoardListComponent } from './board-list/board-list.component';

const routes: Routes = [
  {
    path: '',
    component: BoardListComponent,
    canActivate: [AuthGuard],
    resolve: { boards: BoardsResolver },
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
