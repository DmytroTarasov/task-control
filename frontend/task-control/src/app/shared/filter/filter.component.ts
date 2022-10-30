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

  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
  }

  notifySort(e: Event, sortAsc: HTMLElement, sortDesc: HTMLElement, sortByValue: string,
    filterValue: string) {
    this.setElementColor(sortAsc);
    this.setElementColor(sortDesc);
    this.setElementColor(e.target as HTMLElement, '#C7C8BE');

    this.sortEvent.emit({
      target: e.target,
      sortByValue,
      filterValue
    });
  }

  notifyFilter(filterValue: string) {
    this.filterEvent.emit(filterValue);
  }

  notifyResetFilter(sortAsc: HTMLElement, sortDesc: HTMLElement) {
    this.filter.nativeElement.value = '';
    this.setElementColor(sortAsc);
    this.setElementColor(sortDesc);
    this.resetEvent.emit();
  }

  setElementColor(element: HTMLElement, color: string = '#F0F0F0') {
    this.renderer.setStyle(element, 'background-color', color);
  }

}
