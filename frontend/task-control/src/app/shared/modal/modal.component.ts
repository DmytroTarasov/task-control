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
  @Input('modalHeader') modelHeader!: string;
  @Input('formInputNames') formInputNames!: string[];
  @Input('btnSubmitText') btnSubmitText!: string;
  @Input('mode') mode: string;
  @Input('taskStatus') taskStatus: string;

  modalOpen$: Observable<boolean>;
  form!: FormGroup;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.form = new FormGroup({});

    this.formInputNames.forEach((name) => {
      this.form.addControl(name, new FormControl(null, [Validators.required]));
    });

    this.modalOpen$ = this.store.pipe(select(getModalOpen));
  }

  onSubmit() {
    if (this.mode === 'board') {
      const { name, description } = this.form.value;
      this.store.dispatch(BoardActions.createBoard({ board: { name, description } }));
    } else if (this.mode === 'task') {
      const { name } = this.form.value;
      this.store.dispatch(
        BoardActions.createTask({ name, status: this.taskStatus })
      );
    }
    this.close();
  }

  close() {
    this.form.reset();
    this.store.dispatch(ModalActions.closeModal());
  }
}
