import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import { ModalService } from '../../_modal/modal.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AdminService} from '../admin.service';
import {MessageService} from '../../message.service';
import { Subscription } from 'rxjs';
import { parse } from 'querystring';

@Component({
  selector: 'app-addnewmail',
  template: '<!-- Main Container Starts -->\n' +
    '    <div *ngIf="addemail" class="mainContainer main-container-flg">\n' +
    '        <h3 *ngIf="addemailvar" class="main-comm-head">\n' +
    '            <a (click)="AdminService.publish(\'back-email\')"><i class="icon-down-arrow com-arw"></i></a>Add New <span>Email\n' +
    '                Template</span>\n' +
    '        </h3>\n' +
    '        <h3 *ngIf="updateemail" class="main-comm-head">\n' +
    '            <a (click)="AdminService.publish(\'back-email\')"><i class="icon-down-arrow com-arw"></i></a>Update <span>Email\n' +
    '                Template</span>\n' +
    '        </h3>\n' +
    '\n' +
    '        <!-- start -->\n' +
    '    <form *ngIf="addemailvar" [formGroup]="addNewEmailForm" (ngSubmit)="addNewEmail(addNewEmailForm.value)" class="popup-scrll">\n' +
    '        <div class="email-temp-box">\n' +
    '\n' +
    '            <div class="form-group">\n' +
    '                <input type="text" id="templ-name" formControlName="EmailTemplateName" class="form-field" required />\n' +
    '                <p class="form-label">Template Name</p>\n' +
    '            </div>\n' +
    '\n' +
    '            <div class="form-textarea-group">\n' +
    '                <ejs-richtexteditor formControlName="Type"></ejs-richtexteditor>\n' +
    '            </div>\n' +
    '\n' +
    '                <button class="button">Send</button>\n' +
    '        </div>\n' +
    '     </form>\n' +
    '        <!-- end -->\n' +
    '        <!-- start -->\n' +
    '    <form *ngIf="updateemail" [formGroup]="updateNewEmailForm" (ngSubmit)="updateNewEmail(updateNewEmailForm.value)" class="popup-scrll">\n' +
    '        <div class="email-temp-box" *ngFor="let email of arrayofselectedobj">\n' +
    '\n' +
    '            <div class="form-group">\n' +
    '                <input type="text" id="templ-name" formControlName="EmailTemplateName" ngModel="{{email.emailTemplateName}}" class="form-field field--not-empty" required />\n' +
    '                <p class="form-label">Template Name</p>\n' +
    '            </div>\n' +
    '\n' +
    '            <div class="form-textarea-group">\n' +
    '                <ejs-richtexteditor formControlName="Type" ngModel="{{email.type}}"></ejs-richtexteditor>\n' +
    '            </div>\n' +
    '\n' +
    '                <button class="button">Update</button>\n' +
    '        </div>\n' +
    '     </form>\n' +
    '        <!-- end -->\n' +
    '\n' +
    '    </div>\n' +
    '    <!-- Main Container Ends -->'
})
export class AddNewEmailCommunicationComponent implements OnInit {
    addNewEmailForm: FormGroup;
    updateNewEmailForm: FormGroup;
    control: FormControl;
    submitted = false;
    @Input('addEmail') addemail: any;
    @Input('addAdmin') addemailvar: any;
    @Input('updateAdmin') updateemail: any;
    @Input('emailobj') arrayofselectedobj: any;
  constructor(public AdminService: AdminService, private formBuilder: FormBuilder, private modalService: ModalService, private router: Router, private messageService: MessageService) { }
  get f() {
    return this.addNewEmailForm.controls;
  }
  get f1() {
    return this.updateNewEmailForm.controls;
  }
  ngOnInit() {
    this.addNewEmailForm = this.formBuilder.group({
        EmailTemplateName: [''],
        Type: ['']
    });
    this.updateNewEmailForm = this.formBuilder.group({
        EmailTemplateName: [''],
        Type: ['']
    });
  }

  addNewEmail(Admin) {
    debugger;
    // tslint:disable-next-line:triple-equals
    if (this.addNewEmailForm.status == 'VALID') {
      this.AdminService.add_new_email(Admin).subscribe((data) => {
        this.AdminService.publish('call-email');
        this.addNewEmailForm.reset();
        this.AdminService.publish('back-email');
        this.messageService.clear();
        this.messageService.add('Email Template Created Successfully.');
      });
    } else {
      console.log(Admin, this.addNewEmailForm.status);
      this.submitted = true;
      if (this.addNewEmailForm.invalid) {
        return;
      }
    }
  }

  updateNewEmail(Admin) {
    debugger;
    Admin.EmailTemplateId = this.arrayofselectedobj[0].emailTemplateId
    // tslint:disable-next-line:triple-equals
    if (this.updateNewEmailForm.status == 'VALID') {
      this.AdminService.add_new_email(Admin).subscribe((data) => {
        this.AdminService.publish('call-email');
        this.AdminService.publish('back-email');
        this.messageService.clear();
        this.messageService.add('Email Template Updated Successfully.');
      });
    } else {
      console.log(Admin, this.updateNewEmailForm.status);
      this.submitted = true;
      if (this.updateNewEmailForm.invalid) {
        return;
      }
    }
  }

}
