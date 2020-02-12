import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import {Router} from '@angular/router';
import { ModalService } from '../../_modal/modal.service';
import {UserdataService} from '../..//userdata.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {Observable} from 'rxjs';
import {MessageService} from '../../message.service';
import {AdminService} from '../../admin/admin.service'

@Component({
  selector: 'account-modal',
  template: '<!-- Edit Profile Menu -->\n' +
    '<jw-modal id="account-setting">\n' +
    '<div class="mobile-side" >\n' +
    '  <!-- common headline -->\n' +
    '  <h3 class="close-btn main-comm-head" (click)="closeModal(\'account-setting\');">\n' +
    '    <i class="icon-down-arrow com-arw"></i>{{\'Account\' | translate}} <span>{{\'Settings\' | translate}}</span>\n' +
    '  </h3>\n' +
    '  <!-- common headline end -->\n' +
    ' <form *ngIf="router.url === \'/dashboard\'" id="edit-timezone" [formGroup]="accountForm" (ngSubmit)="update_account(accountForm.value)" class="popup-scrll">\n' +
    '\n' +
    '    <div class="filBox">\n' +
    '      <!-- start -->\n' +
    '      <div class="fill-box-in scrollbar">\n' +
    '        <!-- start -->\n' +
    '        <h6 class="poptile">{{\'Timezone\' | translate}}</h6>\n' +
    '        <div class="form-group">\n' +
    '          <select class="select-field form-field" formControlName="TimezoneId">\n' +
    '             <option value="">Select Timezone...</option>\n' +
    '             <option *ngFor="let timezone of timeZonesList" [value]="timezone.id">{{timezone.name | slice: 0: 35}}</option>\n' +
    '          </select>\n' +
    '        </div>\n' +
    '        <!-- end -->\n' +
    '        <!-- start -->\n' +
    '        <h6 class="poptile">{{\'Language\' | translate}}</h6>\n' +
    '        <div class="form-group">\n' +
'              <select  class="select-field form-field" formControlName="LanguageId">\n' +
    '            <option value="">Select Language...</option>\n' +
    '            <option *ngFor="let language of userLanguageList" [value]="language.id">{{language.langType}}</option>\n' +
    '          </select> \n' +
    '        </div>\n' +
    '        <!-- end -->\n' +
    '      </div>\n' +
    '      <!-- end -->\n' +
    '    </div>\n' +
    '\n' +
    '    <div class="popBtn">\n' +
    '      <button class="button line close-btn" type="button" (click)="closeModal(\'account-setting\');">{{\'Cancel\' | translate}}</button>\n' +
    '      <button class="button" type="submit">{{\'Update\' | translate}}</button>\n' +
    '    </div>\n' +
    '\n' +
    ' </form>\n' +
    ' <form *ngIf="router.url === \'/admin\'" id="edit-timezone-admin" [formGroup]="timezoneForm" (ngSubmit)="update_profile(timezoneForm.value)" class="popup-scrll">\n' +
    '\n' +
    '    <div class="filBox">\n' +
    '      <!-- start -->\n' +
    '      <div class="fill-box-in scrollbar">\n' +
    '        <!-- start -->\n' +
    '        <h6 class="poptile">{{\'Timezone\' | translate}}</h6>\n' +
    '        <div class="form-group">\n' +
    '          <select class="select-field form-field" ngModel="{{businesstipadjustment?.timezoneId}}" formControlName="timezoneId">\n' +
    '             <option value="">Select Timezone...</option>\n' +
    '             <option *ngFor="let timezone of timeZonesList" [value]="timezone.id">{{timezone.name | slice: 0: 35}}</option>\n' +
    '          </select>\n' +
    '        </div>\n' +
    '        <!-- end -->\n' +
    '      </div>\n' +
    '      <!-- end -->\n' +
    '    </div>\n' +
    '\n' +
    '    <div class="popBtn">\n' +
    '      <button class="button line close-btn" type="button" (click)="closeModal(\'account-setting\');">{{\'Cancel\' | translate}}</button>\n' +
    '      <button class="button" type="submit">{{\'Update\' | translate}}</button>\n' +
    '    </div>\n' +
    '\n' +
    ' </form>\n' +
    '\n' +
    '</div>\n' +
    '</jw-modal>\n' +
    '<!-- Edit Profile Menu End -->'
})
export class AccountEditComponent implements OnInit {
  accountForm: FormGroup;
  timezoneForm: FormGroup;
  control: FormControl;
  submitted = false;
  public userdetail: Observable< object >;
  public timeZonesList: Observable< object >;
  public userLanguageList: Observable< object >;
  useraccountdetail: any;
  @Output() accountdetail = new EventEmitter<object>();
  @Input('businesstipadjustment') businesstipadjustment: any;

  constructor(public AdminService: AdminService, public translate: TranslateService, public userdataService: UserdataService,
              private formBuilder: FormBuilder, private modalService: ModalService, private router: Router,
              private userdataservice: UserdataService, private messageService: MessageService) {
  }
  get f() {
    return this.accountForm.controls;
  }
  get f1() {
    return this.timezoneForm.controls;
  }
  ngOnInit() {
    this.accountForm = this.formBuilder.group({
      TimezoneId: ['', [Validators.required]],
      LanguageId: ['',  [Validators.required]],
    });
    this.timezoneForm = this.formBuilder.group({
      timezoneId: ['', [Validators.required]],
    });
    this.getUserAccount();
    this.getuserAccountdetail();
    this.accountdetail.emit(this.useraccountdetail);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  getUserAccount() {
    this.userdataService.getUserAccount().subscribe((data) => {
      // this.timeZonesList = data["timeZonesList"];
      // this.userdetail = data[0];
      this.timeZonesList = data[0]["timeZonesList"];
      this.userLanguageList = data[0]["userLanguageList"]
    });
  }

  update_account(userdata) {
    console.log(userdata, this.accountForm)
    // tslint:disable-next-line:triple-equals
    if (this.accountForm.status == 'VALID') {
      this.userdataservice.update_account_edit(userdata).subscribe((data) => {
        this.userdataService.publish('call-account');
        this.messageService.clear();
        this.messageService.add('User account updated successfully.')
        this.closeModal('account-setting');
      });
    } else {
      console.log(userdata, this.accountForm.status);
      this.submitted = true;
      if (this.accountForm.invalid) {
        return;
      }
    }
  }

  update_profile(admin) {
    console.log(admin, this.accountForm)
    // tslint:disable-next-line:triple-equals
    admin.timezoneId = parseInt(admin.timezoneId)
    if (this.timezoneForm.status == 'VALID') {
      this.AdminService.update_profiledetail(admin).subscribe((data) => {
        this.AdminService.publish('call-profiledetail');
        this.messageService.clear();
        this.messageService.add('Profile updated successfully.')
        this.closeModal('account-setting');
      });
    } else {
      console.log(admin, this.timezoneForm.status);
      this.submitted = true;
      if (this.timezoneForm.invalid) {
        return;
      }
    }
  }

  translatelanguage(){
    this.translate.addLangs(['English', 'Vietnamese']);
    this.translate.setDefaultLang(this.useraccountdetail.language);
    console.log(this.useraccountdetail.language)

    const browserLang = this.translate.getBrowserLang();
    this.translate.use(browserLang.match(/English|Vietnamese/) ? browserLang : this.useraccountdetail.language)
  }

  getuserAccountdetail() {
    this.userdataService.getUpdateUserAccount().subscribe((data) => {
      this.useraccountdetail = data;
      console.log(this.useraccountdetail)
      this.translatelanguage();
    });
  }
}
