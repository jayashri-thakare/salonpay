import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import { ModalService } from '../../_modal/modal.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserdataService} from '../../userdata.service';
import {CscService} from '../../services/cscdropdown.service';
import {MessageService} from '../../message.service';

@Component({
  selector: 'address-modal',
  template: '<jw-modal id="side-menu-address">\n' +
    '  <div class="mobile-side" >\n' +
    '    <!-- common headline -->\n' +
    '    <h3 class="close-btn main-comm-head" (click)="closeModal(\'side-menu-address\');">\n' +
    '      <i class="icon-down-arrow com-arw"></i>Edit<span> Address</span>\n' +
    '    </h3>\n' +
    '    <!-- common headline end -->\n' +
    '     <form id="editAddress" [formGroup]="useraddressForm" (ngSubmit)="updateDetail(useraddressForm.value)" class="popup-scrll"> \n' +
    '\n' +
    '    <div class="filBox">\n' +
    '      <!-- start -->\n' +
    '      <div class="fill-box-in">\n' +
    '        <!-- start -->\n' +
    '        <h6 class="poptile">Address</h6>\n' +
    '        <div class="form-group">\n' +
    '          <input type="text" id="add-line1" name="add-line1" ngModel="{{userdetail?.addressLine1}}" formControlName="AddressLine1" class="form-field" \n' +
    '                 aria-invalid="false" />\n' +
    '          <p class="form-label">Address Line 1</p>\n' +
    '        </div>\n' +
    '        <div class="form-group">\n' +
    '          <input type="text" id="add-line2" name="add-line2" ngModel="{{userdetail?.addressLine2}}" formControlName="AddressLine2" class="form-field" \n' +
    '                 aria-invalid="false" />\n' +
    '          <p class="form-label">Address Line 2</p>\n' +
    '        </div>\n' +
    '        <div class="form-group">\n' +
    '        <select formControlName="countryId" ngModel="{{userdetail?.countryId}}" class="select-field form-field" (change)="onChangeCountry($event.target.value)">\n' +
    '            <option value="">Select country...</option>\n' +
    '            <option *ngFor="let country of countries" [value]="country.id">{{country.name}}</option>\n' +
    '          </select>\n' +
    '        </div>\n' +
    '        <div class="form-group">\n' +
    '          <select formControlName="StateId" ngModel="{{userdetail?.stateId}}" class="select-field form-field" (change)="onChangeState($event.target.value)">\n' +
    '            <option value="">Select state...</option>\n' +
    '            <option *ngFor="let state of states" [value]="state.id">{{state.name}}</option>\n' +
    '          </select>\n' +
    '        </div>\n' +
    '        <div class="form-group">\n' +
    '          <select formControlName="CityId" ngModel="{{userdetail?.cityId}}" class="select-field form-field">\n' +
    '            <option value="">Select city...</option>\n' +
    '            <option *ngFor="let city of cities" [value]="city.id">{{city.name}}</option>\n' +
    '          </select>\n' +
    '        </div>\n' +
    // '        <div class="form-group">\n' +
    // '          <input type="text" id="add-city" name="add-city" ngModel="{{userdetail?.city}}" formControlName="CityId" class="form-field" \n' +
    // '                 aria-invalid="false" />\n' +
    // '          <p class="form-label">City</p>\n' +
    // '        </div>\n' +
    // '        <div class="form-group">\n' +
    // '          <input type="text" id="add-state" name="add-state" ngModel="{{userdetail?.state}}" formControlName="StateId"  class="form-field" \n' +
    // '                 aria-invalid="false" />\n' +
    // '          <p class="form-label">State</p>\n' +
    // '        </div>\n' +
    '        <div class="form-group">\n' +
    '          <input type="text" id="add-code" name="add-code" formControlName="ZipCode" class="form-field" \n' +
    '                 aria-invalid="false" />\n' +
    '          <p class="form-label">Zip Code</p>\n' +
    '        </div>\n' +
    '        <!-- end -->\n' +
    '      </div>\n' +
    '      <!-- end -->\n' +
    '    </div>\n' +
    '\n' +
    '    <div class="popBtn">\n' +
    '      <button class="button line close-btn" type="button" (click)="closeModal(\'side-menu-address\');">Cancel</button>\n' +
    '      <button class="button" type="submit">Update</button>\n' +
    '    </div>\n' +
    '\n' +
    '     </form>\n' +
    '\n' +
    '  </div>\n' +
    '  <!-- Edit Address Menu End -->\n' +
    '\n' +
    '</jw-modal>'
})
export class AddressEditComponent implements OnInit {
  useraddressForm: FormGroup;
  control: FormControl;
  submitted = false;
  private userdata: any;
  countries: {};
  states: {};
  cities: {};
  @Input('userdata') userdetail: any;
  constructor(private modalService: ModalService, private router: Router, private formBuilder: FormBuilder,
              private userdataService: UserdataService, private cscService: CscService,
              private messageService: MessageService) { }

  get f() {
    return this.useraddressForm.controls;
  }

  ngOnInit() {
    this.useraddressForm = this.formBuilder.group({
      AddressLine1: [''],
      AddressLine2: [''],
      countryId: [''],
      CityId: [''],
      StateId: [''],
      ZipCode: ['', [Validators.pattern(/^[0-9]{1,6}$/)]]
    });
    this.cscService.getCountries().subscribe((data) => {
      this.countries = data;
      localStorage.setItem('companyId', data['parentCompanyId']);
    });
  }

  onChangeCountry(countryId: number) {
    if (countryId) {
      this.cscService.getStates(countryId).subscribe(
        data => {
          this.states = data;
          this.cities = null;
        }
      );
    } else {
      this.states = null;
      this.cities = null;
    }
  }

  onChangeState(stateId: number) {
    if (stateId) {
      this.cscService.getCities(stateId).subscribe(
        data => this.cities = data
      );
    } else {
      this.cities = null;
    }
  }

  updateDetail(userdata) {
    if (this.useraddressForm.status === 'VALID') {
      userdata.UserId = localStorage.getItem('userId');
      userdata.ParentCompanyId = localStorage.getItem('companyId')
      userdata.ParentCompanyId = + userdata.ParentCompanyId;
      this.userdataService.update_user_address(userdata).subscribe((data) => {
        this.messageService.clear();
        this.messageService.add('Address updated successful.');
        this.userdataService.publish('call-parent');
      });
    } else {
      console.log(userdata);
      // this.submitted = true;
      // if (this.userprofileForm.invalid) {
      //   return;
      // }
    }
    // this.userdataService.update_profile_service(this.useraddressForm, this.useraddressForm.value);
    this.userdataService.publish('call-parent');
    this.closeModal('side-menu-address');
    // this.userdataService.publish('call-parent', this.userprofileForm, userdata);
  }
  closeModal(id: string) {
    this.modalService.close(id);
  }
}
