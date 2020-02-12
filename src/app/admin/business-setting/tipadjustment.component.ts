import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import { ModalService } from '../../_modal/modal.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AdminService} from '../admin.service';
import {MessageService} from '../../message.service';
import { Subscription } from 'rxjs';
import { UserdataService } from 'src/app/userdata.service';

@Component({
  selector: 'app-tipadjustment',
  template: ' <!-- Main Container Starts -->\n' +
  '  <div *ngIf="AdminService.navTab==9">\n' +
  '  <div *ngIf="AdminService.business_settingnav==1">\n' +
  '    <div class="mainContainer">\n' +
  '\n' +
  '        <div class="busi-set">\n' +
  '\n' +
  '            <div class="busi-set-lef">\n' +
  '                <h3 class="main-comm-head">Business Settings</h3>\n' +
  '\n' +
  '                <!-- business nav start -->\n' +
  '                <div class="busi-lis-swipe">\n' +
  '                    <!-- start -->\n' +
  '                    <div class="busi-affix busi-nav">\n' +
  '                        <ul>\n' +
  '                            <li class="active"><a href="admin-business-settings-tip.html">Tip Adjustment</a></li>\n' +
  '                            <li><a href="admin-business-settings-staff.html">Staff</a></li>\n' +
  '                            <li><a href="admin-business-settings-inventory.html">Inventory</a></li>\n' +
  '                            <li><a href="admin-business-settings-customer.html">Customer</a></li>\n' +
  '                            <li><a href="admin-business-settings-coupon.html">Coupon</a></li>\n' +
  '                            <li><a href="admin-business-settings-review.html">Review</a></li>\n' +
  '                        </ul>\n' +
  '                    </div>\n' +
  '                    <!-- end -->\n' +
  '                </div>\n' +
  '                <!-- business nav end -->\n' +
  '\n' +
  '                <h6 class="comm-subhdn">Tip Adjustment</h6>\n' +
  '                <!-- start -->\n' +
  '                <div class="row">\n' +
  '                    <div class="admin-busi w30 w-1660-50 w-990-40 w-480-100">\n' +
  '                        <div class="pro-comm-fle">\n' +
  '                            <h6>Business Profile</h6>\n' +
  '                            <i class="icon-edit grd-icon side-menu" (click)="modalService.open1(\'edit-name\')"></i>\n' +
  '                        </div>\n' +
  '                        <!-- start -->\n' +
  '                        <div class="usr-pro-box">\n' +
  '                            <!-- start -->\n' +
  '                            <div class="usr-pro-top busi-pro">\n' +
  '                                <!-- upload end -->\n' +
  '                                <h6>{{businesstipadjustment.businessName}} Salon Pay</h6>\n' +
  '                            </div>\n' +
  '                            <!-- end -->\n' +
  '                        </div>\n' +
  '                    </div>\n' +
  '\n' +
  '                    <div class="admin-busi w30 w-1660-50 w-990-60 w-480-100">\n' +
  '                        <div class="pro-comm-fle">\n' +
  '                            <h6>Contact</h6>\n' +
  '                            <i class="icon-edit grd-icon side-menu" (click)="modalService.open1(\'edit-contact\')"></i>\n' +
  '                        </div>\n' +
  '\n' +
  '                        <!-- start -->\n' +
  '                        <div class="prof-comm-shad">\n' +
  '                            <div class="comm-cont w100 mb-4 p-0">\n' +
  '                                <p>Work</p>\n' +
  '                                <h6>{{businesstipadjustment.workContact}}</h6>\n' +
  '                            </div>\n' +
  '                            <div class="comm-cont w100 mb-4 p-0">\n' +
  '                                <p>Work Email</p>\n' +
  '                                <h6>{{businesstipadjustment.email}}</h6>\n' +
  '                            </div>\n' +
  '                        </div>\n' +
  '                        <!-- end -->\n' +
  '                    </div>\n' +
  '\n' +
  '                    <div class="admin-busi w40 w-1660-60 w-768-100">\n' +
  '                        <div class="pro-comm-fle">\n' +
  '                            <h6>Address</h6>\n' +
  '                            <i class="icon-edit grd-icon side-menu" (click)="modalService.open1(\'side-menu-address\')"></i>\n' +
  '                        </div>\n' +
  '\n' +
  '                        <!-- start -->\n' +
  '                        <div class="prof-comm-shad">\n' +
  '                            <div class="comm-cont w100 mb-4 p-0">\n' +
  '                                <p>Address Line 1</p>\n' +
  '                                <h6>{{businesstipadjustment.addressLine1}}</h6>\n' +
  '                            </div>\n' +
  '                            <div class="comm-cont w100 mb-4 p-0">\n' +
  '                                <p>Address Line 2</p>\n' +
  '                                <h6>{{businesstipadjustment.addressLine2}}</h6>\n' +
  '                            </div>\n' +
  '                            <div\n' +
  '                                class="comm-cont w33 w-1200-50 mb-1200-20 w33 w-990-33 mb-990-0 w-480-50 mb-480-20 p-0">\n' +
  '                                <p>City</p>\n' +
  '                                <h6>{{businesstipadjustment.cityName}}</h6>\n' +
  '                            </div>\n' +
  '                            <div\n' +
  '                                class="comm-cont w33 w-1200-50 mb-1200-20 w33 w-990-33 mb-990-0 w-480-50 mb-480-20 p-0">\n' +
  '                                <p>State</p>\n' +
  '                                <h6>{{businesstipadjustment.stateName}}</h6>\n' +
  '                            </div>\n' +
  '                            <div class="comm-cont w33 w-1200-50 w-990-33 w-480-50 p-0">\n' +
  '                                <p>Zip Code</p>\n' +
  '                                <h6>{{businesstipadjustment.zipcode}}</h6>\n' +
  '                            </div>\n' +
  '                        </div>\n' +
  '                        <!-- end -->\n' +
  '                    </div>\n' +
  '\n' +
  '                    <div class="admin-busi w40 w-768-100">\n' +
  '                        <div class="pro-comm-fle">\n' +
  '                            <h6>Timezone</h6>\n' +
  '                            <i class="icon-edit grd-icon side-menu" (click)="modalService.open1(\'account-setting\')"></i>\n' +
  '                        </div>\n' +
  '\n' +
  '                        <!-- start -->\n' +
  '                        <div class="prof-comm-shad">\n' +
  '                            <div class="comm-cont w100 p-0">\n' +
  '                                <p>Timezone</p>\n' +
  '                                <h6>{{businesstipadjustment.timeZoneName}}</h6>\n' +
  '                            </div>\n' +
  '                        </div>\n' +
  '                        <!-- end -->\n' +
  '                    </div>\n' +
  '\n' +
  // '                    <div class="admin-busi w25 w-1660-40 w-768-100">\n' +
  // '                        <div class="pro-comm-fle">\n' +
  // '                            <h6>Salon Management Fee</h6>\n' +
  // '                            <i class="icon-edit grd-icon side-menu" data-name="side-menu-management"></i>\n' +
  // '                        </div>\n' +
  // '\n' +
  // '                        <!-- start -->\n' +
  // '                        <div class="prof-comm-shad">\n' +
  // '                            <div class="comm-cont w100 p-0">\n' +
  // '                                <p>Value</p>\n' +
  // '                                <h6>$ 750</h6>\n' +
  // '                            </div>\n' +
  // '                        </div>\n' +
  // '                        <!-- end -->\n' +
  // '                    </div>\n' +
  '\n' +
  '                </div>\n' +
  '                <!-- end -->\n' +
  '            </div>\n' +
  '\n' +
  '            <div class="busi-set-rig">\n' +
  '                <!-- start -->\n' +
  '                <div class="busi-affix">\n' +
  '                    <ul>\n' +
  '                        <li class="active"><a (click)="AdminService.showBusinessNav(1)">Tip Adjustment</a></li>\n' +
  '                        <li><a (click)="AdminService.showBusinessNav(2)">Staff</a></li>\n' +
  '                        <li><a (click)="AdminService.showBusinessNav(3)">Inventory</a></li>\n' +
  '                        <li><a (click)="AdminService.showBusinessNav(4)">Customer</a></li>\n' +
  '                        <li><a (click)="AdminService.showBusinessNav(5)">Coupon</a></li>\n' +
  '                        <li><a (click)="AdminService.showBusinessNav(6)">Review</a></li>\n' +
  '                        <li><a (click)="AdminService.showBusinessNav(7)">Tax Table</a></li>\n' +
  '                        <li ><a (click)="AdminService.showBusinessNav(8)">Services Category</a></li>\n' +
  '                        <li><a (click)="AdminService.showBusinessNav(9)">Turn Count</a></li>\n' +
  '                        <li ><a (click)="AdminService.showBusinessNav(10)">Experience Level</a></li>\n' +
  '                        <li ><a (click)="AdminService.showBusinessNav(11)">Pay Period</a></li>\n' +

    '                    </ul>\n' +
  '                </div>\n' +
  '                <!-- end -->\n' +
  '            </div>\n' +
  '\n' +
  '        </div>\n' +
  '\n' +
  '    </div>\n' +
  '   </div>\n' +
  '   </div>\n' +
  '    <!-- Main Container Ends -->\n' +
  '    <address-modal [businesstipadjustment]="businesstipadjustment"></address-modal>\n' +
  '    <account-modal [businesstipadjustment]="businesstipadjustment"></account-modal>' +
  '    <editcontact-modal [businesstipadjustment]="businesstipadjustment"></editcontact-modal>\n' +
  '    <editname-modal [businesstipadjustment]="businesstipadjustment"></editname-modal>\n'
})
export class BusinessTipAdjustmentComponent implements OnInit {
  businesstipadjustment: any;
  subscription: Subscription;
  constructor(public userdataService: UserdataService, public AdminService: AdminService, private formBuilder: FormBuilder, private modalService: ModalService, private router: Router, private messageService: MessageService) { }

  ngOnInit() {
    this.getTipAdjustment();
    this.subscription = this.AdminService.on('call-profiledetail').subscribe(() => this.getTipAdjustment());
  }

  getTipAdjustment() {
    this.AdminService.GetTipAdjustmentList().subscribe((data) => {
      this.businesstipadjustment = data;
      // this.businesstipadjustment = this.businesstipadjustment.result;
      console.log(this.businesstipadjustment)
      // localStorage.setItem('companyId', data['ParentCompanyID']);
    });
  }

}
