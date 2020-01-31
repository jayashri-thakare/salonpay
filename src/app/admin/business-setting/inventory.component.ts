import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import { ModalService } from '../../_modal/modal.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AdminService} from '../admin.service';
import {MessageService} from '../../message.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-businessinventory',
  template: ' <!-- Main Container Starts -->\n' +
  '  <div *ngIf="AdminService.navTab==9">\n' +
    '  <div *ngIf="AdminService.business_settingnav==3">\n' +
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
    '                            <li class="active"><a href="admin-business-settings-inventory.html">Inventory</a></li>\n' +
    '                            <li><a href="admin-business-settings-customer.html">Customer</a></li>\n' +
    '                            <li><a href="admin-business-settings-coupon.html">Coupon</a></li>\n' +
    '                            <li><a href="admin-business-settings-review.html">Review</a></li>\n' +
    '                        </ul>\n' +
    '                    </div>\n' +
    '                    <!-- end -->\n' +
    '                </div>\n' +
    '                <!-- business nav end -->\n' +
    '\n' +
    '                <h6 class="comm-subhdn">Inventory</h6>\n' +
    '\n' +
    '                <div class="inven-box">\n' +
    '                    <!-- start -->\n' +
    '                    <div class="">\n' +
    '                        <h6 class="poptile">Inventory Settings</h6>\n' +
    '\n' +
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
    '                    <!-- end -->\n' +
    '\n' +
    '                    <!-- start -->\n' +
    '                    <div class="">\n' +
    '                        <h6 class="poptile">Pay Period</h6>\n' +
    '\n' +
    '                        <!-- start -->\n' +
    '                        <div class="pay-switch">\n' +
    '                            <p class="sub-med">Manage Stock</p>\n' +
    '                            <div class="switch switch--horizontal mb-0" data-name="stock-switch">\n' +
    '                                <input class="notif-radio" id="off" type="radio" name="first-switch" value="off">\n' +
    '                                <label for="off">Off</label>\n' +
    '                                <input class="notif-radio" id="on" type="radio" name="first-switch" value="on"\n' +
    '                                    checked="checked">\n' +
    '                                <label for="on">On</label><span class="toggle-outside"><span\n' +
    '                                        class="toggle-inside"></span></span>\n' +
    '                            </div>\n' +
    '                        </div>\n' +
    '                        <!-- end -->\n' +
    '                        <!-- start -->\n' +
    '                        <div class="stock-switch">\n' +
    '                            <p class="sub-sml">Inventory Low Threshold</p>\n' +
    '                            <div class="form-group">\n' +
    '                                <input type="text" id="thrs-low" name="thrs-low" class="form-field" required=""\n' +
    '                                    value="10">\n' +
    '                            </div>\n' +
    '                        </div>\n' +
    '                        <!-- end -->\n' +
    '                    </div>\n' +
    '                    <!-- end -->\n' +
    '\n' +
    '                    <!-- start -->\n' +
    '                    <div class="">\n' +
    '                        <h6 class="poptile">Turn System</h6>\n' +
    '                        <!-- start -->\n' +
    '                        <div class="form-group">\n' +
    '                            <input type="text" id="thrs-low" name="thrs-low" class="form-field" required=""\n' +
    '                                aria-invalid="false">\n' +
    '                            <p class="form-label">Add Suppliers</p>\n' +
    '                        </div>\n' +
    '                        <!-- end -->\n' +
    '                    </div>\n' +
    '                    <!-- end -->\n' +
    '                </div>\n' +
    '\n' +
    '            </div>\n' +
    '\n' +
    '            <div class="busi-set-rig">\n' +
    '                <!-- start -->\n' +
    '                <div class="busi-affix">\n' +
    '                    <ul>\n' +
    '                        <li ><a (click)="AdminService.showBusinessNav(1)">Tip Adjustment</a></li>\n' +
    '                        <li><a (click)="AdminService.showBusinessNav(2)">Staff</a></li>\n' +
    '                        <li class="active"><a (click)="AdminService.showBusinessNav(3)">Inventory</a></li>\n' +
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
    '    </div>\n' +
    '    </div>\n' +
    '    <!-- Main Container Ends -->'
})
export class BusinessInventoryComponent implements OnInit {
  constructor(public AdminService: AdminService, private formBuilder: FormBuilder, private modalService: ModalService, private router: Router, private messageService: MessageService) { }

  ngOnInit() {
  }

}
