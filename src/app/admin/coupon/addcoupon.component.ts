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
    '            <i class="icon-down-arrow com-arw" (click)="closeModal(\'add-coupon\')"></i>Add Create<span> Coupon</span>\n' +
    '        </h3>\n' +
    '        <!-- common headline end -->\n' +
    '        <form id="couponForm" [formGroup]="addcouponForm" (ngSubmit)="updateCoupon(addcouponForm.value)" class="popup-scrll">\n' +
    '\n' +
    '            <div class="filBox">\n' +
    '                <!-- start -->\n' +
    '                <div class="fill-box-in scrollbar">\n' +
    '                    <!-- start -->\n' +
    '                    <h6 class="poptile">Taken From</h6>\n' +
    '                    <div class="switch switch--horizontal">\n' +
    '                        <input id="taken-from-1" type="radio"  name="CouponTakenFrom" [value]="false" formControlName="CouponTakenFrom" />\n' +
    '                        <label for="taken-from-1">Salon</label>\n' +
    '                        <input id="taken-from-2" type="radio" name="CouponTakenFrom" [value]="true"  formControlName="CouponTakenFrom"  />\n' +
    '                        <label for="taken-from-2">Technician</label><span class="toggle-outside"><span\n' +
    '                                class="toggle-inside"></span></span>\n' +
    '                    </div>\n' +
    '                    <div class="form-group mt-2 form-field">\n' +
    '                    <ejs-multiselect formControlName="Technician" id=\'localData\' #local [dataSource]=\'adminService.serviceList\' [fields]=\'multifields\' [mode]=\'box\' [popupHeight]=\'popHeight\' [showDropDownIcon]=\'true\' [placeholder]=\'Technician\' ></ejs-multiselect>\n'+
    // '                        <select id="add-tech-select" class="select-field-2 form-field" name="multiSelect[]"\n' +
    // '                            multiple="multiple">\n' +
    // '                            <option value="1">Option 1</option>\n' +
    // '                            <option value="2">Option 2</option>\n' +
    // '                            <option value="3">Option 3</option>\n' +
    // '                            <option value="4">Option 4</option>\n' +
    // '                            <option value="5">Option 5</option>\n' +
    // '                        </select>\n' +
    '                        <p class="form-label sel-blk">Technicians</p>\n' +
    '                    </div>\n' +
    '                    <div class="form-textarea-group">\n' +
    '                        <textarea type="text" class="form-field" formControlName="Description"></textarea>\n' +
    '                        <p class="form-label">Description</p>\n' +
    '                    </div>\n' +
    '\n' +
    '                    <div class="level-price-box">\n' +
    '                        <div class="w60 w-768-100 pl-0">\n' +
    '                            <div class="switch switch--horizontal">\n' +
    '                                <input id="per-val-1" type="radio" name="ValueBit" formControlName="ValueBit"  [value]="false"/>\n' +
    '                                <label for="per-val-1">Percentage</label>\n' +
    '                                <input id="per-val-2" type="radio" name="ValueBit" [value]="true" formControlName="ValueBit" />\n' +
    '                                <label for="per-val-2">Dollar</label><span class="toggle-outside"><span\n' +
    '                                        class="toggle-inside"></span></span>\n' +
    '                            </div>\n' +
    '                        </div>\n' +
    '                        <div class="form-group w40 w-768-100 p-0">\n' +
    '                            <input type="number" id="price" formControlName="Value" name="price" class="form-field m-0" required />\n' +
    '                            <p class="form-label">Value</p>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                    <div class="form-group select2-selection select2-selection--multiple">\n' +
    '              <ejs-datetimepicker id=\'datetimepicker\' formControlName="ExpiryDate" [max]="maxDate"  [value]=\'dateValue\' format =\'MM/dd/yyyy\'></ejs-datetimepicker>' +

    // '                        <input type="text" class="form-field datetimepicker-input" id="date1" name="date1"\n' +
    // '                            autocomplete="off" />\n' +
    // '                        <i class="icon-calender"></i>\n' +
    '                        <p class="form-label">Expiry Date</p>\n' +
    '                    </div>\n' +
    '                    <div class="form-group mt-2 form-field">\n' +
    '                    <ejs-multiselect class="form-field" formControlName="Service" id=\'localData\' #local [dataSource]=\'adminService.serviceList\' [fields]=\'multifields\' [mode]=\'box\' [popupHeight]=\'popHeight\' [showDropDownIcon]=\'true\' ></ejs-multiselect>\n'+

    // '                        <select id="add-service-select" class="select-field-2 form-field" name="multiSelect[]"\n' +
    // '                            multiple="multiple">\n' +
    // '                            <option value="1">Option 1</option>\n' +
    // '                            <option value="2">Option 2</option>\n' +
    // '                            <option value="3">Option 3</option>\n' +
    // '                            <option value="4">Option 4</option>\n' +
    // '                            <option value="5">Option 5</option>\n' +
    // '                        </select>\n' +
    '                        <p class="form-label sel-blk">Service</p>\n' +
    '                    </div>\n' +
    '\n' +
    '                    <div class="form-group form-field">\n' +
    '                    <ejs-multiselect formControlName="ProductId" id=\'localData\' #local [dataSource]=\'adminService.productData.list\' [fields]=\'prodfields\' [mode]=\'box\' [popupHeight]=\'popHeight\' [showDropDownIcon]=\'true\' ></ejs-multiselect>\n'+

    // '                        <select id="addon-services" class="select-field form-field" name="addon-services" required>\n' +
    // '                            <option></option>\n' +
    // '                            <option>Option 1</option>\n' +
    // '                            <option>Option 2</option>\n' +
    // '                            <option>Option 3</option>\n' +
    // '                            <option>Option 4</option>\n' +
    // '                            <option>Option 5</option>\n' +
    // '                        </select>\n' +
    '                        <p class="form-label sel-blk">Products</p>\n' +
    '                    </div>\n' +
    '                    <div class="form-group">\n' +
    '                        <input type="text" formControlName="CouponCode" id="CouponCode" name="serv-code" class="form-field" required />\n' +
    '                        <p class="form-label">Coupon Code</p>\n' +
    '                    </div>\n' +
    '                    <div class="form-group">\n' +
    '                        <input type="number" formControlName="MaxUses" id="serv-code" name="serv-code" class="form-field" required />\n' +
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
    public multifields: Object = { text: 'serviceName', value: 'serviceId'};
    public prodfields: Object = { text: 'productName', value: 'productId'};
  constructor(public adminService: AdminService, private formBuilder: FormBuilder, private modalService: ModalService, private router: Router, private messageService: MessageService) { }

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
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  updateCoupon(userdata) {
    debugger;
    userdata.Service = String ([userdata.Service])
    userdata.Technician = String ([userdata.Technician])
    userdata.ProductId = String ([userdata.ProductId])
    userdata.ExpiryDate = String (userdata.ExpiryDate)
    // userdata.TurnCountValue = + (userdata.TurnCountValue);
    this.adminService.add_coupon(userdata).subscribe((data) => {
      debugger;
      // this.userdataService.publish('call-parent');
      this.adminService.editservice = false;
      this.modalService.close('add-service');
      this.messageService.clear();
      this.messageService.add('Service created.');
      // this.userdataService.publish('call-parent', this.userprofileForm, userdata);
    });
  }

}
