import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../.././customer.service';
import { FormBuilder } from '@angular/forms';
import { ModalService } from '../../../_modal/modal.service';
import { Router } from '@angular/router';
import { MessageService } from '../../../message.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-customer-communication',
  templateUrl: './communication.component.html'
})

export class CustomerCommunicationComponent implements OnInit {
  customeremail: any;
  email= {};
  subscription: Subscription;

  constructor(private customerService: CustomerService, private formBuilder: FormBuilder, private modalService: ModalService, private router: Router, private messageService: MessageService) { }

  ngOnInit() {
    this.getCustomerEmail();
    this.subscription = this.customerService.on('call-getemail').subscribe(() => this.getCustomerEmail());
  }

  getCustomerEmail() {
    this.email = {
      "customerEmail": "swatit@leotechnosoft.net",
      "accessToken": localStorage.getItem('emailToken'),
      "parentCompanyId": parseInt(localStorage.getItem('companyId'))
    }
    this.customerService.getCustomerEmaiInfo(this.email).subscribe((data) => {
      this.customeremail = data;
      // this.customerProfile = this.customerProfile.result;
      console.log(this.customeremail)
      // localStorage.setItem('companyId', data['ParentCompanyID']);
    });
  }
  customerProfile(customerProfile: any) {
    throw new Error("Method not implemented.");
  }

}