import {Component, ComponentRef, EventEmitter, Input, OnInit, Output, ViewChild, ViewContainerRef} from '@angular/core';
import { CustomerService } from '../.././customer.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ModalService } from '../../../_modal/modal.service';
import { Router } from '@angular/router';
import { MessageService } from '../../../message.service';


@Component({
  selector: 'customer-profile-modal',
  template: '<jw-modal id="side-menu-customerprofile">\n' +
    '  <div class="mobile-side">\n' +
    '    <!-- common headline -->\n' +
    '    <h3 class="close-btn main-comm-head" (click)="closeModal(\'side-menu-customerprofile\');">\n' +
    '      <i class="icon-down-arrow com-arw"></i>{{\'Edit\' | translate }}<span> {{\'Profile\' | translate}}</span>\n' +
    '    </h3>\n' +
    '    <!-- common headline end -->\n' +
    '    <form id="editProfile" [formGroup]="customerprofileForm" (ngSubmit)="updateDetail(customerprofileForm.value)" class="popup-scrll">\n' +
    '\n' +
    '    <div class="filBox">\n' +
    '      <!-- start -->\n' +
    '      <div class="fill-box-in">\n' +
    '        <!-- start -->\n' +
    '        <h6 class="poptile">{{\'My\' | translate}} {{\'Profile\' | translate}}</h6>\n' +
    '        <div class="form-group">\n' +
    '          <input type="text" id="first-name" value="{{userdetail?.firstName}}" ngModel="{{userdetail?.firstName}}" formControlName="firstName" class="form-field field--not-empty"  \n' +
    '                 aria-invalid="false" />\n' +
    '          <p class="form-label">First Name </p>\n' +
    '        </div>\n' +
    '        <div class="form-group">\n' +
    '          <input type="text" id="last-name" value="{{ userdetail?.lastName }}" ngModel="{{ userdetail?.lastName }}" formControlName="lastName"  class="form-field field--not-empty" \n' +
    '                 aria-invalid="false" />\n' +
    '          <p class="form-label">Last Name</p>\n' +
    '        </div>\n' +
    '         <h6 class="poptile">Birthday</h6>\n' +
    '        <div class="form-group form-field field--not-empty">\n' +
    '              <ejs-datetimepicker id=\'datetimepicker\' ngModel="{{ userdetail?.dateOfBirth | date: \'M/d/yyyy\' }}" formControlName="DateOfBirth" [max]="maxDate" [ngClass]="{ \'error\': submitted && f.birthdate.errors }" placeholder=\'Birthday\' [value]=\'dateValue\' format =\'M/dd/yyyy\'></ejs-datetimepicker>' +
    '        </div>\n' +
    '        <!-- end -->\n' +
    '        <!-- start -->\n' +
    '        <h6 class="poptile">{{\'Gender\' | translate}}</h6>\n' +
    '        <div class="radio-box">\n' +
    '          <input type="radio" id="radio1" [ngClass]="{ \'error\': submitted && f.Gender.errors }" ngModel="{{userdetail?.gender}}" value="Male" formControlName="Gender" />\n' +
    '          <label for="radio1">Male</label>\n' +
    '        </div>\n' +
    '        <div class="radio-box">\n' +
    '          <input type="radio" id="radio2" [ngClass]="{ \'error\': submitted && f.Gender.errors }" ngModel="{{userdetail?.gender}}" value="Female" formControlName="Gender" />\n' +
    '          <label for="radio2">Female</label>\n' +
    '        </div>\n' +
    '        <div class="radio-box">\n' +
    '          <input type="radio" id="radio3" [ngClass]="{ \'error\': submitted && f.Gender.errors }" ngModel="{{userdetail?.gender}}" value="Others" formControlName="Gender" />\n' +
    '          <label for="radio3">Others</label>\n' +
    '        </div>\n' +
    '        <!-- end -->\n' +
    '      </div>\n' +
    '      <!-- end -->\n' +
    '    </div>\n' +
    '\n' +
    '    <div class="popBtn">\n' +
    '      <button class="button line close-btn" type="button" (click)="closeModal(\'side-menu-customerprofile\');">{{\'Cancel\' | translate}}</button>\n' +
    '      <button class="button" type="submit">{{\'Update\' | translate}}</button>\n' +
    '    </div>\n' +
    '\n' +
    '    </form>\n' +
    '\n' +
    '  </div>\n' +
    '  <!-- Edit Profile Menu End -->\n' +
    '</jw-modal>'
})
export class CustomerProfileEditComponent implements OnInit {
  customerprofileForm: FormGroup;
  control: FormControl;
  submitted = false;
  public currentDate: Date = new Date ();
  public dateValue: Date = new Date ();
  public maxDate: Date = new Date (this.currentDate)

  model: any = {};
  private form: FormGroup;
  @Input('userdata') customerdetail: any;
  @Output() messageToEmit = new EventEmitter<string>();
  constructor(private modalService: ModalService, private router: Router, private formBuilder: FormBuilder,
              public customerService: CustomerService, private messageService: MessageService) {
  }

  get f() {
    return this.customerprofileForm.controls;
  }

  updateDetail(customer) {
    // userdata.Email = this.email;
    customer = JSON.stringify(this.customerprofileForm.value);
    this.customerService.update_customer_profile(this.customerprofileForm.value);
    this.customerService.publish('call-parent');
    this.closeModal('side-menu-customerprofile');
    this.messageService.clear();
    this.messageService.add('Customer details updated successfully.');
    // this.userdataService.publish('call-parent', this.userprofileForm, userdata);
  }


  ngOnInit() {
    this.customerprofileForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      DateOfBirth: [''],
      Gender: ['']
    });

  }

  ngOnChanges() {
    this.customerdetail = this.customerdetail;
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

}
