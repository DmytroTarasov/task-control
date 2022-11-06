import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { select, Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import * as BoardActions from '../../boards/store/board.actions';
import * as ModalActions from '../modal/store/modal.actions';

import { getModalOpen } from './store/modal.selectors';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit {
  @Input('modalHeader') modalHeader: string;
  @Input('formInputNames') formInputNames: string[];
  @Input('btnSubmitText') btnSubmitText: string;
  @Input('mode') mode: string;
  @Input('taskStatus') taskStatus: string;

  modalOpen$: Observable<boolean>;
  form: FormGroup;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.form = new FormGroup({});

    this.formInputNames.forEach((name) => {
      this.form.addControl(name, new FormControl(null, [Validators.required]));
    });

    this.modalOpen$ = this.store.pipe(select(getModalOpen));
  }

  onSubmit() {
    switch(this.mode) {
      case 'board':
        this.store.dispatch(BoardActions.createBoard({ board: this.form.value }));
        break;
      case 'task':
        this.store.dispatch(BoardActions.createTask({ ...this.form.value, status: this.taskStatus }));
        break;
      default:
        this.close();
    }
    this.close();
  }

  close() {
    this.form.reset();
    this.store.dispatch(ModalActions.closeModal());
  }
}
