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
import { EditBoardDirective } from './_directives/edit-board.directive';
import { HighlightButtonDirective } from './_directives/highlight-button.directive';

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
    EditBoardDirective,
    HighlightButtonDirective,
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
