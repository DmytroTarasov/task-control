import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private displaySource = new BehaviorSubject<boolean>(false);
  display$ = this.displaySource.asObservable();

  open() {
    this.displaySource.next(true);
  }

  close() {
    this.displaySource.next(false);
  }
}
