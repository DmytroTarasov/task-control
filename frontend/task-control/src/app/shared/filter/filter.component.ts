import { Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { BoardsService } from 'src/app/_services/boards.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  @ViewChild('filter') filter: ElementRef;
  @Output() sortEvent: EventEmitter<any> = new EventEmitter();
  @Output() filterEvent: EventEmitter<string> = new EventEmitter();
  @Output() resetEvent: EventEmitter<void> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  notifySort(e: Event, sortAsc: HTMLElement, sortDesc: HTMLElement, sortByValue: string,
    filterValue: string) {
    this.sortEvent.emit({
      target: e.target,
      sortAsc,
      sortDesc,
      sortByValue,
      filterValue
    })
  }

  notifyFilter(filterValue: string) {
    this.filterEvent.emit(filterValue);
  }

  notifyResetFilter() {
    this.filter.nativeElement.value = '';
    this.resetEvent.emit();
  }
}
