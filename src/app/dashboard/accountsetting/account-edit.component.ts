import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { ModalService } from '../../_modal/modal.service';
import {UserdataService} from '../..//userdata.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';

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
    '          <select class="select-field form-field" formControlName="TimeZoneOffset" required="">\n' +
    '            <option></option>\n' +
    '            <option>USA (GMT-4)</option>\n' +
    '            <option>IND (UTC+5:30)</option>\n' +
    '            <option>USA (GMT-4)</option>\n' +
    '            <option>IND (UTC+5:30)</option>\n' +
    '            <option>USA (GMT-4)</option>\n' +
    '            <option>IND (UTC+5:30)</option>\n' +
    '          </select>\n' +
    '          <p class="form-label sel-blk">please select..</p>\n' +
    '        </div>\n' +
    '        <!-- end -->\n' +
    '        <!-- start -->\n' +
    '        <h6 class="poptile">Language</h6>\n' +
    '        <div class="form-group">\n' +
    '          <select class="select-field form-field" formControlName="languagefld" #langSelect (change)="translate.use(langSelect.value)">\n' +
    '             <option *ngFor="let lang of translate.getLangs()" [value]="lang" [selected]="lang === translate.currentLang">{{ lang }}</option>\n' +
    '          </select>\n' +
    '          <p class="form-label sel-blk">please select..</p>\n' +
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

  constructor(public translate: TranslateService, private userdataService: UserdataService, private formBuilder: FormBuilder, private modalService: ModalService, private router: Router, private userdataservice: UserdataService) {
  }
  get f() {
    return this.accountForm.controls;
  }
  ngOnInit() {
    this.accountForm = this.formBuilder.group({
      TimeZoneOffset: ['', [Validators.required]],
      languagefld: ['',  [Validators.required]],
    });
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  update_account(userdata) {
    console.log(userdata, this.accountForm)
    // tslint:disable-next-line:triple-equals
    if (this.accountForm.status == 'VALID') {
      this.userdataservice.update_account_edit(userdata).subscribe((data) => {
        this.router.navigate(['/myprofile']);
        console.log(data)
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
