import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { ModalService } from '../../_modal/modal.service';
import {UserdataService} from '../..//userdata.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {Observable} from 'rxjs';
import {MessageService} from '../../message.service';

@Component({
  selector: 'account-modal',
  template: '<!-- Edit Profile Menu -->\n' +
    '<jw-modal id="account-setting">\n' +
    '<div class="mobile-side" >\n' +
    '  <!-- common headline -->\n' +
    '  <h3 class="close-btn main-comm-head" (click)="closeModal(\'account-setting\');">\n' +
    '    <i class="icon-down-arrow com-arw"></i>Account <span>settings</span>\n' +
    '  </h3>\n' +
    '  <!-- common headline end -->\n' +
    ' <form id="edit-timezone" [formGroup]="accountForm" (ngSubmit)="update_account(accountForm.value)" class="popup-scrll">\n' +
    '\n' +
    '    <div class="filBox">\n' +
    '      <!-- start -->\n' +
    '      <div class="fill-box-in scrollbar">\n' +
    '        <!-- start -->\n' +
    '        <h6 class="poptile">Timezone</h6>\n' +
    '        <div class="form-group">\n' +
    '          <select class="form-control" formControlName="TimezoneId">\n' +
    '             <option value="">Select Timezone...</option>\n' +
    '             <option *ngFor="let timezone of userdetail?.timeZonesList" [value]="timezone.id">{{timezone.name}}</option>\n' +
    '          </select>\n' +
    '        </div>\n' +
    '        <!-- end -->\n' +
    '        <!-- start -->\n' +
    '        <h6 class="poptile">Language</h6>\n' +
    '        <div class="form-group">\n' +
'              <select  class="form-control" formControlName="LanguageId">\n' +
    '            <option value="">Select Language...</option>\n' +
    '            <option *ngFor="let language of userdetail?.userLanguageList" [value]="language.id">{{language.langType}}</option>\n' +
    '          </select> \n' +
    '        </div>\n' +
    '        <!-- end -->\n' +
    '      </div>\n' +
    '      <!-- end -->\n' +
    '    </div>\n' +
    '\n' +
    '    <div class="popBtn">\n' +
    '      <button class="button line close-btn" type="button" (click)="closeModal(\'account-setting\');">Cancel</button>\n' +
    '      <button class="button" type="submit">Update</button>\n' +
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
  control: FormControl;
  submitted = false;
  private userdetail: Observable< object >;

  constructor(public translate: TranslateService, private userdataService: UserdataService,
              private formBuilder: FormBuilder, private modalService: ModalService, private router: Router,
              private userdataservice: UserdataService, private messageService: MessageService) {
  }
  get f() {
    return this.accountForm.controls;
  }
  ngOnInit() {
    this.accountForm = this.formBuilder.group({
      TimezoneId: ['', [Validators.required]],
      LanguageId: ['',  [Validators.required]],
    });
    this.getUserAccount();
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  getUserAccount() {
    this.userdataService.getUserAccount().subscribe((data) => {
      // this.timeZonesList = data["timeZonesList"];
      this.userdetail = data[0];
    });
  }

  update_account(userdata) {
    console.log(userdata, this.accountForm)
    // tslint:disable-next-line:triple-equals
    if (this.accountForm.status == 'VALID') {
      this.userdataservice.update_account_edit(userdata).subscribe((data) => {
        this.getUserAccount();
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
}
