import {Component, ComponentRef, Input, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {Router} from '@angular/router';
import { ModalService } from '../../_modal/modal.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserdataService} from '../../userdata.service';
import {MessageService} from '../../message.service';
@Component({
  selector: 'contact-modal',
  template: '<jw-modal id="side-menu-contact">\n' +
    '  <div class="mobile-side" >\n' +
    '    <!-- common headline -->\n' +
    '    <h3 class="close-btn main-comm-head" (click)="closeModal(\'side-menu-contact\');">\n' +
    '      <i class="icon-down-arrow com-arw"></i>{{\'Edit\' | translate}}<span> {{\'Contact\' | translate}}</span>\n' +
    '    </h3>\n' +
    '    <!-- common headline end -->\n' +
    '   <form id="editContact" [formGroup]="usercontactForm" (ngSubmit)="updateDetail(usercontactForm.value)"  class="popup-scrll">\n' +
    '\n' +
    '    <div class="filBox">\n' +
    '      <!-- start -->\n' +
    '      <div class="fill-box-in">\n' +
    '        <!-- start -->\n' +
    '        <h6 class="poptile">{{\'Contact\' | translate}}</h6>\n' +
    '        <div class="form-group">\n' +
    '          <input type="string" id="cont-mob" ngModel="{{userdetail?.phoneNumber}}" internationalTelNo name="cont-mob" formControlName="PhoneNumber" class="form-field field--not-empty" \n' +
    '                 aria-invalid="false" />\n' +
    '          <p class="form-label">{{\'Mobile\' | translate}}</p>\n' +
    '        </div>\n' +
    '        <div class="form-group">\n' +
    '          <input type="string" id="cont-work" ngModel="{{userdetail?.workContact}}" internationalTelNo name="cont-work" formControlName="WorkContact" class="form-field field--not-empty" \n' +
    '                 aria-invalid="false" />\n' +
    '          <p class="form-label">{{\'Work\' | translate}}</p>\n' +
    '        </div>\n' +
    '        <div class="form-group">\n' +
    '          <input type="string" id="cont-home" ngModel="{{userdetail?.homeConatct}}" internationalTelNo name="cont-home" formControlName="HomeConatct" class="form-field field--not-empty" \n' +
    '                 aria-invalid="false" />\n' +
    '          <p class="form-label">{{\'Home\' | translate}}</p>\n' +
    '        </div>\n' +
    '        <!-- end -->\n' +
    '      </div>\n' +
    '      <!-- end -->\n' +
    '    </div>\n' +
    '\n' +
    '    <div class="popBtn">\n' +
    '      <button class="button line close-btn" type="button" (click)="closeModal(\'side-menu-contact\');">{{\'Cancel\' | translate}}</button>\n' +
    '      <button class="button" type="submit">{{\'Update\' | translate}}</button>\n' +
    '    </div>\n' +
    '\n' +
    '    </form>\n' +
    '\n' +
    '  </div>\n' +
    '  <!-- Edit contact Menu End -->\n' +
    '\n' +
    '</jw-modal>'
})
export class ContactEditComponent implements OnInit {
  usercontactForm: FormGroup;
  control: FormControl;
  submitted = false;
  @Input('userdata') userdetail: any;
  constructor(private modalService: ModalService, private router: Router, private formBuilder: FormBuilder,
              private userdataService: UserdataService, private messageService: MessageService) { }

  get f() {
    return this.usercontactForm.controls;
  }

  ngOnInit() {
    this.usercontactForm = this.formBuilder.group({
      PhoneNumber: ['', [Validators.maxLength(12)]],
      WorkContact: ['', [Validators.maxLength(12)]],
      HomeConatct: ['', [Validators.maxLength(12)]]
    });
  }

  updateDetail(userdata) {
    // userdata.Email = this.email;
    this.userdataService.update_profile_service(this.usercontactForm, this.usercontactForm.value);
    this.userdataService.publish('call-parent');
    this.closeModal('side-menu-contact');
    this.messageService.clear();
    this.messageService.add('User details updated successfully.');
    // this.userdataService.publish('call-parent', this.userprofileForm, userdata);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

}
