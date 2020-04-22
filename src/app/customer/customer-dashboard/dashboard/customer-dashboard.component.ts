import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../.././customer.service';
import { FormBuilder } from '@angular/forms';
import { ModalService } from '../../../_modal/modal.service';
import { Router } from '@angular/router';
import { MessageService } from '../../../message.service';

@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './customer-dashboard.component.html'
})

export class CustDashboardComponent implements OnInit {
  customerRecentSale: any;
  customerRecentAppointment: any;
  favproduct: any;
  favservice: any;
  customerProfile: any;

  constructor(private customerService: CustomerService, private formBuilder: FormBuilder, private modalService: ModalService, private router: Router, private messageService: MessageService) { }

  ngOnInit() {
   this.getCustomerRecentSale();
   this.getCustomerRecentAppointment();
   this.getCustomerProfile(localStorage.getItem('Arrayofcustomer'));
  }

  getCustomerRecentSale() {
    this.customerService.getCustomerRecentSale().subscribe((data) => {
      this.customerRecentSale = data;
      if(this.customerRecentSale.favoriteProducts[0]){
        this.favproduct= this.customerRecentSale.favoriteProducts[0];
      }else if(this.customerRecentSale.favoriteServices[0]){
        this.favservice= this.customerRecentSale.favoriteServices[0]
      }
      // localStorage.setItem('companyId', data['ParentCompanyID']);
    });
  }

  getCustomerRecentAppointment() {
    this.customerService.getCustomerRecentAppointment().subscribe((data) => {
      this.customerRecentAppointment = data;
      // localStorage.setItem('companyId', data['ParentCompanyID']);
    });
  }

  getCustomerProfile(customerid) {
    this.customerService.getCustomerProfile(customerid).subscribe((data) => {
      this.customerProfile = data;
      // this.customerProfile = this.customerProfile.result;
      console.log(this.customerProfile)
      // localStorage.setItem('companyId', data['ParentCompanyID']);
    });
  }

}