import { Component, OnInit } from '@angular/core';
import {SalesService} from './sales.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-allcustomer',
  templateUrl: './allcustomer.component.html'
})

export class AllcustomerComponent implements OnInit {
  customerlist: any;
  customerProfile: any;
  subscription: any;

  constructor( private salesService: SalesService, public router: Router) { }

  ngOnInit() {
    this.getCustomers();
  }

  getCustomers() {
      this.salesService.getCustomers().subscribe((data) => {
        this.customerlist = data['list'];
      });
  }

  getallcustomer() {
    if(this.router.url == '/allcustomer'){
      this.router.navigate(['/getcustomer'])
    }else if(this.router.url == '/allcustomerappointment'){
      this.router.navigate(['/getcustomerappointment'])
    }
}

}
