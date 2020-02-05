import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import { ModalService } from '../../_modal/modal.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AdminService} from '../admin.service';
import {MessageService} from '../../message.service';
import { Subscription } from 'rxjs';
import { parse } from 'querystring';

@Component({
  selector: 'app-addnewsms',
  template: ' <!-- Main Container Starts -->\n' +
    '    <div *ngIf="addsms" class="mainContainer main-container-flg">\n' +
    '        <h3 *ngIf="addemailvar" class="main-comm-head">\n' +
    '            <a (click)="AdminService.publish(\'back-email\')"><i class="icon-down-arrow com-arw"></i></a>Add New <span>Sms\n' +
    '                Template</span>\n' +
    '        </h3>\n' +
    '        <h3 *ngIf="updateemail" class="main-comm-head">\n' +
    '            <a (click)="AdminService.publish(\'back-email\')"><i class="icon-down-arrow com-arw"></i></a>Update <span>Sms\n' +
    '                Template</span>\n' +
    '        </h3>\n' +
    '\n' +
    '        <!-- start -->\n' +
    '    <form *ngIf="addemailvar" [formGroup]="addNewSMSForm" (ngSubmit)="addNewSMS(addNewSMSForm.value)" class="popup-scrll">\n' +
    '        <div class="email-temp-box">\n' +
    '\n' +
    '            <div class="form-group">\n' +
    '                <input type="text" id="templ-type" formControlName="SmsTemplateName" class="form-field" required />\n' +
    '                <p class="form-label">Template Name / Type</p>\n' +
    '            </div>\n' +
    '\n' +
    '            <div class="form-textarea-group">\n' +
    '                <ejs-richtexteditor formControlName="Type"></ejs-richtexteditor>\n' +
    '            </div>\n' +
    '\n' +
    '            <button class="button">Send</button>\n' +
    '\n' +
    '        </div>\n' +
    '     </form>\n' +
    '        <!-- end -->\n' +
    '        <!-- start -->\n' +
    '    <form *ngIf="updateemail" [formGroup]="updateNewSMSForm" (ngSubmit)="updateNewSMS(updateNewSMSForm.value)" class="popup-scrll">\n' +
    '        <div class="email-temp-box" *ngFor="let sms of arrayofselectedobj">\n' +
    '\n' +
    '            <div class="form-group">\n' +
    '                <input type="text" id="templ-type" formControlName="SmsTemplateName" ngModel="{{sms.smsTemplateName}}" class="form-field field--not-empty" required />\n' +
    '                <p class="form-label">Template Name / Type</p>\n' +
    '            </div>\n' +
    '\n' +
    '            <div class="form-textarea-group">\n' +
    '                <ejs-richtexteditor formControlName="Type" ngModel="{{sms.type}}"></ejs-richtexteditor>\n' +
    '            </div>\n' +
    '\n' +
    '            <button class="button">Update</button>\n' +
    '\n' +
    '        </div>\n' +
    '     </form>\n' +
    '        <!-- end -->\n' +
    '\n' +
    '    </div>\n' +
    '    <!-- Main Container Ends -->'
})
export class AddNewSmsCommunicationComponent implements OnInit {
    addNewSMSForm: FormGroup;
    updateNewSMSForm: FormGroup;
    control: FormControl;
    submitted = false;
    @Input('addSMS') addsms: any;
    @Input('addAdmin') addemailvar: any;
    @Input('updateAdmin') updateemail: any;
    @Input('emailobj') arrayofselectedobj: any;
  constructor(public AdminService: AdminService, private formBuilder: FormBuilder, private modalService: ModalService, private router: Router, private messageService: MessageService) { }
  get f() {
    return this.addNewSMSForm.controls;
  }
  get f1() {
    return this.updateNewSMSForm.controls;
  }
  ngOnInit() {
    this.addNewSMSForm = this.formBuilder.group({
        SmsTemplateName: [''],
        Type: ['']
    });
    this.updateNewSMSForm = this.formBuilder.group({
        SmsTemplateName: [''],
        Type: ['']
    });
  }

  addNewSMS(Admin) {
    debugger;
    // tslint:disable-next-line:triple-equals
    if (this.addNewSMSForm.status == 'VALID') {
      this.AdminService.add_new_sms(Admin).subscribe((data) => {
        this.AdminService.publish('call-email');
        this.addNewSMSForm.reset();
        this.AdminService.publish('back-email');
        this.messageService.clear();
        this.messageService.add('SMS Template Created Successfully.');
      });
    } else {
      console.log(Admin, this.addNewSMSForm.status);
      this.submitted = true;
      if (this.addNewSMSForm.invalid) {
        return;
      }
    }
  }

  updateNewSMS(Admin) {
    debugger;
    Admin.SmsTemplateId = this.arrayofselectedobj[0].smsTemplateId
    // tslint:disable-next-line:triple-equals
    if (this.updateNewSMSForm.status == 'VALID') {
      this.AdminService.add_new_sms(Admin).subscribe((data) => {
        this.AdminService.publish('call-email');
        this.AdminService.publish('back-email');
        this.messageService.clear();
        this.messageService.add('SMS Template Updated Successfully.');
      });
    } else {
      console.log(Admin, this.updateNewSMSForm.status);
      this.submitted = true;
      if (this.updateNewSMSForm.invalid) {
        return;
      }
    }
  }

}
