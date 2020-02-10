import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import { ModalService } from '../../_modal/modal.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AdminService} from '../admin.service';
import {MessageService} from '../../message.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-businesscoupon',
  styleUrls: ['./business.component.css'],
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
    '                    <div class="pro-comm-fle">\n' +
    '                        <h6 class="comm-subhdn">Coupon</h6>\n' +
    '                        <i *ngIf="businesscouponsuccess == 1 && showform == true" class="icon-delete grd-icon side-menu" data-toggle="modal" data-target="#deletePopupbusinesscoupon"></i>\n' +
    '                    </div>\n' +
    '                <!-- start -->\n' +
    '                <form *ngIf="businesscouponsuccess == 0" [formGroup]="addcouponForm" (ngSubmit)="createBusinessCoupon(addcouponForm.value)" id="addCoupon" class="popup-scrll">\n' +
    '                <div class="inven-box">\n' +
    '                    <!-- start -->\n' +
    '                    <div class="pay-switch">\n' +
    '                        <p class="sub-med">Birthday Coupon</p>\n' +
    '                        <div class="switch switch--horizontal get-switch-val mb-0" data-name="coupon-switch">\n' +
    '                            <input class="notif-radio" formControlName="EnableBirthdayCoupon" (click)="coupononoff(false);toggleBusinessCoupon(false)" id="email-noti-off" type="radio" \n' +
    '                                value="false">\n' +
    '                            <label for="email-noti-off">Off</label>\n' +
    '                            <input class="notif-radio" formControlName="EnableBirthdayCoupon" (click)="coupononoff(true);toggleBusinessCoupon(true)" id="email-noti-on" type="radio" \n' +
    '                                value="true" checked="checked">\n' +
    '                            <label for="email-noti-on">On</label><span class="toggle-outside"><span\n' +
    '                                    class="toggle-inside"></span></span>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                    <!-- start -->\n' +
    '                    <div class="coupon-switch" *ngIf="showform">\n' +
    '                        <p class="sub-sml">Days Before</p>\n' +
    '                        <div class="form-group">\n' +
    '                            <input type="text" id="thrs-low" formControlName="DaysBefore" class="form-field" required="" value="25">\n' +
    '                            <p class="form-label">Days</p>\n' +
    '                        </div>\n' +
    '                        <div class="form-group">\n' +
    '                            <select id="service-select-1" formControlName="EmailTemplateId" class="select-field-2 weeks form-field">\n' +
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
    '                            <input type="text" id="thrs-low" formControlName="EmailSubject" class="form-field" required=""\n' +
    '                                aria-invalid="false">\n' +
    '                            <p class="form-label">Birthday Email Subject</p>\n' +
    '                        </div>\n' +
    '                        <!-- end -->\n' +
    '                    </div>\n' +
    '\n' +
    '                </div>\n' +
    '                <button *ngIf="showform" class="button w15" type="submit">Add</button>\n' +
    '                </form>\n' +
    '                <!-- end -->\n' +
    '                <!-- start -->\n' +
    '                <form *ngIf="businesscouponsuccess == 1" [formGroup]="updatecouponForm" (ngSubmit)="updateBusinessCoupon(updatecouponForm.value)" id="updateCoupon" class="popup-scrll">\n' +
    '                <div class="inven-box">\n' +
    '                    <!-- start -->\n' +
    '                    <div class="pay-switch">\n' +
    '                        <p class="sub-med">Birthday Coupon</p>\n' +
    '                        <div class="switch switch--horizontal get-switch-val mb-0" data-name="coupon-switch">\n' +
    '                            <input class="notif-radio" formControlName="EnableBirthdayCoupon" (click)="coupononoff(false);toggleBusinessCoupon(false)" id="email-noti-off" type="radio" \n' +
    '                                value="false">\n' +
    '                            <label for="email-noti-off">Off</label>\n' +
    '                            <input class="notif-radio" formControlName="EnableBirthdayCoupon" (click)="coupononoff(true);toggleBusinessCoupon(true)" [checked]="businesscoupons?.enableBirthdayCoupon" id="email-noti-on" type="radio" \n' +
    '                                value="true" checked="checked">\n' +
    '                            <label for="email-noti-on">On</label><span class="toggle-outside"><span\n' +
    '                                    class="toggle-inside"></span></span>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                    <!-- start -->\n' +
    '                    <div class="coupon-switch" *ngIf="showform">\n' +
    '                        <p class="sub-sml">Days Before</p>\n' +
    '                        <div class="form-group">\n' +
    '                            <input type="text" id="thrs-low" formControlName="DaysBefore" ngModel="{{businesscoupons?.daysBefore}}" class="form-field field--not-empty" required="" value="25">\n' +
    '                            <p class="form-label">Days</p>\n' +
    '                        </div>\n' +
    '                        <div class="form-group">\n' +
    '                            <select id="service-select-1" formControlName="EmailTemplateId" ngModel="{{businesscoupons?.emailTemplateId}}" class="select-field-2 weeks form-field field--not-empty">\n' +
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
    '                            <input type="text" id="thrs-low" formControlName="EmailSubject" ngModel="{{businesscoupons?.emailSubject}}" class="form-field field--not-empty" required=""\n' +
    '                                aria-invalid="false">\n' +
    '                            <p class="form-label">Birthday Email Subject</p>\n' +
    '                        </div>\n' +
    '                        <!-- end -->\n' +
    '                    </div>\n' +
    '\n' +
    '                </div>\n' +
    '                <button *ngIf="showform" class="button w15" type="submit">Update</button>\n' +
    '                </form>\n' +
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
    '                        <li ><a (click)="AdminService.showBusinessNav(8)">Services Category</a></li>\n' +
    '                        <li><a (click)="AdminService.showBusinessNav(9)">Turn Count</a></li>\n' +
    '                        <li ><a (click)="AdminService.showBusinessNav(10)">Experience Level</a></li>\n' +
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
    '    <!-- Main Container Ends --> \n' +
    '    <!-- Main Container Ends -->\n' +
    '        <!-- Delete Modal Starts -->\n' +
    '        <div class="modal fade" id="deletePopupbusinesscoupon">\n' +
    '            <div class="modal-dialog medium-window">\n' +
    '                <div class="modal-content">\n' +
    '                    <div class="modalCancel" data-dismiss="modal"><i class="icon-cir-plus"></i></div>\n' +
    '\n' +
    '                    <h2 class="modal-title">Are you sure you want to delete this Coupon?</h2>\n' +
    '\n' +
    '                    <div class="modal-btn">\n' +
    '                        <button class="button line mr-2" data-dismiss="modal">No</button>\n' +
    '                        <button class="button red" data-dismiss="modal" (click)="deleteBusinessCoupon()">Yes</button>\n' +
    '                    </div>\n' +
    '\n' +
    '                </div>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '        <!-- Delete Modal Ends -->'
})
export class BusinessCouponComponent implements OnInit {
  addcouponForm: FormGroup;
  updatecouponForm: FormGroup;
  control: FormControl;
  submitted = false;
  businesscoupons: any;
  businesscouponsuccess: any;
  showform: boolean;
  toggle = {};
  constructor(public AdminService: AdminService, private formBuilder: FormBuilder, private modalService: ModalService, private router: Router, private messageService: MessageService) { }
  get f() {
    return this.addcouponForm.controls;
  }
  get f1() {
    return this.updatecouponForm.controls;
  }  
  ngOnInit() {
    this.getBusinessCoupons();
    this.addcouponForm = this.formBuilder.group({
      EnableBirthdayCoupon: [''],
      DaysBefore: [''],
      EmailTemplateId: [''],
      EmailSubject: ['']
    });
    this.updatecouponForm = this.formBuilder.group({
        EnableBirthdayCoupon: [''],
        DaysBefore: [''],
        EmailTemplateId: [''],
        EmailSubject: ['']
    });
  }

  coupononoff(checkvalue){
    if(checkvalue){
      this.showform = true;
    }else{
      this.showform = false;
    }
  }

  createBusinessCoupon(Admin) {
    debugger;
    console.log(Admin)
    Admin.EnableBirthdayCoupon = JSON.parse(Admin.EnableBirthdayCoupon)
    Admin.DaysBefore = parseInt(Admin.DaysBefore)
    Admin.EmailTemplateId = parseInt(Admin.EmailTemplateId)
    // tslint:disable-next-line:triple-equals
    if (this.addcouponForm.status == 'VALID') {
      this.AdminService.add_business_coupon(Admin).subscribe((data) => {
        this.getBusinessCoupons();
        this.addcouponForm.reset();
        this.messageService.clear();
        this.messageService.add('Coupons Created successfully.')
      });
    } else {
      console.log(Admin, this.addcouponForm.status);
      this.submitted = true;
      if (this.addcouponForm.invalid) {
        return;
      }
    }
  }

  getBusinessCoupons() {
    this.AdminService.GetBusinessCoupons().subscribe((data) => {
      this.businesscoupons = data;
      this.businesscouponsuccess = data['success']
      this.businesscoupons = this.businesscoupons.result;
      console.log(this.businesscoupons)
      // localStorage.setItem('companyId', data['ParentCompanyID']);
    });
  }

  updateBusinessCoupon(Admin) {
    debugger;
    console.log(Admin)
    Admin.EnableBirthdayCoupon = JSON.parse(this.businesscoupons.enableBirthdayCoupon)
    Admin.DaysBefore = parseInt(Admin.DaysBefore)
    Admin.EmailTemplateId = parseInt(Admin.EmailTemplateId)
    // tslint:disable-next-line:triple-equals
    if (this.updatecouponForm.status == 'VALID') {
      this.AdminService.update_business_coupon(Admin).subscribe((data) => {
        this.getBusinessCoupons();
        this.messageService.clear();
        this.messageService.add('Coupons Updated successfully.')
      });
    } else {
      console.log(Admin, this.updatecouponForm.status);
      this.submitted = true;
      if (this.updatecouponForm.invalid) {
        return;
      }
    }
  }

  deleteBusinessCoupon() {
    debugger;
    // tslint:disable-next-line:triple-equals
      this.AdminService.deleteBusinessCoupon().subscribe((data) => {
        console.log(data)
        this.getBusinessCoupons();
        this.messageService.clear();
        this.messageService.add(data['message']);
      });
  }

  toggleBusinessCoupon(Admin) {
    debugger;
    console.log(Admin)
    this.toggle = {}
    this.toggle['flag'] = Admin
    this.AdminService.toggle_business_coupon(this.toggle).subscribe((data) => {
      this.getBusinessCoupons();
      this.messageService.clear();
      this.messageService.add(data['message'])
    });
  }

}
