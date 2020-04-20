import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../.././customer.service';
import { FormBuilder } from '@angular/forms';
import { ModalService } from '../../../_modal/modal.service';
import { Router } from '@angular/router';
import { MessageService } from '../../../message.service';

@Component({
  selector: 'app-customer-history',
  templateUrl: './history.component.html'
})

export class CustomerHistoryComponent implements OnInit {
  customerHistory: any;
  customerProfile: any;

  constructor(private customerService: CustomerService, private formBuilder: FormBuilder, private modalService: ModalService, private router: Router, private messageService: MessageService) { }

  ngOnInit() {
    this.getCustomerHistory(localStorage.getItem('Arrayofcustomer'));
    this.getCustomerProfile(localStorage.getItem('Arrayofcustomer'));
  }

  getCustomerHistory(customerid) {
    this.customerService.getCustomerHistory(customerid).subscribe((data) => {
      this.customerHistory = data;
      this.customerHistory = this.customerHistory.list;
      console.log(this.customerHistory)
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