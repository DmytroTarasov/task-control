import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoaderComponent } from './shared/loader/loader.component';
import { LoaderService } from './_services/loader.service';
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
    LengthPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    LoaderService,
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
