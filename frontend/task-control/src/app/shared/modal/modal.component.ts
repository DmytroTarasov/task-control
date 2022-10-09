import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ModalService } from 'src/app/_services/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit {
  display$!: Observable<boolean>

  constructor(private modalService: ModalService) {}

  ngOnInit(): void {
    this.display$ = this.modalService.display$;
  }

  close() {
    this.modalService.close();
  }
}
