import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';

import * as fromApp from './store/app.reducer';
import { AuthEffects } from './auth/store/auth.effects';
import { BoardEffects } from './boards/store/board.effects';
import { TaskEffects } from './tasks/store/task.effects';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoaderComponent } from './shared/loader/loader.component';
import { LoadingInterceptor } from './_interceptors/loading.interceptor';
import { AuthInterceptor } from './_interceptors/auth.interceptor';
import { HeaderComponent } from './header/header.component';
import { ModalComponent } from './shared/modal/modal.component';
import { TextInputComponent } from './shared/_forms/text-input/text-input.component';
import { BoardItemComponent } from './boards/board-item/board-item.component';
import { HighlightButtonDirective } from './_directives/highlight-button.directive';
import { BoardDetailsComponent } from './boards/board-details/board-details.component';
import { TaskItemComponent } from './tasks/task-item/task-item.component';
import { FilterPipe } from './_pipes/filter.pipe';
import { OpenOptionsDirective } from './_directives/open-options.directive';
import { FilterComponent } from './shared/filter/filter.component';
import { FocusDirective } from './_directives/focus.directive';
import { HoverDirective } from './_directives/hover.directive';
import { LengthPipe } from './_pipes/length.pipe';
import { TaskColumnComponent } from './tasks/task-column/task-column.component';
import { HandleColorChangeDirective } from './_directives/handle-color-change.directive';
import { TaskDetailsComponent } from './tasks/task-details/task-details.component';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    DashboardComponent,
    LoaderComponent,
    HeaderComponent,
    ModalComponent,
    TextInputComponent,
    BoardItemComponent,
    HighlightButtonDirective,
    BoardDetailsComponent,
    TaskItemComponent,
    FilterPipe,
    OpenOptionsDirective,
    FilterComponent,
    FocusDirective,
    HoverDirective,
    LengthPipe,
    TaskColumnComponent,
    HandleColorChangeDirective,
    TaskDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    DragDropModule,
    StoreModule.forRoot(fromApp.appReducer),
    EffectsModule.forRoot([AuthEffects, BoardEffects, TaskEffects]),
    StoreDevtoolsModule.instrument({ logOnly: environment.production }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
