import { Component, OnInit } from '@angular/core';
import {SalesService} from './sales.service';
@Component({
  selector: 'app-allcustomer',
  templateUrl: './allcustomer.component.html'
})

export class AllcustomerComponent implements OnInit {
  customerlist: any;
  customerProfile: any;
  subscription: any;

  constructor( private salesService: SalesService) { }

  ngOnInit() {
    this.getCustomers();
  }

  getCustomers() {
      this.salesService.getCustomers().subscribe((data) => {
        this.customerlist = data['list'];
      });
  }

}
