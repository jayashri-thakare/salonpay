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
  customertotalSales: any;

  constructor(private customerService: CustomerService, private formBuilder: FormBuilder, private modalService: ModalService, private router: Router, private messageService: MessageService) { }

  ngOnInit() {
   this.getCustomerRecentSale();
   this.getCustomerRecentAppointment();
   this.getCustomerProfile(localStorage.getItem('Arrayofcustomer'));
   this.getCustomertotalSales();
  }

  getCustomerRecentSale() {
    this.customerService.getCustomerRecentSale().subscribe((data) => {
      this.customerRecentSale = data;
      if(this.customerRecentSale.favoriteProducts[0]){
        this.favproduct= this.customerRecentSale.favoriteProducts[0];
      }
      if(this.customerRecentSale.favoriteServices[0]){
        this.favservice= this.customerRecentSale.favoriteServices[0];
      }
      console.log(this.favproduct, this.favservice)
      // localStorage.setItem('companyId', data['ParentCompanyID']);
    });
  }

  getCustomerRecentAppointment() {
    this.customerService.getCustomerRecentAppointment().subscribe((data) => {
      this.customerRecentAppointment = data;
      // localStorage.setItem('companyId', data['ParentCompanyID']);
    });
  }

  getCustomertotalSales() {
    this.customerService.getCustomertotalSales().subscribe((data) => {
      this.customertotalSales = data;
      // this.receivedChildMessage = this.receivedChildMessage.ordersummaryservices;
      console.log(this.customertotalSales)
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