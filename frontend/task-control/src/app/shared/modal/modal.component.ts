import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
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
  form!: FormGroup;

  constructor(private modalService: ModalService) {}

  ngOnInit(): void {
    this.display$ = this.modalService.display$;

    this.form = new FormGroup({});

    this.formInputNames.forEach(name => {
      this.form.addControl(
        name,
        new FormControl(null, [Validators.required])
      );
    });
  }

  onSubmit() {
    console.log(this.form);
  }

  close() {
    this.modalService.close();
  }
}
