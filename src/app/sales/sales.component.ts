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
  customertransaction: boolean;

  constructor(private salesService: SalesService) { }

  ngOnInit() {
  }

  customertransactionfunc(type){
    if(type == 'transactionsale'){
      localStorage.setItem('cust', 'false')
    }
  }

}
