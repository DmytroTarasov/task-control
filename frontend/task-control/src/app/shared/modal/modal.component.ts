import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { BoardsService } from 'src/app/_services/boards.service';
import { ModalService } from 'src/app/_services/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit {
  @Input('modalHeader') modelHeader!: string;
  @Input('formInputNames') formInputNames!: string[];
  @Input('btnSubmitText') btnSubmitText!: string;
  display$!: Observable<boolean>;
  form!: UntypedFormGroup;

  constructor(
    private modalService: ModalService,
    private boardsService: BoardsService
  ) {}

  ngOnInit(): void {
    this.display$ = this.modalService.display$;

    this.form = new UntypedFormGroup({});

    this.formInputNames.forEach((name) => {
      this.form.addControl(name, new UntypedFormControl(null, [Validators.required]));
    });
  }

  onSubmit() {
    const { name, description } = this.form.value;
    this.boardsService
      .createBoard(name, description)
      .subscribe((board) => {
        this.boardsService.boardsSource.pipe(take(1)).subscribe(boards =>
          this.boardsService.boardsSource.next([...boards, board]))
        this.close();
      });
  }

  close() {
    this.modalService.close();
  }
}
