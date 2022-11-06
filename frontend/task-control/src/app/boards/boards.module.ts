import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { BoardDetailsComponent } from './board-details/board-details.component';
import { BoardItemComponent } from './board-item/board-item.component';
import { BoardsRoutingModule } from './boards-routing.module';
import { BoardListComponent } from './board-list/board-list.component';
import { TaskColumnComponent } from '../tasks/task-column/task-column.component';
import { TaskItemComponent } from '../tasks/task-item/task-item.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    BoardDetailsComponent,
    BoardItemComponent,
    BoardListComponent,
    TaskColumnComponent,
    TaskItemComponent
  ],
  imports: [
    FormsModule,
    DragDropModule,
    RouterModule,
    BoardsRoutingModule,
    SharedModule
  ]
})
export class BoardsModule { }
