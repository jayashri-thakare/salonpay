import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../.././customer.service';
import { FormBuilder } from '@angular/forms';
import { ModalService } from '../../../_modal/modal.service';
import { Router } from '@angular/router';
import { MessageService } from '../../../message.service';

@Component({
  selector: 'app-customer-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['../../customer.component.css']
})

export class CustomerProfileComponent implements OnInit {
  customerProfile: any;
  subscription: any;

  constructor(private customerService: CustomerService, private formBuilder: FormBuilder, private modalService: ModalService, private router: Router, private messageService: MessageService) { }

  ngOnInit() {
    this.getCustomerProfile(localStorage.getItem('Arrayofcustomer'));
    this.customerService.getCustomerProfilePic(localStorage.getItem('userId'));
    this.subscription = this.customerService.on('call-profileDetail').subscribe(() => this.getCustomerProfile(localStorage.getItem('Arrayofcustomer')));
  
  }

  getCustomerProfile(customerid) {
    debugger;
    this.customerService.getCustomerProfile(customerid).subscribe((data) => {
      this.customerProfile = data;
      // this.customerProfile = this.customerProfile.result;
      console.log(this.customerProfile)
      // localStorage.setItem('companyId', data['ParentCompanyID']);
    });
  }

}