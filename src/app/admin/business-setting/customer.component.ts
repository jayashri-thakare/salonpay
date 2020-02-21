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
    '                <h6 class="poptile">Customer Appointment Reminders</h6>\n' +
    '                <div *ngIf="notisuccess == 0">\n' +
    '                <div class="remid-box">\n' +
    '                    <!-- start -->\n' +
    '                    <div class="pay-switch">\n' +
    '                        <p class="sub-med">Email Notification</p>\n' +
    '                        <div class="switch switch--horizontal mb-0" data-name="email-notify">\n' +
    '                            <input class="notif-radio" id="email-noti-off" type="radio" name="first-switch-email"\n' +
    '                                value="false" (click)="onOffNotification(false, \'Email\')">\n' +
    '                            <label for="email-noti-off">Off</label>\n' +
    '                            <input class="notif-radio" id="email-noti-on" type="radio" name="first-switch-email"\n' +
    '                                value="true" (click)="onOffNotification(true, \'Email\')">\n' +
    '                            <label for="email-noti-on">On</label><span class="toggle-outside"><span\n' +
    '                                    class="toggle-inside"></span></span>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                    <!-- end -->\n' +
    '                    <div class="remider-chk email-notify" *ngIf="emailvar">\n' +
    '                        <div class="radio-box radio-box-2 mb-0">\n' +
    '                            <input type="checkbox" id="email1" (click)="emailTimeSelection($event, \'Email\', \'1 Day Before\')" name="radio-small-email">\n' +
    '                            <label for="email1">1 Day Before</label>\n' +
    '                        </div>\n' +
    '                        <div class="radio-box radio-box-2 mb-0">\n' +
    '                            <input type="checkbox" id="email2" (click)="emailTimeSelection($event, \'Email\', \'Morning Of Appointment\')" name="radio-small-email">\n' +
    '                            <label for="email2">Morning Of Appointment</label>\n' +
    '                        </div>\n' +
    '                        <div class="radio-box radio-box-2 mb-0">\n' +
    '                            <input type="checkbox" id="email3" (click)="emailTimeSelection($event, \'Email\', \'1 Hr. Before\')" name="radio-small-email">\n' +
    '                            <label for="email3">1 Hr. Before</label>\n' +
    '                        </div>\n' +
    '                        <div class="radio-box radio-box-2 mb-0">\n' +
    '                            <input type="checkbox" id="email4" (click)="emailTimeSelection($event, \'Email\', \'2 Hr. Before\')" name="radio-small-email">\n' +
    '                            <label for="email4">2 Hr. Before</label>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '                <!-- start -->\n' +
    '                <div class="remid-box">\n' +
    '                    <div class="pay-switch">\n' +
    '                        <p class="sub-med">SMS Notification</p>\n' +
    '                        <div class="switch switch--horizontal mb-0" data-name="sms-notify">\n' +
    '                            <input class="notif-radio" id="sms-noti-off" type="radio" name="first-switch-sms"\n' +
    '                                value="false" (click)="onOffNotification(false, \'SMS\')">\n' +
    '                            <label for="sms-noti-off">Off</label>\n' +
    '                            <input class="notif-radio" id="sms-noti-on" type="radio" name="first-switch-sms" value="true"\n' +
    '                                (click)="onOffNotification(true, \'SMS\')">\n' +
    '                            <label for="sms-noti-on">On</label><span class="toggle-outside"><span\n' +
    '                                    class="toggle-inside"></span></span>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                    <div class="remider-chk sms-notify" *ngIf="smsvar">\n' +
    '                        <div class="radio-box radio-box-2 mb-0">\n' +
    '                            <input type="checkbox" id="sms1" (click)="emailTimeSelection($event, \'SMS\', \'1 Day Before\')" name="radio-small-sms">\n' +
    '                            <label for="sms1">1 Day Before</label>\n' +
    '                        </div>\n' +
    '                        <div class="radio-box radio-box-2 mb-0">\n' +
    '                            <input type="checkbox" id="sms2" (click)="emailTimeSelection($event, \'SMS\', \'Morning Of Appointment\')" name="radio-small-sms">\n' +
    '                            <label for="sms2">Morning Of Appointment</label>\n' +
    '                        </div>\n' +
    '                        <div class="radio-box radio-box-2 mb-0">\n' +
    '                            <input type="checkbox" id="sms3" (click)="emailTimeSelection($event, \'SMS\', \'1 Hr. Before\')" name="radio-small-sms">\n' +
    '                            <label for="sms3">1 Hr. Before</label>\n' +
    '                        </div>\n' +
    '                        <div class="radio-box radio-box-2 mb-0">\n' +
    '                            <input type="checkbox" id="sms4" (click)="emailTimeSelection($event, \'SMS\', \'2 Hr. Before\')" name="radio-small-sms">\n' +
    '                            <label for="sms4">2 Hr. Before</label>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '                <!-- end -->\n' +
    '                <!-- end -->\n' +
    '                <button class="button" (click)="addemailsmsnotification()">Add</button>\n' +
    '                </div>\n' +
    '                <div *ngIf="notisuccess == 1">\n' +
    '                <div class="remid-box">\n' +
    '                    <!-- start -->\n' +
    '                    <div class="pay-switch">\n' +
    '                        <p class="sub-med">Email Notification</p>\n' +
    '                        <div class="switch switch--horizontal mb-0" data-name="email-notify">\n' +
    '                            <input class="notif-radio" id="email-noti-off" type="radio" name="first-switch-email"\n' +
    '                                value="false" (click)="updateCustomerNoti(false, \'emailNotification\', \'\')">\n' +
    '                            <label for="email-noti-off">Off</label>\n' +
    '                            <input class="notif-radio" id="email-noti-on" [checked]="businesscustnoti.emailNotification.isSelected" type="radio" name="first-switch-email"\n' +
    '                                value="true" (click)="updateCustomerNoti(true, \'emailNotification\', \'\')">\n' +
    '                            <label for="email-noti-on">On</label><span class="toggle-outside"><span\n' +
    '                                    class="toggle-inside"></span></span>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                    <!-- end -->\n' +
    '                    <div class="remider-chk email-notify" *ngIf="emailvar || businesscustnoti.emailNotification.isSelected">\n' +
    '                        <div class="radio-box radio-box-2 mb-0">\n' +
    '                            <input type="checkbox" id="email1" [checked]="businesscustnoti.emailNotification.emailNotificationTime[0] == \'1 Day Before\' || businesscustnoti.emailNotification.emailNotificationTime[1] == \'1 Day Before\' || businesscustnoti.emailNotification.emailNotificationTime[2] == \'1 Day Before\' || businesscustnoti.emailNotification.emailNotificationTime[3] == \'1 Day Before\'" (click)="updateCustomerNoti($event, \'emailNotification\', \'1 Day Before\')" name="radio-small-email">\n' +
    '                            <label for="email1">1 Day Before</label>\n' +
    '                        </div>\n' +
    '                        <div class="radio-box radio-box-2 mb-0">\n' +
    '                            <input type="checkbox" id="email2" [checked]="businesscustnoti.emailNotification.emailNotificationTime[0] == \'Morning Of Appointment\' || businesscustnoti.emailNotification.emailNotificationTime[1] == \'Morning Of Appointment\' || businesscustnoti.emailNotification.emailNotificationTime[2] == \'Morning Of Appointment\' || businesscustnoti.emailNotification.emailNotificationTime[3] == \'Morning Of Appointment\'" (click)="updateCustomerNoti($event, \'emailNotification\', \'Morning Of Appointment\')" name="radio-small-email">\n' +
    '                            <label for="email2">Morning Of Appointment</label>\n' +
    '                        </div>\n' +
    '                        <div class="radio-box radio-box-2 mb-0">\n' +
    '                            <input type="checkbox" id="email3" [checked]="businesscustnoti.emailNotification.emailNotificationTime[0] == \'1 Hr. Before\' || businesscustnoti.emailNotification.emailNotificationTime[1] == \'1 Hr. Before\' || businesscustnoti.emailNotification.emailNotificationTime[2] == \'1 Hr. Before\' || businesscustnoti.emailNotification.emailNotificationTime[3] == \'1 Hr. Before\'" (click)="updateCustomerNoti($event, \'emailNotification\', \'1 Hr. Before\')" name="radio-small-email">\n' +
    '                            <label for="email3">1 Hr. Before</label>\n' +
    '                        </div>\n' +
    '                        <div class="radio-box radio-box-2 mb-0">\n' +
    '                            <input type="checkbox" id="email4" [checked]="businesscustnoti.emailNotification.emailNotificationTime[0] == \'2 Hr. Before\' || businesscustnoti.emailNotification.emailNotificationTime[1] == \'2 Hr. Before\' || businesscustnoti.emailNotification.emailNotificationTime[2] == \'2 Hr. Before\' || businesscustnoti.emailNotification.emailNotificationTime[3] == \'2 Hr. Before\'" (click)="updateCustomerNoti($event, \'emailNotification\', \'2 Hr. Before\')" name="radio-small-email">\n' +
    '                            <label for="email4">2 Hr. Before</label>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '                <!-- start -->\n' +
    '                <div class="remid-box">\n' +
    '                    <div class="pay-switch">\n' +
    '                        <p class="sub-med">SMS Notification</p>\n' +
    '                        <div class="switch switch--horizontal mb-0" data-name="sms-notify">\n' +
    '                            <input class="notif-radio" id="sms-noti-off" type="radio" name="first-switch-sms"\n' +
    '                                value="false" (click)="updateCustomerNoti(false, \'smsNotification\',\'\')">\n' +
    '                            <label for="sms-noti-off">Off</label>\n' +
    '                            <input class="notif-radio" id="sms-noti-on" [checked]="businesscustnoti.smsNotification.isSelected" type="radio" name="first-switch-sms" value="true"\n' +
    '                                (click)="updateCustomerNoti(true, \'smsNotification\', \'\')">\n' +
    '                            <label for="sms-noti-on">On</label><span class="toggle-outside"><span\n' +
    '                                    class="toggle-inside"></span></span>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                    <div class="remider-chk sms-notify" *ngIf="smsvar || businesscustnoti.smsNotification.isSelected">\n' +
    '                        <div class="radio-box radio-box-2 mb-0">\n' +
    '                            <input type="checkbox" id="sms1" [checked]="businesscustnoti.smsNotification.smsNotificationTime[0] == \'1 Day Before\' || businesscustnoti.smsNotification.smsNotificationTime[1] == \'1 Day Before\' || businesscustnoti.smsNotification.smsNotificationTime[2] == \'1 Day Before\' || businesscustnoti.smsNotification.smsNotificationTime[3] == \'1 Day Before\'" (click)="updateCustomerNoti($event, \'smsNotification\', \'1 Day Before\')" name="radio-small-sms">\n' +
    '                            <label for="sms1">1 Day Before</label>\n' +
    '                        </div>\n' +
    '                        <div class="radio-box radio-box-2 mb-0">\n' +
    '                            <input type="checkbox" id="sms2" [checked]="businesscustnoti.smsNotification.smsNotificationTime[0] == \'Morning Of Appointment\' || businesscustnoti.smsNotification.smsNotificationTime[1] == \'Morning Of Appointment\' || businesscustnoti.smsNotification.smsNotificationTime[2] == \'Morning Of Appointment\' || businesscustnoti.smsNotification.smsNotificationTime[3] == \'Morning Of Appointment\'" (click)="updateCustomerNoti($event, \'smsNotification\', \'Morning Of Appointment\')" name="radio-small-sms">\n' +
    '                            <label for="sms2">Morning Of Appointment</label>\n' +
    '                        </div>\n' +
    '                        <div class="radio-box radio-box-2 mb-0">\n' +
    '                            <input type="checkbox" id="sms3" [checked]="businesscustnoti.smsNotification.smsNotificationTime[0] == \'1 Hr. Before\' || businesscustnoti.smsNotification.smsNotificationTime[1] == \'1 Hr. Before\' || businesscustnoti.smsNotification.smsNotificationTime[2] == \'1 Hr. Before\' || businesscustnoti.smsNotification.smsNotificationTime[3] == \'1 Hr. Before\'" (click)="updateCustomerNoti($event, \'smsNotification\', \'1 Hr. Before\')" name="radio-small-sms">\n' +
    '                            <label for="sms3">1 Hr. Before</label>\n' +
    '                        </div>\n' +
    '                        <div class="radio-box radio-box-2 mb-0">\n' +
    '                            <input type="checkbox" id="sms4" [checked]="businesscustnoti.smsNotification.smsNotificationTime[0] == \'2 Hr. Before\' || businesscustnoti.smsNotification.smsNotificationTime[1] == \'2 Hr. Before\' || businesscustnoti.smsNotification.smsNotificationTime[2] == \'2 Hr. Before\' || businesscustnoti.smsNotification.smsNotificationTime[3] == \'2 Hr. Before\'" (click)="updateCustomerNoti($event, \'smsNotification\', \'2 Hr. Before\')" name="radio-small-sms">\n' +
    '                            <label for="sms4">2 Hr. Before</label>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '                <!-- end -->\n' +
    '                <!-- end -->\n' +
    '                <button class="button" (click)="Updateemailsmsnotification()">Update</button>\n' +
    '              </div>\n' +
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
export class BusinessCustomerComponent implements OnInit {
  smsvar: boolean;
  emailvar: boolean;
  emailnotiobj = {};
  smsnotiobj = {};
  arrayofselectedemailobj: Array<any> = [];
  arrayofselectedsmsobj: Array<any> = [];
  claims = {};
  businesscustnoti: any;
  notisuccess: any;
  constructor(public AdminService: AdminService, private formBuilder: FormBuilder, private modalService: ModalService, private router: Router, private messageService: MessageService) { }

  ngOnInit() {
    this.emailvar = false;
    this.smsvar = false;
    this.getCustNotification();
  }

  onOffNotification(checkvalue, type){
    if(type == 'Email'){
      this.emailvar = checkvalue;
      if(checkvalue == true && type == 'Email'){
        this.emailnotiobj['IsSelected'] = checkvalue;
        this.emailnotiobj['EmailNotificationTime'] = [];
      }else{
        this.emailnotiobj['IsSelected'] = checkvalue;
        this.emailnotiobj['EmailNotificationTime'] = [];
      }
      console.log(this.emailnotiobj)
    }else if(type == 'SMS'){
      this.smsvar = checkvalue;
      if(checkvalue == true && type == 'SMS'){
        this.smsnotiobj['IsSelected'] = checkvalue;
        this.smsnotiobj['SmsNotificationTime'] = [];
      }else{
        this.smsnotiobj['IsSelected'] = checkvalue;
        this.smsnotiobj['SmsNotificationTime'] = [];
      }
      console.log(this.smsnotiobj)
    }
  }

  emailTimeSelection(event, type, content){
    if(event.currentTarget.checked && type == 'Email'){
      var index = this.arrayofselectedemailobj.indexOf(content);
      if(index<0 && event.currentTarget.checked){
        this.arrayofselectedemailobj.push(content);
      }
      this.emailnotiobj['EmailNotificationTime'] = this.arrayofselectedemailobj;
    }else if(type == 'Email'){
      this.arrayofselectedemailobj.splice(this.arrayofselectedemailobj.indexOf(content), 1);
      this.emailnotiobj['EmailNotificationTime'] = this.arrayofselectedemailobj;
    }else if(event.currentTarget.checked && type == 'SMS'){
      var index = this.arrayofselectedsmsobj.indexOf(content);
      if(index<0 && event.currentTarget.checked){
        this.arrayofselectedsmsobj.push(content);
      }
      this.smsnotiobj['SmsNotificationTime'] = this.arrayofselectedsmsobj;
    }else if(type == 'SMS'){
      this.arrayofselectedsmsobj.splice(this.arrayofselectedsmsobj.indexOf(content), 1);
      this.smsnotiobj['SmsNotificationTime'] = this.arrayofselectedsmsobj;
    }
    console.log(this.emailnotiobj, this.smsnotiobj)
  }

  addemailsmsnotification() {
    this.claims['EmailNotification'] = this.emailnotiobj;
    this.claims['SMSNotification'] = this.smsnotiobj;
    // tslint:disable-next-line:triple-equals
    if (this.claims['EmailNotification'] == {} || this.claims['SMSNotification'] == {} ) {
      this.messageService.clear();
      this.messageService.add('Please add Customer Notifications.')
    }else{
      this.AdminService.addEmailSmsNotification(this.claims).subscribe((data) => {
        // this.AdminService.publish('call-user');
        this.getCustNotification();
        this.claims = {};
        this.emailnotiobj = {};
        this.smsnotiobj = {};
        this.messageService.clear();
        this.messageService.add('Customer Notification Created successfully.')
      });
    }
  }

  getCustNotification() {
    this.AdminService.getCustNotification().subscribe((data) => {
      this.businesscustnoti = data;
      this.notisuccess = data['success']
      this.businesscustnoti = this.businesscustnoti.result;
      console.log(this.businesscustnoti)
      // localStorage.setItem('companyId', data['ParentCompanyID']);
    });
  }

  updateCustomerNoti(checkvalue, type, content){
    if(content){
      checkvalue = checkvalue.currentTarget.checked
    }
    if(checkvalue == true && type == 'emailNotification'){
      this.businesscustnoti.emailNotification.isSelected = checkvalue;
      if(content){
        if(checkvalue){
          this.businesscustnoti.emailNotification.emailNotificationTime.push(content);
        }
      }
    }else if(checkvalue == false && content && type == 'emailNotification'){
      if(content){
        if(checkvalue == false){
          for(let i=0;i < this.businesscustnoti.emailNotification.emailNotificationTime.length;i++){
            this.businesscustnoti.emailNotification.emailNotificationTime.splice(this.businesscustnoti.emailNotification.emailNotificationTime.indexOf(content), 1);
          }
        }
      }
    }else if(checkvalue == true && type == 'smsNotification'){
      this.businesscustnoti.smsNotification.isSelected = checkvalue;
      if(content){
        if(checkvalue){
          this.businesscustnoti.smsNotification.smsNotificationTime.push(content);
        }
      }
    }else if(checkvalue == false && content && type == 'smsNotification'){
      if(content){
        if(checkvalue == false){
          for(let i=0;i < this.businesscustnoti.smsNotification.smsNotificationTime.length;i++){
            this.businesscustnoti.smsNotification.smsNotificationTime.splice(this.businesscustnoti.smsNotification.smsNotificationTime.indexOf(content), 1);
          }
        }
      }
    }else if(checkvalue == false && type == 'emailNotification'){
      this.businesscustnoti.emailNotification.isSelected = checkvalue;
      this.businesscustnoti.emailNotification.emailNotificationTime = [];
    }else if(checkvalue == false && type == 'smsNotification'){
      this.businesscustnoti.smsNotification.isSelected = checkvalue;
      this.businesscustnoti.smsNotification.smsNotificationTime = [];
    }
    this.emailnotiobj = this.businesscustnoti
    console.log(this.emailnotiobj)
  }

  Updateemailsmsnotification() {
    // tslint:disable-next-line:triple-equals
    this.AdminService.updateEmailSmsNotification(this.emailnotiobj).subscribe((data) => {
      // this.AdminService.publish('call-user');
      this.getCustNotification();
      this.claims = {};
      this.emailnotiobj = {};
      this.messageService.clear();
      this.messageService.add('Customer Notification Updated successfully.')
    });
  }

}
