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
  '                            <i class="icon-edit grd-icon side-menu" data-name="side-menu-userprofile"></i>\n' +
  '                        </div>\n' +
  '                        <!-- start -->\n' +
  '                        <div class="usr-pro-box">\n' +
  '                            <!-- start -->\n' +
  '                            <div class="usr-pro-top busi-pro">\n' +
  '                                <!-- upload start -->\n' +
  '                                <div class="avatar-upload">\n' +
  '                                    <div class="avatar-edit">\n' +
  '                                        <input type=\'file\' id="imageUpload" accept=".png, .jpg, .jpeg" />\n' +
  '                                        <label for="imageUpload"><i class="icon-uploading grd-icon"></i></label>\n' +
  '                                    </div>\n' +
  '                                    <div class="avatar-preview">\n' +
  '                                        <div id="imagePreview" style="background-image: url(../../../assets/img/usr-profile.svg);">\n' +
  '                                        </div>\n' +
  '                                    </div>\n' +
  '                                </div>\n' +
  '                                <!-- upload end -->\n' +
  '                                <h6>Salon Pay</h6>\n' +
  '                            </div>\n' +
  '                            <!-- end -->\n' +
  '                        </div>\n' +
  '                    </div>\n' +
  '\n' +
  '                    <div class="admin-busi w30 w-1660-50 w-990-60 w-480-100">\n' +
  '                        <div class="pro-comm-fle">\n' +
  '                            <h6>Contact</h6>\n' +
  '                            <i class="icon-edit grd-icon side-menu" data-name="side-menu-contact"></i>\n' +
  '                        </div>\n' +
  '\n' +
  '                        <!-- start -->\n' +
  '                        <div class="prof-comm-shad">\n' +
  '                            <div class="comm-cont w100 mb-4 p-0">\n' +
  '                                <p>Work</p>\n' +
  '                                <h6>1-541-754-3010</h6>\n' +
  '                            </div>\n' +
  '                            <div class="comm-cont w100 mb-4 p-0">\n' +
  '                                <p>Work Email</p>\n' +
  '                                <h6>nickbocker@salescorp.com</h6>\n' +
  '                            </div>\n' +
  '                        </div>\n' +
  '                        <!-- end -->\n' +
  '                    </div>\n' +
  '\n' +
  '                    <div class="admin-busi w40 w-1660-60 w-768-100">\n' +
  '                        <div class="pro-comm-fle">\n' +
  '                            <h6>Address</h6>\n' +
  '                            <i class="icon-edit grd-icon side-menu" data-name="side-menu-address"></i>\n' +
  '                        </div>\n' +
  '\n' +
  '                        <!-- start -->\n' +
  '                        <div class="prof-comm-shad">\n' +
  '                            <div class="comm-cont w100 mb-4 p-0">\n' +
  '                                <p>Address Line 1</p>\n' +
  '                                <h6>2142 Westwood Avenue</h6>\n' +
  '                            </div>\n' +
  '                            <div class="comm-cont w100 mb-4 p-0">\n' +
  '                                <p>Address Line 2</p>\n' +
  '                                <h6>2142 Westwood Avenue, Park Center</h6>\n' +
  '                            </div>\n' +
  '                            <div\n' +
  '                                class="comm-cont w33 w-1200-50 mb-1200-20 w33 w-990-33 mb-990-0 w-480-50 mb-480-20 p-0">\n' +
  '                                <p>City</p>\n' +
  '                                <h6>Hicksville</h6>\n' +
  '                            </div>\n' +
  '                            <div\n' +
  '                                class="comm-cont w33 w-1200-50 mb-1200-20 w33 w-990-33 mb-990-0 w-480-50 mb-480-20 p-0">\n' +
  '                                <p>State</p>\n' +
  '                                <h6>New York</h6>\n' +
  '                            </div>\n' +
  '                            <div class="comm-cont w33 w-1200-50 w-990-33 w-480-50 p-0">\n' +
  '                                <p>Zip Code</p>\n' +
  '                                <h6>11612</h6>\n' +
  '                            </div>\n' +
  '                        </div>\n' +
  '                        <!-- end -->\n' +
  '                    </div>\n' +
  '\n' +
  '                    <div class="admin-busi w40 w-768-100">\n' +
  '                        <div class="pro-comm-fle">\n' +
  '                            <h6>Timezone</h6>\n' +
  '                            <i class="icon-edit grd-icon side-menu" data-name="side-menu-timezone"></i>\n' +
  '                        </div>\n' +
  '\n' +
  '                        <!-- start -->\n' +
  '                        <div class="prof-comm-shad">\n' +
  '                            <div class="comm-cont w100 p-0">\n' +
  '                                <p>Timezone</p>\n' +
  '                                <h6>Washington, DC, USA (GMT-4)</h6>\n' +
  '                            </div>\n' +
  '                        </div>\n' +
  '                        <!-- end -->\n' +
  '                    </div>\n' +
  '\n' +
  '                    <div class="admin-busi w50 w-1660-60 w-768-100">\n' +
  '                        <div class="pro-comm-fle">\n' +
  '                            <h6>Salon Timing</h6>\n' +
  '                            <i class="icon-edit grd-icon side-menu" data-name="side-menu-timing"></i>\n' +
  '                        </div>\n' +
  '\n' +
  '                        <!-- start -->\n' +
  '                        <div class="prof-comm-shad">\n' +
  '                            <div\n' +
  '                                class="comm-cont w33 w-1200-50 mb-1200-20 w33 w-990-33 mb-990-0 w-480-50 mb-480-20 p-0">\n' +
  '                                <p>Working Days</p>\n' +
  '                                <h6>Mon - Fri</h6>\n' +
  '                            </div>\n' +
  '                            <div\n' +
  '                                class="comm-cont w33 w-1200-50 mb-1200-20 w33 w-990-33 mb-990-0 w-480-50 mb-480-20 p-0">\n' +
  '                                <p>Working Hours</p>\n' +
  '                                <h6>10 AM - 6 PM</h6>\n' +
  '                            </div>\n' +
  '                            <div class="comm-cont w33 w-1200-50 w-990-33 w-480-50 p-0">\n' +
  '                                <p>Closed <i class="icon-info coupon-info ml-1 mr-0" data-toggle="tooltip"\n' +
  '                                        data-html="true"\n' +
  '                                        title="<ul class=\'tooltip-list\'> <li>Face Cream</li> <li>Skin Toner</li> <li>Hair Lotion</li> </ul>"></i>\n' +
  '                                </p>\n' +
  '                                <h6>Sat - Sun</h6>\n' +
  '                            </div>\n' +
  '                        </div>\n' +
  '                        <!-- end -->\n' +
  '                    </div>\n' +
  '\n' +
  '                    <div class="admin-busi w25 w-1660-40 w-768-100">\n' +
  '                        <div class="pro-comm-fle">\n' +
  '                            <h6>Salon Management Fee</h6>\n' +
  '                            <i class="icon-edit grd-icon side-menu" data-name="side-menu-management"></i>\n' +
  '                        </div>\n' +
  '\n' +
  '                        <!-- start -->\n' +
  '                        <div class="prof-comm-shad">\n' +
  '                            <div class="comm-cont w100 p-0">\n' +
  '                                <p>Value</p>\n' +
  '                                <h6>$ 750</h6>\n' +
  '                            </div>\n' +
  '                        </div>\n' +
  '                        <!-- end -->\n' +
  '                    </div>\n' +
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
  '    <!-- Main Container Ends -->\n' 
})
export class BusinessTipAdjustmentComponent implements OnInit {
  constructor(public userdataService: UserdataService, public AdminService: AdminService, private formBuilder: FormBuilder, private modalService: ModalService, private router: Router, private messageService: MessageService) { }

  ngOnInit() {
    this.userdataService.getUserUpdated();
  }

}
