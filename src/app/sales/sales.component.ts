import { Component, OnInit } from '@angular/core';
import {SalesService} from './sales.service';
@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html'
})

export class SalesComponent implements OnInit {
  customerlist: any;
  customerProfile: any;
  subscription: any;

  constructor(private salesService: SalesService) { }

  ngOnInit() {
  }

}
