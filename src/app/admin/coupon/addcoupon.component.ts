import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import { ModalService } from '../../_modal/modal.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AdminService} from '../admin.service';
import {MessageService} from '../../message.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'addcoupon-modal',
  styleUrls: ['./coupon.component.css'],
  template: '<jw-modal id="add-coupon">\n' +
    '        <div class="mobile-side">\n' +
    '        <!-- common headline -->\n' +
    '        <h3 class="close-btn main-comm-head">\n' +
    '            <i *ngIf="adminService.couponName===add" class="icon-down-arrow com-arw" (click)="closeModal(\'add-coupon\')"></i>Add Create<span> Coupon</span>\n' +
    // '            <i *ngIf="adminService.couponName===update" class="icon-down-arrow com-arw" (click)="closeModal(\'add-coupon\')"></i>Update<span> Coupon =={{adminService.couponName}}</span>\n' +
    '        </h3>\n' +
    '        <!-- common headline end -->\n' +
    '        <form id="couponForm" [formGroup]="addcouponForm" (ngSubmit)="updateCoupon(addcouponForm.value)" class="popup-scrll">\n' +
    '\n' +
    '            <div class="filBox">\n' +
    '                <!-- start -->\n' +
    '                <div class="fill-box-in scrollbar scroll-padding">\n' +
    '                    <!-- start -->\n' +
    '                    <h6 class="poptile">Taken From</h6>\n' +
    '                    <div class="switch switch--horizontal">\n' +
    '                        <input  type="radio"  id="taken-from-1" [value]="false" ngModel="{{adminService.coupon?.couponTakenFrom}}" formControlName="CouponTakenFrom" (click)="hide(false)"/>\n' +
    '                        <label for="taken-from-1">Salon</label>\n' +
    '                        <input  type="radio" id="taken-from-2" [value]="true"  ngModel="{{adminService.coupon?.couponTakenFrom}}" formControlName="CouponTakenFrom" (click)="hide(true)" />\n' +
    '                        <label for="taken-from-2">Technician</label><span class="toggle-outside"><span\n' +
    '                                class="toggle-inside"></span></span>\n' +
    '                    </div>\n' +
    '                    <div *ngIf="hidetech===true">\n' +
    '                     <h6 class="poptile">Technicians</h6>\n' +
    '                    <div class="form-group mt-2 form-field multi-height" >\n' +
    '                    <ejs-multiselect formControlName="Technician" id=\'localData\' #local [dataSource]=\'technician\' [fields]=\'techfields\' [placeholder]=\'Technician\' ></ejs-multiselect>\n'+
    '                    </div>\n' +
    '                    </div>\n' +
    '                    <div class="form-textarea-group">\n' +
    '                        <textarea type="text" class="form-field" [ngClass]="{\'field--not-empty\': adminService.coupon?.description}" ngModel="{{adminService.coupon?.description}}" formControlName="Description"></textarea>\n' +
    '                        <p class="form-label">Description</p>\n' +
    '                    </div>\n' +
    '\n' +
    '                    <div class="level-price-box">\n' +
    '                        <div class="w60 w-768-100 pl-0">\n' +
    '                            <div class="switch switch--horizontal">\n' +
    '                                <input id="per-val-1" type="radio" name="ValueBit" ngModel="{{adminService.coupon?.valueBit}}" formControlName="ValueBit"  [value]="false"/>\n' +
    '                                <label for="per-val-1">Percentage</label>\n' +
    '                                <input id="per-val-2" type="radio" name="ValueBit" ngModel="{{adminService.coupon?.valueBit}}" [value]="true" formControlName="ValueBit" />\n' +
    '                                <label for="per-val-2">Dollar</label><span class="toggle-outside"><span\n' +
    '                                        class="toggle-inside"></span></span>\n' +
    '                            </div>\n' +
    '                        </div>\n' +
    '                        <div class="form-group w40 w-768-100 p-0">\n' +
    '                            <input type="number" id="price" formControlName="Value" ngModel="{{adminService.coupon?.value}}" name="price" class="form-field m-0" required />\n' +
    '                            <p class="form-label">Value</p>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                        <h6 class="poptile">Expiry Date</h6>\n' +
    '                    <div class="form-group form-field select2-selection select2-selection--multiple">\n' +
    '              <ejs-datetimepicker id=\'datetimepicker\' formControlName="ExpiryDate" ngModel="{{adminService.coupon?.expiryDate}}" format =\'MM/dd/yyyy\'></ejs-datetimepicker>' +
    '                    </div>\n' +
    '                        <h6 class="poptile">Service</h6>\n' +
    '                    <div class="form-group mt-2 form-field">\n' +
    '                    <ejs-multiselect class="form-field multi-height" formControlName="Service" id=\'localData\' #local [dataSource]=\'adminService.serviceList\' [fields]=\'multifields\' [mode]=\'box\' [popupHeight]=\'popHeight\' ></ejs-multiselect>\n'+
    '                    </div>\n' +
    '\n' +
    '                        <h6 class="poptile">Products</h6>\n' +
    '                    <div class="form-group form-field multi-height">\n' +
    '                    <ejs-multiselect formControlName="ProductId" id=\'localData\' #local [dataSource]=\'adminService.productData.list\' [fields]=\'prodfields\' [mode]=\'box\' [popupHeight]=\'popHeight\'></ejs-multiselect>\n'+

    // '                        <select id="addon-services" class="select-field form-field" name="addon-services" required>\n' +
    // '                            <option></option>\n' +
    // '                            <option>Option 1</option>\n' +
    // '                            <option>Option 2</option>\n' +
    // '                            <option>Option 3</option>\n' +
    // '                            <option>Option 4</option>\n' +
    // '                            <option>Option 5</option>\n' +
    // '                        </select>\n' +
    '                    </div>\n' +
    '                    <div class="form-group">\n' +
    '                        <input type="text" formControlName="CouponCode" [ngClass]="{\'field--not-empty\': adminService.coupon?.couponCode}"  ngModel="{{adminService.coupon?.couponCode}}" id="CouponCode" name="serv-code" class="form-field" required />\n' +
    '                        <p class="form-label">Coupon Code</p>\n' +
    '                    </div>\n' +
    '                    <div class="form-group">\n' +
    '                        <input type="number" formControlName="MaxUses" id="serv-code" ngModel="{{adminService.coupon?.maxUses}}" name="serv-code" class="form-field" required />\n' +
    '                        <p class="form-label">Max Uses</p>\n' +
    '                    </div>\n' +
    '                    <div class="form-group">\n' +
    '                        <select id="count-val" class="select-field form-field" name="count-val" required>\n' +
    '                            <option></option>\n' +
    '                            <option>Active</option>\n' +
    '                            <option>Inactive</option>\n' +
    '                        </select>\n' +
    '                        <p class="form-label sel-blk">Status</p>\n' +
    '                    </div>\n' +
    '\n' +
    '                </div>\n' +
    '                <!-- end -->\n' +
    '            </div>\n' +
    '\n' +
    '            <div class="popBtn">\n' +
    '                <button class="button line close-btn" (click)="closeModal(\'add-coupon\')" type="button">Cancel</button>\n' +
    '                <button class="button" type="submit">Add</button>\n' +
    '            </div>\n' +
    '\n' +
    '        </form>\n' +
    '\n' +
    '    </div>\n' +
    '    </jw-modal>'
})
export class AddCouponComponent implements OnInit {
    addcouponForm: FormGroup;
    control: FormControl;
    submitted = false;
    hidetech = false;
    public multifields: Object = { text: 'serviceName', value: 'serviceId'};
    public techfields: Object = { text: 'fullName', value: 'id'};
    public prodfields: Object = { text: 'productName', value: 'productId'};
  public technician: any;
  constructor(public adminService: AdminService, private formBuilder: FormBuilder, public modalService: ModalService, private router: Router, private messageService: MessageService) { }

  get f() {
    return this.addcouponForm.controls;
  }
  ngOnInit() {
    this.addcouponForm = this.formBuilder.group({
      CouponTakenFrom: [''],
      CouponCode: [''],
      Description: [''],
      ValueBit: [''],
      Value: [''],
      ExpiryDate: [''],
      MaxUses: [''],
      ProductId: [''],
      Service: [''],
      Technician: ['']
    });
    // this.adminService.couponName = 'add';
    this.getTechnician();
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  hide(show){
    this.hidetech = !this.hidetech;
  }
  getTechnician() {
    this.adminService.getTechnician().subscribe((data) => {
      this.technician = data;
    });
  }
  updateCoupon(userdata) {
    // userdata.Service = String ([userdata.Service])
    userdata.Technician = String ([userdata.Technician])
    // userdata.ProductId = String ([userdata.ProductId])
    userdata.ExpiryDate = String (userdata.ExpiryDate)
    if (userdata.CouponTakenFrom=='' || userdata.CouponTakenFrom==undefined){
      userdata.CouponTakenFrom = false;
    }
    if(userdata.ValueBit == '' || userdata.ValueBit==undefined){
      userdata.ValueBit = false;
    }
    if(this.adminService.couponName=='update') {
      userdata.CouponId = this.adminService.coupon['couponId'];
    }
    userdata.Value = parseInt(userdata.Value)
    userdata.MaxUses = parseInt(userdata.MaxUses);
    userdata.ValueBit = Boolean(userdata.ValueBit)
    // userdata.TurnCountValue = + (userdata.TurnCountValue);
    this.adminService.add_coupon(userdata).subscribe((data) => {
      this.adminService.publish('call-coupon');
      this.adminService.editservice = false;
      this.modalService.close('add-coupon');
      this.messageService.clear();
      if(this.adminService.couponName=='update'){
        this.messageService.add('Coupon updated successfully.');
      }else{
        this.messageService.add('Coupon created successfully.');
      }
      // this.userdataService.publish('call-parent', this.userprofileForm, userdata);
    });
  }

}
