import {Component, ComponentRef, EventEmitter, Input, OnInit, Output, ViewChild, ViewContainerRef} from '@angular/core';
import { CustomerService } from '../.././customer.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ModalService } from '../../../_modal/modal.service';
import { Router } from '@angular/router';
import { MessageService } from '../../../message.service';

@Component({
  selector: 'customer-contact-modal',
  template: '<jw-modal id="side-menu-customercontact">\n' +
    '  <div class="mobile-side" >\n' +
    '    <!-- common headline -->\n' +
    '    <h3 class="close-btn main-comm-head" (click)="closeModal(\'side-menu-customercontact\');">\n' +
    '      <i class="icon-down-arrow com-arw"></i>{{\'Edit\' | translate}}<span> {{\'Contact\' | translate}}</span>\n' +
    '    </h3>\n' +
    '    <!-- common headline end -->\n' +
    '   <form id="editContact" [formGroup]="customercontactForm" (ngSubmit)="updateDetail(customercontactForm.value)"  class="popup-scrll">\n' +
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
    '      <button class="button line close-btn" type="button" (click)="closeModal(\'side-menu-customercontact\');">{{\'Cancel\' | translate}}</button>\n' +
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
export class CustomerContactEditComponent implements OnInit {
  customercontactForm: FormGroup;
  control: FormControl;
  submitted = false;
  @Input('userdata') customerdetail: any;
  constructor(private modalService: ModalService, private router: Router, private formBuilder: FormBuilder,
              public customerService: CustomerService, private messageService: MessageService) { }

  get f() {
    return this.customercontactForm.controls;
  }

  ngOnInit() {
    this.customercontactForm = this.formBuilder.group({
      PhoneNumber: ['', [Validators.required]],
      WorkContact: ['', [Validators.required]],
      HomeConatct: ['', [Validators.required]]
    });
  }

  updateDetail(customer) {
    // userdata.Email = this.email;
    debugger;
    this.customerService.update_customer_profile(this.customercontactForm.value);
    this.customerService.publish('call-parent');
    this.closeModal('side-menu-Customercontact');
    this.messageService.clear();
    this.messageService.add('Customer details updated successfully.');
    // this.userdataService.publish('call-parent', this.userprofileForm, userdata);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

}
