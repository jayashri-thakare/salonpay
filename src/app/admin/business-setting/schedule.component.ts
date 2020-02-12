import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import { ModalService } from '../../_modal/modal.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AdminService} from '../admin.service';
import {MessageService} from '../../message.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-busischedule',
  styleUrls: ['./business.component.css'],
  template: '<!-- Main Container Starts -->\n' +
  '  <div *ngIf="AdminService.navTab==9">\n' +
    '  <div *ngIf="AdminService.business_settingnav==11">\n' +
    '    <div class="mainContainer">\n' +
    '\n' +
    '        <div class="busi-set">\n' +
    '\n' +
    '            <div class="busi-set-lef">\n' +
    '                    <div class="pro-comm-fle">\n' +
    '                       <h3 class="main-comm-head">Business Settings</h3>\n' +
    '                       <button class="button flg-btn side-menu" (click)="modalService.open1(\'add-schedule\')">+ Add New</button>\n' +
    '                    </div>\n' +
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
    '                            <li><a href="admin-business-settings-coupon.html">Coupon</a></li>\n' +
    '                            <li class="active"><a href="admin-business-settings-review.html">Review</a></li>\n' +
    '                        </ul>\n' +
    '                    </div>\n' +
    '                    <!-- end -->\n' +
    '                </div>\n' +
    '                <!-- business nav end -->\n' +
    '\n' +
    '                <h6 class="comm-subhdn">Schedule Setting</h6>\n' +
    '                <!-- start -->\n' +
    '                <div class="busi-rewv">\n' +
    '\n' +
     '                             <!-- start -->\n' +
    '                              <div class="prof-comm-shad" *ngFor="let schedule of businessschedule">\n' +
     '                                 <div class="comm-cont w33 f-col-width w-1200-50 mb-1200-20 w33 w-990-33 mb-990-0 w-480-50 mb-480-20 p-0">\n' +
    '                                      <p>Working Day</p>\n' +
    '                                      <h6>{{schedule.dayName}}</h6>\n' +
    '                                  </div>\n' +
    '                                  <div class="comm-cont w33 w-1200-50 mb-1200-20 w33 w-990-33 mb-990-0 w-480-50 mb-480-20 p-0">\n' +
    '                                      <p>Working Hours</p>\n' +
    '                                      <h6>{{schedule.startTimeHour}}:{{schedule.startTimeMinute}} {{schedule.startTimeMeridian}} - {{schedule.endTimeHour}}:{{schedule.endTimeMinute}} {{schedule.endTimeMeridian}}</h6>\n' +
     '                                 </div>\n' +
     '                             </div>\n' +
    '                              <!-- end -->\n' +
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
  '                        <li><a (click)="AdminService.showBusinessNav(5)">Coupon</a></li>\n' +
  '                        <li ><a (click)="AdminService.showBusinessNav(6)">Review</a></li>\n' +
  '                        <li ><a (click)="AdminService.showBusinessNav(7)">Tax Table</a></li>\n' +
  '                        <li ><a (click)="AdminService.showBusinessNav(8)">Services Category</a></li>\n' +
  '                        <li ><a (click)="AdminService.showBusinessNav(9)">Turn Count</a></li>\n' +
  '                        <li ><a (click)="AdminService.showBusinessNav(10)">Experience Level</a></li>\n' +
  '                         <li class="active"><a (click)="AdminService.showBusinessNav(11)">Schedule</a></li>\n' +
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
    '    <addschedule-modal></addschedule-modal>\n' +
    '    <!-- Main Container Ends -->\n'
})
export class BusinessScheduleComponent implements OnInit {

  subscription: Subscription;
  businessschedule: any;
  constructor(public AdminService: AdminService, private formBuilder: FormBuilder, public modalService: ModalService, private router: Router, private messageService: MessageService) { }

  ngOnInit() {
    this.getSchedule();
  }

  getSchedule() {
    this.AdminService.GetScheduleList().subscribe((data) => {
      this.businessschedule = data;
      // this.businessschedule = this.businessschedule.result;
      console.log(this.businessschedule)
      // localStorage.setItem('companyId', data['ParentCompanyID']);
    });
  }

}
