import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import { ModalService } from '../_modal/modal.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CustomerService} from '../customer/customer.service';
import {MessageService} from '../message.service';

@Component({
  selector: 'app-updatecustomer',
  template: ' <!-- Main Container Starts -->\n' +
    '    <div class="mainContainer m-0 main-container-flg">\n' +
    '        <div class="comm-headline-btn customer-headline">\n' +
    '            <h3 class="main-comm-head m-0">Customers<i class="icon-question rig-icn" data-toggle="tooltip"\n' +
    '                    title="Merge Sales"></i>\n' +
    '            </h3>\n' +
    '        <app-statusbar (messageToEmit)="getMessage($event)" [customerupdate]= "customerupdate"></app-statusbar>\n' +
    '        </div>\n' +
    '\n' +
    '        <!-- start -->\n' +
    '        <div class="table-bdy" *ngFor="let customer of customerlist">\n' +
    '            <!-- start -->\n' +
    '            <div class="tab-top-head">\n' +
    '                <div class="cust-detail-ckbox">\n' +
    '                    <div class="checkbox-box mb-0 mr-2">\n' +
    '                        <input class="selectedId" type="checkbox" id="{{customer?.id}}" [checked]="receivedChildMessage" (click)="selectedCustomersList(customer, $event)" name="{{customer?.id}}" required="">\n' +
    '                        <label for="{{customer?.id}}">&nbsp;</label>\n' +
    '                    </div>\n' +
    '                    <h4 class="gridhead m-0">{{customer?.firstName}} {{customer?.lastName}}</h4>\n' +
    '                </div>\n' +
    '                <div class="cust-cald-arrw">\n' +
    '                    <a href="appointment-date.html"><i class="icon-calender"></i></a>\n' +
    '                    <a href="customerdashboard"><i class="icon-right-arrow"></i></a>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '            <!-- end -->\n' +
    '\n' +
    '            <ul class="table-rw">\n' +
    '                <!-- start -->\n' +
    '                <li class="table-dta">\n' +
    '                    <span>Mobile</span>\n' +
    '                    {{customer?.mobileContact}}\n' +
    '                </li>\n' +
    '                <!-- end -->\n' +
    '                <!-- start -->\n' +
    '                <li class="table-dta">\n' +
    '                    <span>Email</span>\n' +
    '                    {{customer?.email}}\n' +
    '                </li>\n' +
    '                <!-- end -->\n' +
    '                <!-- start -->\n' +
    '                <li class="table-dta">\n' +
    '                    <span>Appointments</span>\n' +
    '                    5\n' +
    '                </li>\n' +
    '                <!-- end -->\n' +
    '                <!-- start -->\n' +
    '                <li class="table-dta">\n' +
    '                    <span>Sales Amount</span>\n' +
    '                    $324\n' +
    '                </li>\n' +
    '                <!-- end -->\n' +
    '                <!-- start -->\n' +
    '                <li class="table-dta">\n' +
    '                    <span>Rewards</span>\n' +
    '                    56\n' +
    '                </li>\n' +
    '                <!-- end -->\n' +
    '                <!-- start -->\n' +
    '                <li class="table-dta">\n' +
    '                    <span>Favorite Technician</span>\n' +
    '                    Maya Didas\n' +
    '                </li>\n' +
    '                <!-- end -->\n' +
    '            </ul>\n' +
    '        </div>\n' +
    '        <!-- end -->\n' +
    '    </div>\n' +
    '    <!-- Main Container Ends -->'
})
export class UpdateCustomerComponent implements OnInit {
  arrayofselectedobj: Array<any> = [];
  customerlist: any;
  subscription: any;
  receivedChildMessage: boolean;
  customerUpdate: boolean;

  constructor(private customerService: CustomerService, private formBuilder: FormBuilder, private modalService: ModalService, private router: Router, private messageService: MessageService) { }

  ngOnInit() {
    this.getCustomerList();
    this.subscription = this.customerService.on('call-customerupdate').subscribe(() => this.selectedCustomersList(this.customerlist, ''));
  }

  getCustomerList() {
    this.customerService.getCustomerList().subscribe((data) => {
      this.customerlist = data;
      this.customerlist = this.customerlist.list;
      console.log(this.customerlist)
      localStorage.setItem('Arrayofcustomer', JSON.stringify(this.customerlist[this.customerlist.length - 1].id))
      // localStorage.setItem('companyId', data['ParentCompanyID']);
    });
  }

  selectedCustomersList(selected_obj, event){
    debugger;
    var index = this.arrayofselectedobj.indexOf(selected_obj);
    if (selected_obj.length == this.customerlist.length){
      if(this.receivedChildMessage == true){
        this.arrayofselectedobj = selected_obj;
      }else{
        this.arrayofselectedobj = [];
      }
    }else if(index<0 && event.currentTarget.checked){
      this.arrayofselectedobj.push(selected_obj);
    }else{
      this.arrayofselectedobj.splice(index, 1);
      this.customerUpdate = false;
    }
    console.log(this.arrayofselectedobj)
  }

  getMessage(message) {
    this.receivedChildMessage = message;
    console.log(this.receivedChildMessage)
  }

}
