import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import { ModalService } from '../../_modal/modal.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AdminService} from '../admin.service';
import {MessageService} from '../../message.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-staff',
  template: '<!-- Main Container Starts -->\n' +
    '  <div *ngIf="AdminService.navTab==9">\n' +
    '  <div *ngIf="AdminService.business_settingnav==2">\n' +
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
    '                            <li class="active"><a href="admin-business-settings-staff.html">Staff</a></li>\n' +
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
    '                <h6 class="comm-subhdn">Staff</h6>\n' +
    '                <!-- start -->\n' +
    '                <h6 class="poptile">Staff Settings</h6>\n' +
    '                <div class="f-row f-6 f-1440-5 f-1200-4 f-768-3 f-640-2 f-400-1">\n' +
    '                    <div class="f-col">\n' +
    '                        <!-- start -->\n' +
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
    '                            <p class="form-label sel-blk">Monday</p>\n' +
    '                        </div>\n' +
    '                        <!-- end -->\n' +
    '                    </div>\n' +
    '                    <div class="f-col">\n' +
    '                        <!-- start -->\n' +
    '                        <div class="form-group">\n' +
    '                            <select id="service-select-2" class="select-field-2 weeks form-field" name="singleSelect">\n' +
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
    '                            <p class="form-label sel-blk">Tuesday</p>\n' +
    '                        </div>\n' +
    '                        <!-- end -->\n' +
    '                    </div>\n' +
    '                    <div class="f-col">\n' +
    '                        <!-- start -->\n' +
    '                        <div class="form-group">\n' +
    '                            <select id="service-select-3" class="select-field-2 weeks form-field" name="singleSelect">\n' +
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
    '                            <p class="form-label sel-blk">Wednesday</p>\n' +
    '                        </div>\n' +
    '                        <!-- end -->\n' +
    '                    </div>\n' +
    '                    <div class="f-col">\n' +
    '                        <!-- start -->\n' +
    '                        <div class="form-group">\n' +
    '                            <select id="service-select-4" class="select-field-2 weeks form-field" name="singleSelect">\n' +
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
    '                            <p class="form-label sel-blk">Thursday</p>\n' +
    '                        </div>\n' +
    '                        <!-- end -->\n' +
    '                    </div>\n' +
    '                    <div class="f-col">\n' +
    '                        <!-- start -->\n' +
    '                        <div class="form-group">\n' +
    '                            <select id="service-select-5" class="select-field-2 weeks form-field" name="singleSelect">\n' +
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
    '                            <p class="form-label sel-blk">Friday</p>\n' +
    '                        </div>\n' +
    '                        <!-- end -->\n' +
    '                    </div>\n' +
    '                    <div class="f-col">\n' +
    '                        <!-- start -->\n' +
    '                        <div class="form-group">\n' +
    '                            <select id="service-select-6" class="select-field-2 weeks form-field" name="singleSelect">\n' +
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
    '                            <p class="form-label sel-blk">Saturday</p>\n' +
    '                        </div>\n' +
    '                        <!-- end -->\n' +
    '                    </div>\n' +
    '                    <div class="f-col">\n' +
    '                        <!-- start -->\n' +
    '                        <div class="form-group">\n' +
    '                            <select id="service-select-7" class="select-field-2 weeks form-field" name="singleSelect">\n' +
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
    '                            <p class="form-label sel-blk">Sunday</p>\n' +
    '                        </div>\n' +
    '                        <!-- end -->\n' +
    '                    </div>\n' +
    '\n' +
    '                </div>\n' +
    '\n' +
    '                <div class="row">\n' +
    '                    <div class="admin-busi w33 w-1300-45 w-768-50 w-640-100">\n' +
    '                        <div class="pro-comm-fle">\n' +
    '                            <h6>Pay Period</h6>\n' +
    '                            <i class="icon-edit grd-icon side-menu" data-name="side-menu-timing"></i>\n' +
    '                        </div>\n' +
    '\n' +
    '                        <!-- start -->\n' +
    '                        <div class="prof-comm-shad">\n' +
    '                            <div class="comm-cont w50 p-0">\n' +
    '                                <p>Pay Period</p>\n' +
    '                                <h6>Weekly</h6>\n' +
    '                            </div>\n' +
    '                            <div class="comm-cont w50 p-0">\n' +
    '                                <p>Cash\\Cheque Split</p>\n' +
    '                                <h6>$ 45</h6>\n' +
    '                            </div>\n' +
    '                        </div>\n' +
    '                        <!-- end -->\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '\n' +
    '                <div class="row">\n' +
    '                    <div class="admin-busi w20 w-1300-33 w-768-50 w-480-100">\n' +
    '                        <div class="pro-comm-fle">\n' +
    '                            <h6>Turn System</h6>\n' +
    '                            <i class="icon-edit grd-icon side-menu" data-name="side-menu-management"></i>\n' +
    '                        </div>\n' +
    '\n' +
    '                        <!-- start -->\n' +
    '                        <div class="prof-comm-shad">\n' +
    '                            <div class="comm-cont w100 p-0">\n' +
    '                                <p>Number</p>\n' +
    '                                <h6>Quarter Turn</h6>\n' +
    '                            </div>\n' +
    '                        </div>\n' +
    '                        <!-- end -->\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '                <!-- end -->\n' +
    '            </div>\n' +
    '\n' +
    '            <div class="busi-set-rig">\n' +
    '                <!-- start -->\n' +
    '                <div class="busi-affix">\n' +
    '                    <ul>\n' +
    '                        <li ><a (click)="AdminService.showBusinessNav(1)">Tip Adjustment</a></li>\n' +
    '                        <li class="active"><a (click)="AdminService.showBusinessNav(2)">Staff</a></li>\n' +
    '                        <li><a (click)="AdminService.showBusinessNav(3)">Inventory</a></li>\n' +
    '                        <li><a (click)="AdminService.showBusinessNav(4)">Customer</a></li>\n' +
    '                        <li><a (click)="AdminService.showBusinessNav(5)">Coupon</a></li>\n' +
    '                        <li><a (click)="AdminService.showBusinessNav(6)">Review</a></li>\n' +
    '                        <li><a (click)="AdminService.showBusinessNav(7)">Tax Table</a></li>\n' +
    '                        <li ><a (click)="AdminService.showBusinessNav(8)">Services Category</a></li>\n' +
    '                        <li><a (click)="AdminService.showBusinessNav(9)">Turn Count</a></li>\n' +
    '                        <li ><a (click)="AdminService.showBusinessNav(10)">Experience Level</a></li>\n' +
    '                         <li ><a (click)="AdminService.showBusinessNav(11)">Pay Period</a></li>\n' +
    '                         <li ><a (click)="AdminService.showBusinessNav(12)">Schedule</a></li>\n' +
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
export class BusinessStaffComponent implements OnInit {
  constructor(public AdminService: AdminService, private formBuilder: FormBuilder, private modalService: ModalService, private router: Router, private messageService: MessageService) { }

  ngOnInit() {
  }

}
