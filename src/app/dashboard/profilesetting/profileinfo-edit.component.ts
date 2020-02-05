import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import { ModalService } from '../../_modal/modal.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserdataService} from '../../userdata.service';
import {ProfilesettingComponent} from './profilesetting.component';
import { MessageService } from 'src/app/message.service';

@Component({
  selector: 'profileinfo-modal',
  template: '<jw-modal id="side-menu-logininfo">\n' +
    '  <div class="mobile-side" >\n' +
    '    <!-- common headline -->\n' +
    '    <h3 class="close-btn main-comm-head" (click)="closeModal(\'side-menu-logininfo\');">\n' +
    '      <i class="icon-down-arrow com-arw"></i>{{\'Edit\' | translate}}<span> {{\'login info\' | translate}} </span>\n' +
    '    </h3>\n' +
    '    <!-- common headline end -->\n' +
    '    <form id="editLogin" [formGroup]="userinfoForm" (ngSubmit)="update_profile_info(userinfoForm.value)" class="popup-scrll">\n' +
    '\n' +
    '    <div class="filBox">\n' +
    '      <!-- start -->\n' +
    '      <div class="fill-box-in">\n' +
    '        <!-- start -->\n' +
    '        <h6 class="poptile">{{\'login info\' | translate}}</h6>\n' +
    '        <div class="form-group">\n' +
    '          <input class="form-field field--not-empty" type="text" id="info-email" ngModel="{{ userdetail?.email }}" formControlName="Email"\n' +
    '                 required="" aria-invalid="false"  readonly />\n' +
    '          <p class="form-label">{{\'Email\' | translate}}</p>\n' +
    '        </div>\n' +
    '        <div class="form-group">\n' +
    '          <input class="form-field" type="password"  id="info-password" ngModel="{{ userdetail?.password }}" formControlName="oldPassword" required>\n' +
    '          <p class="form-label">{{\'Old\' | translate}} {{\'Password\' | translate}}</p>\n' +
    '          <i class="view-pass icon-hide"></i>\n' +
    '        </div>\n' +
    '        <div class="form-group">\n' +
    '          <input class="form-field" type="password"  id="new-password" ngModel="{{ userdetail?.password }}" formControlName="newPassword" required>\n' +
    '          <p class="form-label">{{\'New\' | translate}} {{\'Password\' | translate}}</p>\n' +
    '          <i class="view-pass icon-hide"></i>\n' +
    '        </div>\n' +
    '        <!-- end -->\n' +
    '      </div>\n' +
    '      <!-- end -->\n' +
    '    </div>\n' +
    '\n' +
    '    <div class="popBtn">\n' +
    '      <button class="button line close-btn" type="button" (click)="closeModal(\'side-menu-logininfo\')">{{\'Cancel\' | translate}}</button>\n' +
    '      <button class="button" type="submit">{{\'Update\' | translate}}</button>\n' +
    '    </div>\n' +
    '\n' +
    '     </form>\n' +
    '\n' +
    '  </div>\n' +
    '  <!-- Edit Address Menu End -->\n' +
    '\n' +
    '</jw-modal>'
})
export class ProfileinfoEditComponent implements OnInit {
  userinfoForm: FormGroup;
  control: FormControl;
  submitted = false;
  // tslint:disable-next-line:ban-types
  @Input('userdata') userdetail: any;
  constructor(public messageService:MessageService, private userdataService: UserdataService, private formBuilder: FormBuilder, private modalService: ModalService, private router: Router, private userdataservice: UserdataService) { }
  get f() {
    return this.userinfoForm.controls;
  }

  ngOnInit() {
    this.userinfoForm = this.formBuilder.group({
      Email: ['', [Validators.required, Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]],
      oldPassword: ['',  [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&*_+=])(?=\S+$).{8,}$/)]],
      newPassword: ['',  [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&*_+=])(?=\S+$).{8,}$/)]],
    });
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  update_profile_info(userdata) {
    console.log(userdata, this.userinfoForm)
    // tslint:disable-next-line:triple-equals
    if (this.userinfoForm.status == 'VALID') {
      userdata.id = localStorage.getItem('userId')
      this.userdataservice.update_user_password(userdata).subscribe((data) => {
        if (data['success'] == 0){
          this.messageService.clear();
          this.messageService.add(data['result']);
        }else if(data['success'] == 1){
          this.closeModal('side-menu-logininfo');
          this.messageService.clear();
          this.messageService.add(data['result']);
        }
      });
    } else {
      console.log(userdata, this.userinfoForm.status);
      this.submitted = true;
      if (this.userinfoForm.invalid) {
        return;
      }
    }
  }
}
