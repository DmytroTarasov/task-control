import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader/loader.component';
import { FocusDirective } from '../_directives/focus.directive';
import { HandleColorChangeDirective } from '../_directives/handle-color-change.directive';
import { HighlightButtonDirective } from '../_directives/highlight-button.directive';
import { HoverDirective } from '../_directives/hover.directive';
import { OpenOptionsDirective } from '../_directives/open-options.directive';
import { FilterPipe } from '../_pipes/filter.pipe';
import { LengthPipe } from '../_pipes/length.pipe';
import { FilterComponent } from './filter/filter.component';
import { ModalComponent } from './modal/modal.component';
import { TextInputComponent } from './_forms/text-input/text-input.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    LoaderComponent,
    ModalComponent,
    TextInputComponent,
    FilterComponent,
    HighlightButtonDirective,
    OpenOptionsDirective,
    FocusDirective,
    HoverDirective,
    HandleColorChangeDirective,
    FilterPipe,
    LengthPipe
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    LoaderComponent,
    ModalComponent,
    TextInputComponent,
    FilterComponent,
    HighlightButtonDirective,
    OpenOptionsDirective,
    FocusDirective,
    HoverDirective,
    HandleColorChangeDirective,
    FilterPipe,
    LengthPipe,
    CommonModule
  ]
})
export class SharedModule { }
