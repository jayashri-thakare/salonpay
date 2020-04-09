import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../.././customer.service';
import { FormBuilder } from '@angular/forms';
import { ModalService } from '../../../_modal/modal.service';
import { Router } from '@angular/router';
import { MessageService } from '../../../message.service';

@Component({
  selector: 'app-customer-sales',
  templateUrl: './sales.component.html'
})

export class CustomerSalesComponent implements OnInit {
  customerSales: any;

  constructor(private customerService: CustomerService, private formBuilder: FormBuilder, private modalService: ModalService, private router: Router, private messageService: MessageService) { }

  ngOnInit() {
   this.getCustomerSales();
  }

  getCustomerSales() {
    this.customerService.getCustomerSales().subscribe((data) => {
      this.customerSales = data;
      // this.receivedChildMessage = this.receivedChildMessage.ordersummaryservices;
      console.log(this.customerSales)
      // localStorage.setItem('companyId', data['ParentCompanyID']);
    });
  }

}