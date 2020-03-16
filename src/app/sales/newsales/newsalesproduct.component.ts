import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { AdminService } from 'src/app/admin/admin.service';
import { SalesService } from '../sales.service';

@Component({
  selector: 'app-newproductsale',
  template: ' <!-- Main Container Starts -->\n' +
    '    <div class="mainContainer m-0">\n' +
    '        <div class="common-row-box">\n' +
    '            <!-- left side starts -->\n' +
    '            <div class="common-left-box common-left-box-1">\n' +
    '                <h3 class="main-comm-head">\n' +
    '                    <a href="./transaction-customer-existing-service.html"><i class="icon-down-arrow com-arw"></i></a>\n' +
    '                    Existing <span>Customer</span>\n' +
    '                </h3>\n' +
    '                <div class="row">\n' +
    '                    <div class="w20 w-1300-40 w-990-30 w-640-40 w-480-100">\n' +
    '                        <h6 class="poptile">Order</h6>\n' +
    '                        <!-- start -->\n' +
    '                        <div class="prof-comm-shad pad-2 mb-3">\n' +
    '                            <div class="comm-cont w100 p-0">\n' +
    '                                <h6>{{orderIdOfSale}}</h6>\n' +
    '                            </div>\n' +
    '                        </div>\n' +
    '                        <!-- end -->\n' +
    '                    </div>\n' +
    '                    <div class="w30 w-1300-60 w-990-40 w-640-60 w-480-100">\n' +
    '                        <h6 class="poptile">customer</h6>\n' +
    '                        <!-- start -->\n' +
    '                        <div class="prof-comm-shad pad-2 mb-3">\n' +
    '                            <div class="comm-cont w100 p-0">\n' +
    '                                <h6>{{customerProfile?.firstName}} {{customerProfile?.lastName}}</h6>\n' +
    '                            </div>\n' +
    '                        </div>\n' +
    '                        <!-- end -->\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '                <!-- Gap -->\n' +
    '                <div class="row mb-4"></div>\n' +
    '                <app-frequentlyproduct></app-frequentlyproduct>\n' +
    '                <app-transactionproduct></app-transactionproduct>\n' +
    '\n' +
    '\n' +
    '            </div>\n' +
    '            <!-- left side Ends -->\n' +
    '            <!-- right side Starts -->\n' +
    '            <div class="common-right-btn"><i class="icon-cart"></i></div>\n' +
    '            <div class="common-right-box">\n' +
    '                <div class="common-right-box-in">\n' +
    '                    <h3 class="main-comm-head">Order <span>Summary</span></h3>\n' +
    '\n' +
    '                    <form action="./transaction-customer-cart.html">\n' +
    '                        <div class="cmn-mdl-content scrollbar">\n' +
    '                            <h6 class="poptile">Services</h6>\n' +
    '                            <!-- start -->\n' +
    '                            <div class="techi-box" *ngFor="let selectedproduct of receivedChildMessage">\n' +
    '                                <div class="techi-top">\n' +
    '                                    <div class="user-det">\n' +
    '                                        <i class="icon-dye prodt-ico"></i>\n' +
    '                                        <div class="usr-name">\n' +
    '                                            <h3><span>Hair Shampoo</span>$ 150</h3>\n' +
    '                                        </div>\n' +
    '                                    </div>\n' +
    '                                </div>\n' +
    '                                <div class="techi-top start border-0">\n' +
    '                                    <p>add on services</p>\n' +
    '                                    <ul>\n' +
    '                                        <li>Hair Spa: <span>$ 45</span>\n' +
    '                                            <div class="addon-remove"><i class="icon-cir-plus"></i></div>\n' +
    '                                        </li>\n' +
    '                                        <li>Nail Art: <span>$ 35</span>\n' +
    '                                            <div class="addon-remove"><i class="icon-cir-plus"></i></div>\n' +
    '                                        </li>\n' +
    '                                    </ul>\n' +
    '                                </div>\n' +
    '                                <div class="techi-remove"><i class="icon-delete"></i></div>\n' +
    '                            </div>\n' +
    '                            <!-- end -->\n' +
    '\n' +
    '                            <h6 class="poptile">Products</h6>\n' +
    '                            <!-- start -->\n' +
    '                            <div class="techi-box"  *ngFor="let selectedproduct of receivedChildMessage">\n' +
    '                                <div class="techi-top">\n' +
    '                                    <div class="user-det">\n' +
    '                                        <i class="icon-dye prodt-ico"></i>\n' +
    '                                        <div class="usr-name">\n' +
    '                                            <h3><span>Hair Shampoo</span>$ 150</h3>\n' +
    '                                        </div>\n' +
    '                                    </div>\n' +
    '                                </div>\n' +
    '                                <div class="techi-top techi-top-qty border-0">\n' +
    '                                    <p>quantity</p>\n' +
    '                                    <div class="container-count-box active">\n' +
    '                                        <button class="count-down" type="button">-</button>\n' +
    '                                        <span class="container-count">02</span>\n' +
    '                                        <button class="count-up" type="button">+</button>\n' +
    '                                    </div>\n' +
    '                                </div>\n' +
    '                                <div class="techi-remove"><i class="icon-delete"></i></div>\n' +
    '                            </div>\n' +
    '                            <!-- end -->\n' +
    '                        </div>\n' +
    '\n' +
    '                        <div class="popBtn mt-0">\n' +
    '                            <a href="./transaction-customer-existing-service.html"\n' +
    '                                class="button line commonPopBtn1">Back</a>\n' +
    '                            <button class="button line commonPopBtn2" type="button">Cancel</button>\n' +
    '                            <button class="button" type="submit">Next</button>\n' +
    '                        </div>\n' +
    '                    </form>\n' +
    '\n' +
    '                </div>\n' +
    '            </div>\n' +
    '            <!-- right side Ends -->\n' +
    '        </div>\n' +
    '    </div>\n' +
    '    <!-- Main Container Ends -->'
})
export class NewSalesProductComponent implements OnInit {
    customerProfile: any;
    receivedChildMessage: Array<any>= [];
  orderIdOfSale: string;

  constructor(private salesService: SalesService, public adminService:AdminService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.getCustomerDetail();
    this.orderIdOfSale = localStorage.getItem('orderId')
  }

  getMessage(message) {
    this.receivedChildMessage = message;
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
