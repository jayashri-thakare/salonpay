import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import { ModalService } from '../../_modal/modal.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AdminService} from '../admin.service';
import {MessageService} from '../../message.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'addsupplier-modal',
  template: '<jw-modal id="add-supplier">\n' +
  '        <div class="mobile-side">\n' +
  '        <!-- common headline -->\n' +
  '        <h3 *ngIf="addsup" class="close-btn main-comm-head">\n' +
  '            <i class="icon-down-arrow com-arw"></i>Add <span>Supplier</span>\n' +
  '        </h3>\n' +
  '        <h3 *ngIf="updatesup" class="close-btn main-comm-head">\n' +
  '            <i class="icon-down-arrow com-arw"></i>Update <span>Supplier</span>\n' +
  '        </h3>\n' +
  '        <!-- common headline end -->\n' +
  '        <form *ngIf="addsup" [formGroup]="addsupplierForm" (ngSubmit)="createSupplier(addsupplierForm.value)" id="addsup" class="popup-scrll">\n' +
  '\n' +
  '            <div class="filBox">\n' +
  '                <!-- start -->\n' +
  '                <div class="fill-box-in scrollbar">\n' +
  '                    <!-- start -->\n' +
  '                    <div class="form-group mt-2">\n' +
  '                        <input type="text" id="first-name" formControlName="SupplierName" name="first-name" class="form-field"\n' +
  '                            required />\n' +
  '                        <p class="form-label">Supplier Name</p>\n' +
  '                    </div>\n' +
  '                    <div class="form-group mt-2">\n' +
  '                        <input type="text" id="first-name" formControlName="SupplierCode" name="first-name" class="form-field"\n' +
  '                            required />\n' +
  '                        <p class="form-label">Supplier Code</p>\n' +
  '                    </div>\n' +
  '                    <!-- end -->\n' +
  '                </div>\n' +
  '                <!-- end -->\n' +
  '            </div>\n' +
  '\n' +
  '            <div class="popBtn">\n' +
  '                <button class="button line close-btn" type="button">Cancel</button>\n' +
  '                <button class="button" type="submit">Create</button>\n' +
  '            </div>\n' +
  '\n' +
  '        </form>\n' +
  '        <form *ngIf="updatesup" [formGroup]="updatesupplierForm" (ngSubmit)="updateSupplier(updatesupplierForm.value)" id="editProfile" class="popup-scrll">\n' +
  '\n' +
  '            <div class="filBox">\n' +
  '                <!-- start -->\n' +
  '                <div class="fill-box-in scrollbar" *ngFor="let supplier of arrayofselectedobj">\n' +
  '                    <!-- start -->\n' +
  '                    <div class="form-group mt-2">\n' +
  '                        <input type="text" id="first-name" ngModel="{{supplier?.supplierName}}" formControlName="SupplierName" name="first-name" class="form-field field--not-empty"\n' +
  '                            required />\n' +
  '                        <p class="form-label">Supplier Name</p>\n' +
  '                    </div>\n' +
  '                    <div class="form-group mt-2">\n' +
  '                        <input type="text" id="first-name" ngModel="{{supplier?.supplierCode}}" formControlName="SupplierCode" name="first-name" class="form-field field--not-empty"\n' +
  '                            required />\n' +
  '                        <p class="form-label">Supplier Code</p>\n' +
  '                    </div>\n' +
  '                    <!-- end -->\n' +
  '                </div>\n' +
  '                <!-- end -->\n' +
  '            </div>\n' +
  '\n' +
  '            <div class="popBtn">\n' +
  '                <button class="button line close-btn" type="button">Cancel</button>\n' +
  '                <button class="button" type="submit">Update</button>\n' +
  '            </div>\n' +
  '\n' +
  '        </form>\n' +
  '\n' +
  '    </div>\n' +
  '    </jw-modal>'
})
export class AddSupplierComponent implements OnInit {
    addsupplierForm: FormGroup;
    updatesupplierForm: FormGroup;
    control: FormControl;
    submitted = false;
    @Input('addsup') addsup: any;
    @Input('updatesup') updatesup: any;
    @Input('turncountsobj') arrayofselectedobj: Array<any>=[];
  constructor(public AdminService: AdminService, private formBuilder: FormBuilder, private modalService: ModalService, private router: Router, private messageService: MessageService) { }

  
  get f() {
    return this.addsupplierForm.controls;
  }
  get f1() {
    return this.updatesupplierForm.controls;
  }

  ngOnInit() {
    this.addsupplierForm = this.formBuilder.group({
        SupplierCode: [''],
        SupplierName: ['']
    });
    this.updatesupplierForm = this.formBuilder.group({
        SupplierCode: [''],
        SupplierName: ['']
    });
  }

  createSupplier(Admin) {
    debugger;
    console.log(Admin)
    // tslint:disable-next-line:triple-equals
    if (this.addsupplierForm.status == 'VALID') {
      this.AdminService.add_supplier(Admin).subscribe((data) => {
        this.AdminService.publish('call-supplier');
        this.messageService.clear();
        this.messageService.add('Supplier added successfully.')
        this.modalService.close('add-supplier');
      });
    } else {
      console.log(Admin, this.addsupplierForm.status);
      this.submitted = true;
      if (this.addsupplierForm.invalid) {
        return;
      }
    }
  }

  updateSupplier(Admin) {
    debugger;
    console.log(Admin)
    Admin.SupplierId = this.arrayofselectedobj[0]['supplierId']
    // tslint:disable-next-line:triple-equals
    if (this.updatesupplierForm.status == 'VALID') {
      this.AdminService.add_supplier(Admin).subscribe((data) => {
        this.AdminService.publish('call-supplier');
        this.messageService.clear();
        this.messageService.add('Supplier updated successfully.')
        this.modalService.close('add-supplier');
      });
    } else {
      console.log(Admin, this.updatesupplierForm.status);
      this.submitted = true;
      if (this.updatesupplierForm.invalid) {
        return;
      }
    }
  }

}
