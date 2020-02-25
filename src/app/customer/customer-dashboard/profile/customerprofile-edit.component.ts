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
    '          <input type="text" id="first-name" formControlName="firstName" class="form-field field--not-empty"  \n' +
    '                 aria-invalid="false" />\n' +
    '          <p class="form-label">First Name </p>\n' +
    '        </div>\n' +
    '        <div class="form-group">\n' +
    '          <input type="text" id="last-name" formControlName="lastName"  class="form-field field--not-empty" \n' +
    '                 aria-invalid="false" />\n' +
    '          <p class="form-label">Last Name</p>\n' +
    '        </div>\n' +
    '         <h6 class="poptile">Birthday</h6>\n' +
    '        <div class="form-group form-field field--not-empty">\n' +
    '              <ejs-datetimepicker id=\'datetimepicker\' formControlName="dateOfBirth" [max]="maxDate" [ngClass]="{ \'error\': submitted && f.birthdate.errors }" placeholder=\'Birthday\' [value]=\'dateValue\' format =\'M/dd/yyyy\'></ejs-datetimepicker>' +
    '        </div>\n' +
    '        <!-- end -->\n' +
    '        <!-- start -->\n' +
    '        <h6 class="poptile">{{\'Gender\' | translate}}</h6>\n' +
    '        <div class="radio-box">\n' +
    '          <input type="radio" id="radio1" [ngClass]="{ \'error\': submitted && f.Gender.errors }" value="Male" formControlName="gender" />\n' +
    '          <label for="radio1">Male</label>\n' +
    '        </div>\n' +
    '        <div class="radio-box">\n' +
    '          <input type="radio" id="radio2" [ngClass]="{ \'error\': submitted && f.Gender.errors }" value="Female" formControlName="gender" />\n' +
    '          <label for="radio2">Female</label>\n' +
    '        </div>\n' +
    '        <div class="radio-box">\n' +
    '          <input type="radio" id="radio3" [ngClass]="{ \'error\': submitted && f.Gender.errors }" value="Others" formControlName="gender" />\n' +
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
  @Input('customerProfile') customerProfile: any;
  @Output() messageToEmit = new EventEmitter<string>();
  firstNameCtrl: FormControl;
  lastNameCtrl: FormControl;
  dateOfBirthCtrl: FormControl;
  genderCtrl: FormControl;
  constructor(private modalService: ModalService, private router: Router, private formBuilder: FormBuilder,
              public customerService: CustomerService, private messageService: MessageService) {
  }

  get f() {
    return this.customerprofileForm.controls;
  }

  ngOnInit() {
    this.customerprofileForm = this.initForm(this.customerProfile);
  }

  initForm(data): FormGroup {
    this.firstNameCtrl = this.formBuilder.control(data.firstName, [Validators.required]);
    this.lastNameCtrl = this.formBuilder.control(data.lastName, [Validators.required]);
    this.dateOfBirthCtrl = this.formBuilder.control(data.dateOfBirth, [Validators.required]);
    this.genderCtrl = this.formBuilder.control(data.gender, [Validators.required]);
    return this.formBuilder.group({
      firstName: this.firstNameCtrl,
      lastName: this.lastNameCtrl,
      dateOfBirth: this.dateOfBirthCtrl,
      gender: this.genderCtrl
    });
  }

  updateDetail(customer) {
    debugger;
    console.log(customer)
    // tslint:disable-next-line:triple-equals
    if (this.customerprofileForm.status == 'VALID') {
      this.customerService.update_customer_profile(customer).subscribe((data) => {
        if(data['success'] == 0){
          this.messageService.clear();
          this.messageService.add(data['message']);
        }else if(data['success'] == 1){
          this.closeModal('side-menu-customerprofile');
          this.customerService.publish('call-profileDetail');
          this.messageService.clear();
          this.messageService.add('Customer details updated successfully.');
        }
      });
    } else {
      console.log(customer, this.customerprofileForm.status);
      this.submitted = true;
      if (this.customerprofileForm.invalid) {
        return;
      }
    }
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

}
