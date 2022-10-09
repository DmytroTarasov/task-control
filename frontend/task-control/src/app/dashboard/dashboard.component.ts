import { Component, OnInit } from '@angular/core';
import { User } from '../_models/user.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user!: User;

  constructor() { }

  ngOnInit(): void {
  }

}
