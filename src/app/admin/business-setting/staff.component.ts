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
    '                <div class="f-row f-6 f-1440-5 f-1200-4 f-768-3 f-640-2 f-400-1" >\n' +
    '                    <div class="f-col" *ngFor=" let day of days; let i = index">\n' +
    '                        <!-- start -->\n' +
    '                        <div class="form-group" >\n' +
    '                         <select  id="service-select-{{i+1}}"  class="select-field-2 weeks form-field" name="emp" (change)="saveObj(day, $event)">\n' +
    '                          <option [value]="emp" *ngFor="let emp of employee" >{{emp}}</option>\n' +
  '                                 </select>\n' +
    '                            <p class="form-label sel-blk">{{day}}</p>\n' +
    '                        </div>\n' +
    '                        <!-- end -->\n' +
    '                    </div>\n' +

    '\n' +
    '                </div>\n' +
    '\n' +
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
    '                         <li ><a (click)="AdminService.showBusinessNav(11)">Schedule</a></li>\n' +
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
  private staff: any[];
  constructor(public AdminService: AdminService, private formBuilder: FormBuilder, private modalService: ModalService, private router: Router, private messageService: MessageService) { }
  employee = [ 1, 2, 3, 4, 5, 6, 7]
  days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  // public staff: [];
  // staff: Array<any>;

  ngOnInit() {
    this.staff = [];
  }

  saveObj(day, event) {
    debugger;
    let x = {}
    // const index: number = this.enableCheckbox.indexOf(modulename);
    // if (index !== -1) {
    //   this.enableCheckbox.splice(index, 1);
    // }
    x[day] = day
    x[day] = event.target.value;
    this.staff.push(x);
  }
}
