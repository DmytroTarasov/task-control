import { Component, Input, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { BoardsService } from 'src/app/_services/boards.service';
import { ModalService } from 'src/app/_services/modal.service';
import { TasksService } from 'src/app/_services/tasks.service';

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
  display$!: Observable<boolean>;
  form!: FormGroup;

  constructor(
    private modalService: ModalService,
    private boardsService: BoardsService,
    private tasksService: TasksService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.display$ = this.modalService.display$;

    this.form = new FormGroup({});

    this.formInputNames.forEach((name) => {
      this.form.addControl(
        name,
        new FormControl(null, [Validators.required])
      );
    });
  }

  onSubmit() {
    if (this.mode === 'board') {
      const { name, description } = this.form.value;
      this.boardsService.createBoard(name, description).subscribe((board) => {
        this.boardsService.boardsSource.pipe(take(1)).subscribe((boards) => {
          this.boardsService.boardsSource.next([...boards, board]);
        });
        this.close();
      });
    } else if (this.mode === 'task') {
      const { name } = this.form.value;
      this.tasksService
        .createTask({
          name: name,
          status: this.taskStatus,
          board: this.route.snapshot.params['boardId'],
        })
        .subscribe((task) => {
          this.boardsService.selectedBoardSource
            .pipe(take(1))
            .subscribe((board) => {
              board.tasks = [...board.tasks, task];
              this.boardsService.selectedBoardSource.next(board);
            });
          this.form.reset();
          this.close();
        });
    }
  }

  close() {
    this.form.reset();
    this.modalService.close();
  }
}
