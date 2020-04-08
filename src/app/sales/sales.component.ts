import { Component, OnInit } from '@angular/core';
import {SalesService} from './sales.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html'
})

export class SalesComponent implements OnInit {
  customerlist: any;
  customerProfile: any;
  subscription: any;
  customertransaction: boolean;

  constructor(private salesService: SalesService,public router: Router) { }

  ngOnInit() {
  }

  customertransactionfunc(type){
    if(type == 'transactionsale'){
      localStorage.setItem('cust', 'false')
    }
  }

  customerselect(){
    if(this.router.url == '/customerappointment'){
      this.router.navigate(['/allcustomerappointment'])
    }else if(this.router.url == '/newsales'){
      this.router.navigate(['/allcustomer'])
    }
  }

}
