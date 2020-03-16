import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable, Subscription} from 'rxjs';
import {SalesService} from './sales.service';

@Component({
  selector: 'customersale',
  template: '    <!-- Main Container Starts -->\n' +
    '    <div class="mainContainer m-0">\n' +
    '        <h3 class="main-comm-head">\n' +
    '            <a href="./transaction-customer-existing.html"><i class="icon-down-arrow com-arw"></i></a>\n' +
    '            New <span>Sale</span>\n' +
    '        </h3>\n' +
    '\n' +
    '        <div class="trs-cust-new-box">\n' +
    '            <h6 class="poptile">SEARCH FOR CUSTOMER</h6>\n' +
    '\n' +
    '            <div class="form-group">\n' +
    '                <input type="text" id="name-field" name="name-field" (input)="searchCustomer($event.target.value)"\n' +
    '                    class="form-field field--not-empty" required />\n' +
    '                <div class="input-clear"><i class="icon-cross"></i></div>\n' +
    '                <p class="form-label">Name / Mobile / Email</p>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '        <!-- start -->\n' +
    '        <div class="srch-cust-det-box">\n' +
    '            <div class="row">\n' +
    '                <div class="usr-pro-box-flex usr-pro-box-flex-1">\n' +
    '                    <!-- start -->\n' +
    '                    <div class="usr-pro-box">\n' +
    '                        <!-- start -->\n' +
    '                        <div class="usr-pro-top">\n' +
    '                            <!-- upload start -->\n' +
    '                            <div class="avatar-upload">\n' +
    '                                <div class="avatar-edit">\n' +
    '                                    <input type=\'file\' id="imageUpload" accept=".png, .jpg, .jpeg" />\n' +
    '                                    <label for="imageUpload"><i class="icon-uploading grd-icon"></i></label>\n' +
    '                                </div>\n' +
    '                                <div class="avatar-preview">\n' +
    '                                    <div id="imagePreview" style="background-image: url(img/usr-profile.svg);">\n' +
    '                                    </div>\n' +
    '                                </div>\n' +
    '                            </div>\n' +
    '                            <!-- upload end -->\n' +
    '                            <h6> {{customerProfile?.firstName}} {{customerProfile?.lastName}}</h6>\n' +
    '                        </div>\n' +
    '                        <!-- end -->\n' +
    '                        <div class="usr-pro-btm">\n' +
    '                            <div class="comm-cont">\n' +
    '                                <p>Birthdate</p>\n' +
    '                                <h6>{{customerProfile?.dateOfBirth | date: \'M/d/yyyy\'}}</h6>\n' +
    '                            </div>\n' +
    '                            <div class="comm-cont">\n' +
    '                                <p>Gender</p>\n' +
    '                                <h6>{{customerProfile?.gender}}</h6>\n' +
    '                            </div>\n' +
    '                        </div>\n' +
    '                        <!-- end -->\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '\n' +
    '                <div class="usr-pro-box-flex usr-pro-box-flex-1">\n' +
    '                    <div class="pro-comm-fle">\n' +
    '                        <h6>Contact</h6>\n' +
    '                    </div>\n' +
    '\n' +
    '                    <!-- start -->\n' +
    '                    <div class="prof-comm-shad">\n' +
    '                        <div class="comm-cont w100 p-0 mb-4">\n' +
    '                            <p>Mobile</p>\n' +
    '                            <h6>{{customerProfile?.mobileContact}}</h6>\n' +
    '                        </div>\n' +
    '                        <div class="comm-cont w100 p-0 mb-4">\n' +
    '                            <p>Work</p>\n' +
    '                            <h6>{{customerProfile?.workContact}}</h6>\n' +
    '                        </div>\n' +
    '                        <div class="comm-cont w100 p-0">\n' +
    '                            <p>Home</p>\n' +
    '                            <h6>{{customerProfile?.homeContact}}</h6>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                    <!-- end -->\n' +
    '                </div>\n' +
    '\n' +
    '                <div class="usr-pro-box-flex usr-pro-box-flex-2">\n' +
    '                    <div class="pro-comm-fle">\n' +
    '                        <h6>Address</h6>\n' +
    '                    </div>\n' +
    '\n' +
    '                    <!-- start -->\n' +
    '                    <div class="prof-comm-shad">\n' +
    '                        <div class="comm-cont w100 p-0 mb-4">\n' +
    '                            <p>Address Line 1</p>\n' +
    '                            <h6>{{customerProfile?.addressLine1}}</h6>\n' +
    '                        </div>\n' +
    '                        <div class="comm-cont w100 p-0 mb-4">\n' +
    '                            <p>Address Line 2</p>\n' +
    '                            <h6>{{customerProfile?.addressLine2}}</h6>\n' +
    '                        </div>\n' +
    '                        <div class="comm-cont w33 w-480-50 mb-480-30 p-0">\n' +
    '                            <p>City</p>\n' +
    '                            <h6>{{customerProfile?.cityName}}</h6>\n' +
    '                        </div>\n' +
    '                    <div class="comm-cont w33 w-480-50 mb-480-30 p-0">\n' +
    '                        <p>Country</p>\n' +
    '                        <h6>{{customerProfile?.countryName}}</h6>\n' +
    '                    </div>\n' +
    '                        <div class="comm-cont w33 w-480-50 mb-480-30 p-0">\n' +
    '                            <p>State</p>\n' +
    '                            <h6>{{customerProfile?.stateName}}</h6>\n' +
    '                        </div>\n' +
    '                        <div class="comm-cont w33 w-480-50 p-0">\n' +
    '                            <p>Zip Code</p>\n' +
    '                            <h6>{{customerProfile?.zipcode}}</h6>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                    <!-- end -->\n' +
    '                </div>\n' +
    '\n' +
    '                <div class="usr-pro-box-flex usr-pro-box-flex-3">\n' +
    '                    <div class="pro-comm-fle">\n' +
    '                        <h6>Email</h6>\n' +
    '                    </div>\n' +
    '\n' +
    '                    <!-- start -->\n' +
    '                    <div class="prof-comm-shad mb-3">\n' +
    '                        <div class="comm-cont w100 p-0">\n' +
    '                            <p>Email</p>\n' +
    '                            <h6>{{customerProfile?.email}}</h6>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                    <!-- end -->\n' +
    '\n' +
    '                    <div class="row mt-4">\n' +
    '                        <div class="col-6">\n' +
    '                        </div>\n' +
    '                        <div class="col-6">\n' +
    '                            <div class="pro-comm-fle">\n' +
    '                                <h6>Status</h6>\n' +
    '                            </div>\n' +
    '\n' +
    '                            <!-- start -->\n' +
    '                            <div class="prof-comm-shad mb-3">\n' +
    '                                <div class="comm-cont w100 p-0">\n' +
    '                                    <h6>Active</h6>\n' +
    '                                </div>\n' +
    '                            </div>\n' +
    '                            <!-- end -->\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '        <!-- end -->\n' +
    '\n' +
    '        <div class="popBtn mb-4">\n' +
    '            <a href="./transaction-customer-existing.html" class="button line">Back</a>\n' +
    '            <a class="button" (click)="createSaleOrder(customerProfile.customerId)">Next</a>\n' +
    '        </div>\n' +
    '\n' +
    '    </div>\n' +
    '    <!-- Main Container Ends -->'
})
export class CustomerSaleComponent implements OnInit {
  private customerProfile: Observable<any>;
  Sales = {};
  saleorder: Observable<any>;
  constructor(public salesService: SalesService, private formBuilder: FormBuilder, public router: Router) { }

  ngOnInit() {
    this.getCustomerDetail();
  }


  getCustomerDetail() {
    this.salesService.getCustomerDetails().subscribe((data) => {
      this.customerProfile = data;
      // this.customerProfile = this.customerProfile.result;
      console.log(this.customerProfile)
      // localStorage.setItem('companyId', data['ParentCompanyID']);
    });
  }
  searchCustomer(name){
    this.salesService.searchCustomer(name).subscribe((data) => {
      // this.id = data['id'];
      debugger;
      this.salesService.customid = data['id'];
      if (data['id']){
        this.getCustomerDetail();
      }
    });
  }

  createSaleOrder(customerid) {
    this.Sales['CustomerId'] = customerid
    this.salesService.create_sales(this.Sales).subscribe((data) => {
      this.saleorder = data;
      localStorage.setItem('orderId', data['saleId']);
      this.router.navigate(['/transactionnewsales'])
    });
  }
}
