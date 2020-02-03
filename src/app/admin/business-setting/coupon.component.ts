import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import { ModalService } from '../../_modal/modal.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AdminService} from '../admin.service';
import {MessageService} from '../../message.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-businesscoupon',
  template: '\n' +
    '    <!-- Main Container Starts -->\n' +
    '  <div *ngIf="AdminService.navTab==9">\n' +
    '  <div *ngIf="AdminService.business_settingnav==5">\n' +
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
    '                            <li><a href="admin-business-settings-tip.html">Tip Adjustment</a></li>\n' +
    '                            <li><a href="admin-business-settings-staff.html">Staff</a></li>\n' +
    '                            <li><a href="admin-business-settings-inventory.html">Inventory</a></li>\n' +
    '                            <li><a href="admin-business-settings-customer.html">Customer</a></li>\n' +
    '                            <li class="active"><a href="admin-business-settings-coupon.html">Coupon</a></li>\n' +
    '                            <li><a href="admin-business-settings-review.html">Review</a></li>\n' +
    '                        </ul>\n' +
    '                    </div>\n' +
    '                    <!-- end -->\n' +
    '                </div>\n' +
    '                <!-- business nav end -->\n' +
    '\n' +
    '                <h6 class="comm-subhdn">Coupon</h6>\n' +
    '                <!-- start -->\n' +
    '                <div class="inven-box">\n' +
    '                    <!-- start -->\n' +
    '                    <div class="pay-switch">\n' +
    '                        <p class="sub-med">Birthday Coupon</p>\n' +
    '                        <div class="switch switch--horizontal get-switch-val mb-0" data-name="coupon-switch">\n' +
    '                            <input class="notif-radio" id="email-noti-off" type="radio" name="first-switch-email"\n' +
    '                                value="off">\n' +
    '                            <label for="email-noti-off">Off</label>\n' +
    '                            <input class="notif-radio" id="email-noti-on" type="radio" name="first-switch-email"\n' +
    '                                value="on" checked="checked">\n' +
    '                            <label for="email-noti-on">On</label><span class="toggle-outside"><span\n' +
    '                                    class="toggle-inside"></span></span>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                    <!-- start -->\n' +
    '                    <div class="coupon-switch">\n' +
    '                        <p class="sub-sml">Days Before</p>\n' +
    '                        <div class="form-group">\n' +
    '                            <input type="text" id="thrs-low" name="thrs-low" class="form-field" required="" value="25">\n' +
    '                        </div>\n' +
    '                        <div class="form-group">\n' +
    '                            <select id="service-select-1" class="select-field-2 weeks form-field" name="singleSelect">\n' +
    '                                <option disabled selected></option>\n' +
    '                                <option class="selectNo" disabled>Select Number</option>\n' +
    '                                <option value="1">1</option>\n' +
    '                                <option value="2">2</option>\n' +
    '                                <option value="3">3</option>\n' +
    '                                <option value="4">4</option>\n' +
    '                                <option value="5">5</option>\n' +
    '                                <option value="6">6</option>\n' +
    '                                <option value="7">7</option>\n' +
    '                            </select>\n' +
    '                            <p class="form-label sel-blk">Email Template</p>\n' +
    '                        </div>\n' +
    '                        <!-- end -->\n' +
    '                        <div class="form-group">\n' +
    '                            <input type="text" id="thrs-low" name="thrs-low" class="form-field" required=""\n' +
    '                                aria-invalid="false">\n' +
    '                            <p class="form-label">Birthday Email Subject</p>\n' +
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
    '                        <li ><a (click)="AdminService.showBusinessNav(1)">Tip Adjustment</a></li>\n' +
    '                        <li><a (click)="AdminService.showBusinessNav(2)">Staff</a></li>\n' +
    '                        <li><a (click)="AdminService.showBusinessNav(3)">Inventory</a></li>\n' +
    '                        <li><a (click)="AdminService.showBusinessNav(4)">Customer</a></li>\n' +
    '                        <li class="active"><a (click)="AdminService.showBusinessNav(5)">Coupon</a></li>\n' +
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
    '    </div>\n' +
    '    </div>\n' +
    '    <!-- Main Container Ends -->'
})
export class BusinessCouponComponent implements OnInit {
  constructor(public AdminService: AdminService, private formBuilder: FormBuilder, private modalService: ModalService, private router: Router, private messageService: MessageService) { }

  ngOnInit() {
  }

}
