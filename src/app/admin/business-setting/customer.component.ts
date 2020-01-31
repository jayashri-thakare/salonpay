import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import { ModalService } from '../../_modal/modal.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AdminService} from '../admin.service';
import {MessageService} from '../../message.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-customer',
  template: ' <!-- Main Container Starts -->\n' +
  '  <div *ngIf="AdminService.navTab==9">\n' +
    '  <div *ngIf="AdminService.business_settingnav==4">\n' +
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
    '                            <li class="active"><a href="admin-business-settings-customer.html">Customer</a></li>\n' +
    '                            <li><a href="admin-business-settings-coupon.html">Coupon</a></li>\n' +
    '                            <li><a href="admin-business-settings-review.html">Review</a></li>\n' +
    '                        </ul>\n' +
    '                    </div>\n' +
    '                    <!-- end -->\n' +
    '                </div>\n' +
    '                <!-- business nav end -->\n' +
    '\n' +
    '                <h6 class="comm-subhdn">Customer</h6>\n' +
    '                <!-- start -->\n' +
    '                <h6 class="poptile">Pay Period</h6>\n' +
    '                <!-- start -->\n' +
    '                <div class="pay-switch">\n' +
    '                    <p class="sub-med">Use Customer Module</p>\n' +
    '                    <div class="switch switch--horizontal mb-0">\n' +
    '                        <input id="cust-mod-off" type="radio" name="first-switch-cust">\n' +
    '                        <label for="cust-mod-off">Off</label>\n' +
    '                        <input id="cust-mod-on" type="radio" name="first-switch-cust" checked="checked">\n' +
    '                        <label for="cust-mod-on">On</label><span class="toggle-outside"><span\n' +
    '                                class="toggle-inside"></span></span>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '                <!-- end -->\n' +
    '                <!-- end -->\n' +
    '                <!-- start -->\n' +
    '                <h6 class="poptile">Customer Appointment Reminders</h6>\n' +
    '                <div class="remid-box">\n' +
    '                    <!-- start -->\n' +
    '                    <div class="pay-switch">\n' +
    '                        <p class="sub-med">Email Notification</p>\n' +
    '                        <div class="switch switch--horizontal mb-0" data-name="email-notify">\n' +
    '                            <input class="notif-radio" id="email-noti-off" type="radio" name="first-switch-email"\n' +
    '                                value="off">\n' +
    '                            <label for="email-noti-off">Off</label>\n' +
    '                            <input class="notif-radio" id="email-noti-on" type="radio" name="first-switch-email"\n' +
    '                                value="on" checked="checked">\n' +
    '                            <label for="email-noti-on">On</label><span class="toggle-outside"><span\n' +
    '                                    class="toggle-inside"></span></span>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                    <!-- end -->\n' +
    '                    <div class="remider-chk email-notify">\n' +
    '                        <div class="radio-box radio-box-2 mb-0">\n' +
    '                            <input type="checkbox" id="email1" name="radio-small-email">\n' +
    '                            <label for="email1">1 Day Before</label>\n' +
    '                        </div>\n' +
    '                        <div class="radio-box radio-box-2 mb-0">\n' +
    '                            <input type="checkbox" id="email2" name="radio-small-email" checked="checked">\n' +
    '                            <label for="email2">Morning Of Appointment</label>\n' +
    '                        </div>\n' +
    '                        <div class="radio-box radio-box-2 mb-0">\n' +
    '                            <input type="checkbox" id="email3" name="radio-small-email">\n' +
    '                            <label for="email3">1 Day Before</label>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '                <!-- start -->\n' +
    '                <div class="remid-box">\n' +
    '                    <div class="pay-switch">\n' +
    '                        <p class="sub-med">SMS Notification</p>\n' +
    '                        <div class="switch switch--horizontal mb-0" data-name="sms-notify">\n' +
    '                            <input class="notif-radio" id="sms-noti-off" type="radio" name="first-switch-sms"\n' +
    '                                value="off">\n' +
    '                            <label for="sms-noti-off">Off</label>\n' +
    '                            <input class="notif-radio" id="sms-noti-on" type="radio" name="first-switch-sms" value="on"\n' +
    '                                checked="checked">\n' +
    '                            <label for="sms-noti-on">On</label><span class="toggle-outside"><span\n' +
    '                                    class="toggle-inside"></span></span>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                    <div class="remider-chk sms-notify">\n' +
    '                        <div class="radio-box radio-box-2 mb-0">\n' +
    '                            <input type="checkbox" id="sms1" name="radio-small-sms" checked="checked">\n' +
    '                            <label for="sms1">1 Day Before</label>\n' +
    '                        </div>\n' +
    '                        <div class="radio-box radio-box-2 mb-0">\n' +
    '                            <input type="checkbox" id="sms2" name="radio-small-sms" checked="checked">\n' +
    '                            <label for="sms2">Morning Of Appointment</label>\n' +
    '                        </div>\n' +
    '                        <div class="radio-box radio-box-2 mb-0">\n' +
    '                            <input type="checkbox" id="sms3" name="radio-small-sms" checked="checked">\n' +
    '                            <label for="sms3">1 Day Before</label>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '                <!-- end -->\n' +
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
  '                        <li class="active"><a (click)="AdminService.showBusinessNav(4)">Customer</a></li>\n' +
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
    '    </div>\n' +
    '    </div>\n' +
    '    <!-- Main Container Ends -->'
})
export class BusinessCustomerComponent implements OnInit {
  constructor(public AdminService: AdminService, private formBuilder: FormBuilder, private modalService: ModalService, private router: Router, private messageService: MessageService) { }

  ngOnInit() {
  }

}
