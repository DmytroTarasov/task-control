import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/_services/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css'],
})
export class LoaderComponent implements OnInit {
  loading!: boolean;

  constructor(private loaderService: LoaderService) {}

  ngOnInit(): void {
    this.loaderService.isLoading.subscribe((value) => {
      this.loading = value;
    });
  }
}
