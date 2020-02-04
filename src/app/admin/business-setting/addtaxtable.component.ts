import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import { ModalService } from '../../_modal/modal.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AdminService} from '../admin.service';
import {MessageService} from '../../message.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'addtaxtable-modal',
  template: '<jw-modal id="add-taxtable">\n' +
    '        <div class="mobile-side">\n' +
    '        <!-- common headline -->\n' +
    '        <h3 *ngIf="addTax" class="close-btn main-comm-head">\n' +
    '            <i class="icon-down-arrow com-arw" (click)="modalService.close(\'add-taxtable\')"></i>Add<span> Tax Table</span>\n' +
    '        </h3>\n' +
    '        <h3 *ngIf="updateTax" class="close-btn main-comm-head">\n' +
    '            <i class="icon-down-arrow com-arw" (click)="modalService.close(\'add-taxtable\')"></i>Update<span> Tax Table</span>\n' +
    '        </h3>\n' +
    '        <!-- common headline end -->\n' +
    '        <form *ngIf="addTax" id="serviceForm" [formGroup]="addTaxForm" (ngSubmit)="createTaxTable(addTaxForm.value)" class="popup-scrll">\n' +
    '\n' +
    '            <div class="filBox">\n' +
    '                <!-- start -->\n' +
    '                <div class="fill-box-in scrollbar">\n' +
    '                    <!-- start -->\n' +
    '                    <div class="form-group">\n' +
    '                        <input type="number" formControlName="ProductTaxRate" id="tax-collected" name="tax-collected" class="form-field" required />\n' +
    '                        <p class="form-label">Product Tax Rate</p>\n' +
    '                    </div>\n' +
    '                    <div class="form-group">\n' +
    '                        <input type="number" formControlName="ServiceTaxRate" id="tax-expected" name="tax-expected" class="form-field" required />\n' +
    '                        <p class="form-label">Service Tax Rate</p>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '                <!-- end -->\n' +
    '            </div>\n' +
    '\n' +
    '            <div class="popBtn">\n' +
    '                <button class="button line close-btn" (click)="modalService.close(\'add-taxtable\')" type="button">Cancel</button>\n' +
    '                <button class="button" type="submit">Add</button>\n' +
    '            </div>\n' +
    '\n' +
    '        </form>\n' +
    '        <form *ngIf="updateTax" id="serviceForm" [formGroup]="updateTaxForm" (ngSubmit)="updateTaxTable(updateTaxForm.value)" class="popup-scrll">\n' +
    '\n' +
    '            <div class="filBox">\n' +
    '                <!-- start -->\n' +
    '                <div class="fill-box-in scrollbar" *ngFor="let tax of arrayofselectedobj">\n' +
    '                    <!-- start -->\n' +
    '                    <div class="form-group">\n' +
    '                        <input type="number" formControlName="ProductTaxRate" ngModel="{{tax.productTaxRate}}" id="tax-collected" name="tax-collected" class="form-field field--not-empty" required />\n' +
    '                        <p class="form-label">Product Tax Rate</p>\n' +
    '                    </div>\n' +
    '                    <div class="form-group">\n' +
    '                        <input type="number" formControlName="ServiceTaxRate" ngModel="{{tax.serviceTaxRate}}" id="tax-expected" name="tax-expected" class="form-field field--not-empty" required />\n' +
    '                        <p class="form-label">Service Tax Rate</p>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '                <!-- end -->\n' +
    '            </div>\n' +
    '\n' +
    '            <div class="popBtn">\n' +
    '                <button class="button line close-btn" (click)="modalService.close(\'add-taxtable\')" type="button">Cancel</button>\n' +
    '                <button class="button" type="submit">Update</button>\n' +
    '            </div>\n' +
    '\n' +
    '        </form>\n' +
    '\n' +
    '    </div>\n' +
    '    </jw-modal>'
})
export class AddTaxTableComponent implements OnInit {
    addTaxForm: FormGroup;
    updateTaxForm: FormGroup;
    control: FormControl;
    submitted = false;
    @Input('addTax') addTax: any;
    @Input('updateTax') updateTax: any;
    @Input('Taxobj') arrayofselectedobj: Array<any>=[];

  constructor(public AdminService: AdminService, private formBuilder: FormBuilder, public modalService: ModalService, private router: Router, private messageService: MessageService) { }
  get f() {
    return this.addTaxForm.controls;
  }
  get f1() {
    return this.updateTaxForm.controls;
  }
  ngOnInit() {
    this.addTaxForm = this.formBuilder.group({
        ProductTaxRate: [''],
        ServiceTaxRate: ['']
    });
    this.updateTaxForm = this.formBuilder.group({
        ProductTaxRate: [''],
        ServiceTaxRate: ['']
    });
  }

  createTaxTable(Admin) {
    debugger;
    console.log(Admin)
    // tslint:disable-next-line:triple-equals
    if (this.addTaxForm.status == 'VALID') {
      this.AdminService.add_taxtable(Admin).subscribe((data) => {
        this.AdminService.publish('call-taxtable');
        this.messageService.clear();
        this.messageService.add('TaxTable added successfully.')
        this.modalService.close('add-taxtable');
      });
    } else {
      console.log(Admin, this.addTaxForm.status);
      this.submitted = true;
      if (this.addTaxForm.invalid) {
        return;
      }
    }
  }

  updateTaxTable(Admin) {
    debugger;
    console.log(Admin)
    Admin.TaxId = parseInt(this.arrayofselectedobj[0].taxId)
    // tslint:disable-next-line:triple-equals
    if (this.updateTaxForm.status == 'VALID') {
      this.AdminService.update_taxtable(Admin).subscribe((data) => {
        this.AdminService.publish('call-taxtable');
        this.messageService.clear();
        this.messageService.add('TaxTable updated successfully.')
        this.modalService.close('add-taxtable');
      });
    } else {
      console.log(Admin, this.updateTaxForm.status);
      this.submitted = true;
      if (this.updateTaxForm.invalid) {
        return;
      }
    }
  }

}
