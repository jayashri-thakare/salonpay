import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import { ModalService } from '../_modal/modal.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CustomerService} from '../customer/customer.service';
import {MessageService} from '../message.service';

@Component({
  selector: 'app-addcustomer',
  styleUrls: ['./customer.component.css'],
  template: '<!-- Main Container Starts -->\n' +
    '    <div class="mainContainer m-0">\n' +
    '        <h3 class="main-comm-head">\n' +
    '            <a href="customer"><i class="icon-down-arrow com-arw"></i></a>\n' +
    '            Add New Customer\n' +
    '        </h3>\n' +
    '\n' +
    '        <form id="newCustomerForm" [formGroup]="addcustomerForm" (ngSubmit)="createCustomer(addcustomerForm.value)">\n' +
    '            <div class="trs-cust-new-box">\n' +
    '                <div class="trs-cust-new-box-in">\n' +
    '                    <h6 class="poptile">CONTACT INFO</h6>\n' +
    '\n' +
    '                    <div class="form-group">\n' +
    '                        <input type="email" id="email1" formControlName="Email" class="form-field" required />\n' +
    '                        <p class="form-label">Email</p>\n' +
    '                    </div>\n' +
    '                    <div class="form-group">\n' +
    '                        <input type="text" id="phone-no" internationalTelNo formControlName="PhoneNumber" class="form-field" minlength="10" required />\n' +
    '                        <p class="form-label">Mobile</p>\n' +
    '                    </div>\n' +
    '\n' +
    '                    <h6 class="poptile">CUSTOMER\'S PROFILE</h6>\n' +
    '\n' +
    '                    <div class="form-group">\n' +
    '                        <input type="text" id="first-name" formControlName="FirstName" class="form-field" required />\n' +
    '                        <p class="form-label">First Name</p>\n' +
    '                    </div>\n' +
    '                    <div class="form-group">\n' +
    '                        <input type="text" id="last-name" formControlName="LastName" class="form-field" required />\n' +
    '                        <p class="form-label">Last Name</p>\n' +
    '                    </div>\n' +
    '                    <h6 class="poptile">BirthDate</h6>\n' +
    '                    <div class="form-group form-field field--not-empty">\n' +
    '                       <ejs-datetimepicker id=\'datetimepicker\' placeholder=\'Birthdate\' formControlName="DateOfBirth" format =\'M/dd/yyyy\'></ejs-datetimepicker>' +
    '                    </div>\n' +
    '\n' +
    '                    <h6 class="poptile">Gender</h6>\n' +
    '                    <div class="radio-box">\n' +
    '                        <input type="radio" id="gen1" formControlName="Gender" value="Male">\n' +
    '                        <label for="gen1">Male</label>\n' +
    '                    </div>\n' +
    '                    <div class="radio-box">\n' +
    '                        <input type="radio" id="gen2" formControlName="Gender" value="Female">\n' +
    '                        <label for="gen2">Female</label>\n' +
    '                    </div>\n' +
    '                    <div class="radio-box">\n' +
    '                        <input type="radio" id="gen3" formControlName="Gender" value="Others">\n' +
    '                        <label for="gen3">Other</label>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '\n' +
    '                <div class="popBtn">\n' +
    '                    <a class="button line" href="customer-grid-view.html">Cancel</a>\n' +
    '                    <button class="button" type="submit">Next</button>\n' +
    '                </div>\n' +
    '\n' +
    '            </div>\n' +
    '        </form>\n' +
    '    </div>\n' +
    '    <!-- Main Container Ends -->'
})
export class AddCustomerComponent implements OnInit {

  addcustomerForm: FormGroup;
  control: FormControl;
  submitted = false;

  constructor(private customerService: CustomerService, private formBuilder: FormBuilder, private modalService: ModalService, private router: Router, private messageService: MessageService) { }

  get f() {
    return this.addcustomerForm.controls;
  }

  ngOnInit() {
    this.addcustomerForm = this.formBuilder.group({
      FirstName:['', [Validators.required]],
      LastName:['', [Validators.required]],
      DateOfBirth:['', [Validators.required]],
      Gender:[''],
      Email:['', [Validators.required]],
      PhoneNumber:['', [Validators.required]]
    });
  }

  createCustomer(customer) {
    debugger;
    console.log(customer)
    // tslint:disable-next-line:triple-equals
    if (this.addcustomerForm.status == 'VALID') {
      this.customerService.add_customer(customer).subscribe((data) => {
        if(data['success'] == 0){
          this.messageService.clear();
          this.messageService.add(data['message'])
        }else if(data['success'] == 1){
          this.customerService.publish('call-customerDetail');
          this.addcustomerForm.reset();
          this.router.navigate(['/customerdashboard'])
          this.customerService.showNav(6);
          this.messageService.clear();
          this.messageService.add('Customer added successfully.')
        }
      });
    } else {
      console.log(customer, this.addcustomerForm.status);
      this.submitted = true;
      if (this.addcustomerForm.invalid) {
        return;
      }
    }
  }

}
