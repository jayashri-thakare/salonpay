import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import { ModalService } from '../../_modal/modal.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AdminService} from '../admin.service';
import {MessageService} from '../../message.service';
import {Observable, Subscription} from 'rxjs';

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
      '               <div class="f-col" *ngFor=" let day of days; let i = index">\n' +
      '                        <!-- start -->\n' +
      '                        <div class="form-group " >\n' +
      '                         <select  id="service-select-{{i+1}}"  class="select-field-2 weeks form-field" [ngClass]="{\'field--not-empty\': filledVal(day)}" [ngModel]="filledVal(day)" name="emp" (change)="saveObj(day, $event)">\n' +
      '                          <option [value]="emp" *ngFor="let emp of employee" >{{emp}}</option>\n' +
      '                                 </select>\n' +
      '                            <p class="form-label sel-blk">{{day}}</p>\n' +
      '                        </div>\n' +
      '                        <!-- end -->\n' +
      '                    </div>\n' +
      '                    </div>\n' +
      '\n' +
    // '                    <div class="f-col">\n' +
    // '                        <!-- start -->\n' +
    // '                        <div class="form-group">\n' +
    // '                            <select id="service-select-1" class="select-field-2 weeks form-field" [ngModel]="filledVal(\'Monday\')" (change)="saveObj(\'Monday\', $event)" name="singleSelect1">\n' +
    // '                                <option disabled selected></option>\n' +
    // '                              <option [value]="emp" *ngFor="let emp of employee" >{{emp}}</option>\n' +
    // '                            </select>\n' +
    // '                            <p class="form-label sel-blk">Monday</p>\n' +
    // '                        </div>\n' +
    // '                        <!-- end -->\n' +
    // '                    </div>\n' +
    // '                    <div class="f-col">\n' +
    // '                        <!-- start -->\n' +
    // '                        <div class="form-group">\n' +
    // '                            <select id="service-select-2" class="select-field-2 weeks form-field" [ngModel]="filledVal(\'Tuesday\')" (change)="saveObj(\'Tuesday\', $event)" name="singleSelect2">\n' +
    // '                                <option disabled selected></option>\n' +
    // '                              <option [value]="emp" *ngFor="let emp of employee" >{{emp}}</option>\n' +
    // '                            </select>\n' +
    // '                            <p class="form-label sel-blk">Tuesday</p>\n' +
    // '                        </div>\n' +
    // '                        <!-- end -->\n' +
    // '                    </div>\n' +
    // '                    <div class="f-col">\n' +
    // '                        <!-- start -->\n' +
    // '                        <div class="form-group">\n' +
    // '                            <select id="service-select-3" class="select-field-2 weeks form-field" [ngModel]="filledVal(\'Wednesday\')" (change)="saveObj(\'Wednesday\', $event)" name="singleSelect3">\n' +
    // '                                <option disabled selected></option>\n' +
    // '                              <option [value]="emp" *ngFor="let emp of employee" >{{emp}}</option>\n' +
    // '                            </select>\n' +
    // '                            <p class="form-label sel-blk">Wednesday</p>\n' +
    // '                        </div>\n' +
    // '                        <!-- end -->\n' +
    // '                    </div>\n' +
    // '                    <div class="f-col">\n' +
    // '                        <!-- start -->\n' +
    // '                        <div class="form-group">\n' +
    // '                            <select id="service-select-4" class="select-field-2 weeks form-field" (change)="saveObj(\'Thursday\', $event)" name="singleSelect4">\n' +
    // '                                <option disabled selected></option>\n' +
    // '                              <option [value]="emp" *ngFor="let emp of employee" >{{emp}}</option>\n' +
    // '                            </select>\n' +
    // '                            <p class="form-label sel-blk">Thursday</p>\n' +
    // '                        </div>\n' +
    // '                        <!-- end -->\n' +
    // '                    </div>\n' +
    // '                    <div class="f-col">\n' +
    // '                        <!-- start -->\n' +
    // '                        <div class="form-group">\n' +
    // '                            <select id="service-select-5" class="select-field-2 weeks form-field" (change)="saveObj(\'Friday\', $event)" name="singleSelect5">\n' +
    // '                                <option disabled selected></option>\n' +
    // '                              <option [value]="emp" *ngFor="let emp of employee" >{{emp}}</option>\n' +
    // '                            </select>\n' +
    // '                            <p class="form-label sel-blk">Friday</p>\n' +
    // '                        </div>\n' +
    // '                        <!-- end -->\n' +
    // '                    </div>\n' +
    // '                    <div class="f-col">\n' +
    // '                        <!-- start -->\n' +
    // '                        <div class="form-group">\n' +
    // '                            <select id="service-select-6" class="select-field-2 weeks form-field" (change)="saveObj(\'Saturday\', $event)" name="singleSelect6">\n' +
    // '                                <option disabled selected></option>\n' +
    // '                              <option [value]="emp" *ngFor="let emp of employee" >{{emp}}</option>\n' +
    // '                            </select>\n' +
    // '                            <p class="form-label sel-blk">Saturday</p>\n' +
    // '                        </div>\n' +
    // '                        <!-- end -->\n' +
    // '                    </div>\n' +
    // '                    <div class="f-col">\n' +
    // '                        <!-- start -->\n' +
    // '                        <div class="form-group">\n' +
    // '                            <select id="service-select-7" class="select-field-2 weeks form-field" (change)="saveObj(\'Sunday\', $event)" name="singleSelect7">\n' +
    // '                                <option disabled selected></option>\n' +
    // '                              <option [value]="emp" *ngFor="let emp of employee" >{{emp}}</option>\n' +
    // '                            </select>\n' +
    // '                            <p class="form-label sel-blk">Sunday</p>\n' +
    // '                        </div>\n' +
    // '                        <!-- end -->\n' +
    // '                    </div>\n' +
    // '\n' +
    // '                </div>\n' +
    '\n' +
    '                    <button class="button" type="submit" (click)="createStaff()">Add</button>\n' +
    '\n' +
    '            </div>\n' +
    '\n' +
    '            <app-settingsidebar></app-settingsidebar>\n' +
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
  private staff: any[];
  private result: ({ parentCompanyId: number; dayName: string; staffCountId: number; id: number } | { parentCompanyId: number; dayName: string; staffCountId: number; id: number } | { parentCompanyId: number; dayName: string; staffCountId: number; id: number })[];
  // addStaffForm: FormGroup;
  private submitted: boolean;
  employee = [ 1, 2, 3, 4, 5, 6, 7];
  days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  // public staff: [];
  // staff: Array<any>;


  obj = {};



  ngOnInit() {
    this.staff = [];
    this.getStaff();
  }

  filledVal(day) {
    if(this.result) {
      for (const entry of this.result) {
        if (entry.dayName === day) {
          return entry.staffCountId
        }
      }
    }
  }

  getStaff() {
    this.AdminService.getStaff().subscribe((data) => {
      const data1 = [
        {
          id: 0,
          parentCompanyId: 0,
          dayName: 'Thursday',
          staffCountId: 7
        },
        {
          id: 0,
          parentCompanyId: 0,
          dayName: 'Monday',
          staffCountId: 3
        },
        {
          id: 0,
          parentCompanyId: 0,
          dayName: 'Tuesday',
          staffCountId: 4
        }
      ];
      this.result = data1;
      // @ts-ignore
    //   let sorter = {
    //     // "sunday": 0, // << if sunday is first day of week
    //     monday: 1,
    //     tuesday: 2,
    //     wednesday: 3,
    //     thursday: 4,
    //     friday: 5,
    //     saturday: 6,
    //     sunday: 7
    //   };
    //   // @ts-ignore
    //   this.result.sort(function sortByDay(a, b) {
    //     const day1 = a.dayName.toLowerCase();
    //     const day2 = b.dayName.toLowerCase();
    //     return sorter[day1] - sorter[day2];
    //   });
    });
  }

  createStaff() {
    debugger;
    // if (this.addStaffForm.status == 'VALID') {
    this.AdminService.createStaff(this.staff).subscribe((data) => {
        debugger;
        this.messageService.clear();
        this.messageService.add('Staff added successfully.');
      });
    // } else {
    //   this.submitted = true;
    //   if (this.addStaffForm.invalid) {
    //     return;
    //   }
    // }
  }
  saveObj(day, event) {
    debugger;
    const x = {};
    // const index: number = this.enableCheckbox.indexOf(modulename);
    // if (index !== -1) {
    //   this.enableCheckbox.splice(index, 1);
    // }
    // x[day] = day
    // x[day] = event.target.value;
    // Object.assign(this.obj, x);
    // this.staff.push(x);
    if (this.staff.length >= 1) {
      this.staff.indexOf(day)
      const index: number = this.staff.indexOf(day);
      if (index == -1) {
        this.staff.splice(index, 1);
      }
    }
    this.staff.push({day, Value: +(event.target.value)});
  }
}
