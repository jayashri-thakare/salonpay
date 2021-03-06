import { Component, OnInit } from '@angular/core';
import { CustomerService } from './customer.service';
import { FormBuilder } from '@angular/forms';
import { ModalService } from '../_modal/modal.service';
import { Router } from '@angular/router';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})

export class CustomerComponent implements OnInit {
  customerlist: any;
  customerProfile: any;
  subscription: any;

  constructor(private customerService: CustomerService, private formBuilder: FormBuilder, private modalService: ModalService, private router: Router, private messageService: MessageService) { }

  ngOnInit() {
    this.getCustomerList();
    this.subscription = this.customerService.on('call-customerDetail').subscribe(() => this.getCustomerList());
  }

  callAppointment(id, email){
    debugger;
    localStorage.setItem('appoointmentCustId', id);
    localStorage.setItem('appoointmentCustEmail', email);
    this.router.navigate(['/appointment']);

  }

  getCustomerList() {
    this.customerService.getCustomerList().subscribe((data) => {
      this.customerlist = data;
      this.customerlist = this.customerlist.list;
      console.log(this.customerlist)
      localStorage.setItem('Arrayofcustomer', JSON.stringify(this.customerlist[this.customerlist.length - 1].customerId))
      // localStorage.setItem('companyId', data['ParentCompanyID']);
    });
  }

  getcustomerid(customerid){
    localStorage.setItem('Arrayofcustomer', JSON.stringify(customerid));
  }

}
