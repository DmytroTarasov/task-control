import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { Board } from '../_models/board.model';
import { QueryParams } from '../_models/queryParams.model';
import { BoardsService } from '../_services/boards.service';
import { ModalService } from '../_services/modal.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  boards!: Board[];
  @ViewChild('sortAsc') sortAsc: ElementRef;
  @ViewChild('sortDesc') sortDesc: ElementRef;
  @ViewChild('sortBy') sortBy: ElementRef;
  @ViewChild('filter') filter: ElementRef;

  constructor(
    private boardsService: BoardsService,
    private modalService: ModalService,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.boardsService.getBoards();

    this.boardsService.boardsSource.subscribe(
      (boards) => (this.boards = boards)
    );
  }

  openModal() {
    this.modalService.open();
  }

  filterBoards() {
    const queryParams = new QueryParams(null, null, this.filter.nativeElement.value);
    this.boardsService.getBoards(queryParams);
  }

  resetFilter() {
    this.filter.nativeElement.value = '';
    this.boardsService.getBoards();
  }

  sortBoards(e: Event) {
    this.setElementColor(this.sortAsc.nativeElement);
    this.setElementColor(this.sortDesc.nativeElement);
    this.setElementColor(e.target as HTMLElement, '#C7C8BE');

    const queryParams = new QueryParams(
      this.sortBy.nativeElement.value,
      (e.target as HTMLElement).innerText.toLowerCase(),
      this.filter.nativeElement.value
    );
    this.boardsService.getBoards(queryParams);
  }

  setElementColor(
    element: HTMLElement | EventTarget,
    color: string = '#F0F0F0'
  ) {
    this.renderer.setStyle(element, 'background-color', color);
  }
}
