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
    '        <app-statusbar></app-statusbar>\n' +
    '        </div>\n' +
    '\n' +
    '        <!-- start -->\n' +
    '        <div class="table-bdy">\n' +
    '            <!-- start -->\n' +
    '            <div class="tab-top-head">\n' +
    '                <div class="cust-detail-ckbox">\n' +
    '                    <div class="checkbox-box mb-0 mr-2">\n' +
    '                        <input class="selectedId" type="checkbox" id="updt-checkbox1" name="select-all" required="">\n' +
    '                        <label for="updt-checkbox1">&nbsp;</label>\n' +
    '                    </div>\n' +
    '                    <h4 class="gridhead m-0">David Shnader</h4>\n' +
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
    '                    +1-818-269-1084\n' +
    '                </li>\n' +
    '                <!-- end -->\n' +
    '                <!-- start -->\n' +
    '                <li class="table-dta">\n' +
    '                    <span>Email</span>\n' +
    '                    nickbocker@salescorp.com\n' +
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

  constructor(private customerService: CustomerService, private formBuilder: FormBuilder, private modalService: ModalService, private router: Router, private messageService: MessageService) { }

  ngOnInit() {

  }

}
