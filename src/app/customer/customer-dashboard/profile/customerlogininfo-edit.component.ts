import {Component, ComponentRef, EventEmitter, Input, OnInit, Output, ViewChild, ViewContainerRef} from '@angular/core';
import { CustomerService } from '../.././customer.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ModalService } from '../../../_modal/modal.service';
import { Router } from '@angular/router';
import { MessageService } from '../../../message.service';


@Component({
  selector: 'customer-profileinfo-modal',
  template: '<jw-modal id="side-menu-customerlogininfo">\n' +
    '  <div class="mobile-side" >\n' +
    '    <!-- common headline -->\n' +
    '    <h3 class="close-btn main-comm-head" (click)="closeModal(\'side-menu-customerlogininfo\');">\n' +
    '      <i class="icon-down-arrow com-arw"></i>{{\'Edit\' | translate}}<span> {{\'login info\' | translate}} </span>\n' +
    '    </h3>\n' +
    '    <!-- common headline end -->\n' +
    '    <form id="editLogin" [formGroup]="customerinfoForm" (ngSubmit)="update_profile_info(customerinfoForm.value)" class="popup-scrll">\n' +
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
    '      <button class="button line close-btn" type="button" (click)="closeModal(\'side-menu-customerlogininfo\')">{{\'Cancel\' | translate}}</button>\n' +
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
export class CustomerProfileinfoEditComponent implements OnInit {
  customerinfoForm: FormGroup;
  control: FormControl;
  submitted = false;
  // tslint:disable-next-line:ban-types
  @Input('userdata') userdetail: any;
  constructor(public messageService:MessageService, public customerService: CustomerService, private formBuilder: FormBuilder, private modalService: ModalService, private router: Router) { }
  get f() {
    return this.customerinfoForm.controls;
  }

  ngOnInit() {
    this.customerinfoForm = this.formBuilder.group({
      Email: ['', [Validators.required, Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]],
      oldPassword: ['',  [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&*_+=])(?=\S+$).{8,}$/)]],
      newPassword: ['',  [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&*_+=])(?=\S+$).{8,}$/)]],
    });
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  update_profile_info(customer) {
    console.log(customer, this.customerinfoForm)
    // tslint:disable-next-line:triple-equals
    if (this.customerinfoForm.status == 'VALID') {
      customer.id = localStorage.getItem('userId')
      this.customerService.update_customer_profile(customer).subscribe((data) => {
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
      console.log(customer, this.customerinfoForm.status);
      this.submitted = true;
      if (this.customerinfoForm.invalid) {
        return;
      }
    }
  }
}
