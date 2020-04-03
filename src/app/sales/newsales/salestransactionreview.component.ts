import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { AdminService } from 'src/app/admin/admin.service';
import { SalesService } from '../sales.service';
import { MessageService } from 'src/app/message.service';

@Component({
  selector: 'sales-review',
  template:'<!-- Main Container Starts -->\n' +
    '        <div class="mainContainer m-0">\n' +
    '            <h3 class="main-comm-head">\n' +
    '                <a href="./transaction-customer-tip-adjustment.html"><i class="icon-down-arrow com-arw"></i></a>\n' +
    '                Existing <span>Customer</span>\n' +
    '            </h3>\n' +
    '            <div class="row">\n' +
    '                <div class="w20 w-990-30 w-640-40 w-480-100">\n' +
    '                    <h6 class="poptile">Order</h6>\n' +
    '\n' +
    '                    <!-- start -->\n' +
    '                    <div class="prof-comm-shad pad-2 mb-3">\n' +
    '                        <div class="comm-cont w100 p-0">\n' +
    '                            <h6>{{orderIdOfSale}}</h6>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                    <!-- end -->\n' +
    '                </div>\n' +
    '                <div class="w30 w-990-40 w-640-60 w-480-100">\n' +
    '                    <h6 class="poptile">customer</h6>\n' +
    '\n' +
    '                    <!-- start -->\n' +
    '                    <div class="prof-comm-shad pad-2 mb-3">\n' +
    '                        <div class="comm-cont w100 p-0">\n' +
    '                            <h6>{{customerProfile?.firstName}} {{customerProfile?.lastName}}</h6>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                    <!-- end -->\n' +
    '                </div>\n' +
    '            </div>\n' +
    '            <!-- Gap -->\n' +
    '            <div class="row mb-4"></div>\n' +
    '\n' +
    '            <!-- start -->\n' +
    '            <div class="bank-box bank-box-1">\n' +
    '                <img src="../assets/img/customer-review.png" alt="image missing">\n' +
    '                <div class="bank-cont mb-5">\n' +
    '                    <h2>Customer Review</h2>\n' +
    '                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.\n' +
    '                        The industry\'s standard dummy text ever since the 1500s, when an unknown printer.</p>\n' +
    '                </div>\n' +
    '                <div class="popBtn reviewPopBtn">\n' +
    '                    <a href="#" class="button line">Email Review Link</a>\n' +
    '                    <a href="#" class="button">Post Review Now</a>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '            <!-- end -->\n' +
    '\n' +
    '            <button class="button line skipBtn">Skip</button>\n' +
    '\n' +
    '\n' +
    '        </div>\n' +
    '        <!-- Main Container Ends -->'
})
export class ReviewSalesComponent implements OnInit {
    customerProfile: any;
    orderIdOfSale: string;

  constructor(public messageService: MessageService, private salesService: SalesService, public adminService:AdminService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.getCustomerDetail();
    this.orderIdOfSale = localStorage.getItem('orderId');
  }

  getCustomerDetail() {
    this.salesService.getCustomerDetails().subscribe((data) => {
      this.customerProfile = data;
      // this.customerProfile = this.customerProfile.result;
      console.log(this.customerProfile)
      // localStorage.setItem('companyId', data['ParentCompanyID']);
    });
  }

}
