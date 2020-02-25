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
    '          <input type="string" id="cont-mob" internationalTelNo name="cont-mob" formControlName="mobileContact" class="form-field field--not-empty" \n' +
    '                 aria-invalid="false" />\n' +
    '          <p class="form-label">{{\'Mobile\' | translate}}</p>\n' +
    '        </div>\n' +
    '        <div class="form-group">\n' +
    '          <input type="string" id="cont-work" internationalTelNo name="cont-work" formControlName="workContact" class="form-field field--not-empty" \n' +
    '                 aria-invalid="false" />\n' +
    '          <p class="form-label">{{\'Work\' | translate}}</p>\n' +
    '        </div>\n' +
    '        <div class="form-group">\n' +
    '          <input type="string" id="cont-home" internationalTelNo name="cont-home" formControlName="homeContact" class="form-field field--not-empty" \n' +
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
  @Input('customerProfile') customerProfile: any;
  mobileContactCtrl: FormControl;
  workContactCtrl: FormControl;
  homeContactCtrl: FormControl;
  constructor(private modalService: ModalService, private router: Router, private formBuilder: FormBuilder,
              public customerService: CustomerService, private messageService: MessageService) { }

  get f() {
    return this.customercontactForm.controls;
  }

  ngOnInit() {
    this.customercontactForm = this.initForm(this.customerProfile);
  }

  initForm(data): FormGroup {
    this.mobileContactCtrl = this.formBuilder.control(data.mobileContact, [Validators.required]);
    this.workContactCtrl = this.formBuilder.control(data.workContact, [Validators.required]);
    this.homeContactCtrl = this.formBuilder.control(data.homeContact, [Validators.required]);
    return this.formBuilder.group({
      mobileContact: this.mobileContactCtrl,
      workContact: this.workContactCtrl,
      homeContact: this.homeContactCtrl
    });
  }

  updateDetail(customer) {
    debugger;
    console.log(customer)
    // tslint:disable-next-line:triple-equals
    if (this.customercontactForm.status == 'VALID') {
      this.customerService.update_customer_profile(customer).subscribe((data) => {
        if(data['success'] == 0){
          this.messageService.clear();
          this.messageService.add(data['message']);
        }else if(data['success'] == 1){
          this.closeModal('side-menu-customercontact');
          this.messageService.clear();
          this.messageService.add('Customer details updated successfully.');
        }
      });
    } else {
      console.log(customer, this.customercontactForm.status);
      this.submitted = true;
      if (this.customercontactForm.invalid) {
        return;
      }
    }
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

}
