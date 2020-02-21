import { Component, OnInit } from '@angular/core';
import {AdminService} from '../admin.service';
import {ModalService} from '../../_modal/modal.service';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MessageService} from '../../message.service';

@Component({
  selector: 'app-addservice',
  styleUrls: ['./service.component.css'],
  template: '<jw-modal id="add-service">\n' +
    '    <div class="mobile-side" id="add-service">\n' +
    '        <!-- common headline -->\n' +
    '        <h3 class="close-btn main-comm-head">\n' +
    '            <i class="icon-down-arrow com-arw"></i>Add New<span> Service</span>\n' +
    '        </h3>\n' +
    '        <!-- common headline end -->\n' +
    '        <form id="serviceForm" [formGroup]="addserviceForm"  class="popup-scrll">\n' +
    '\n' +
    '            <div class="filBox">\n' +
    '                <!-- start -->\n' +
    '                <div class="fill-box-in scrollbar scroll-padding">\n' +
    '                    <!-- start -->\n' +
    '                    <div class="form-group mt-2">\n' +
    '                        <input type="text" name="serv-code" class="form-field" [ngClass]="{\'field--not-empty\': adminService.serviceData?.serviceName}" formControlName="ServiceName" ngModel="{{adminService.serviceData?.serviceName}}" required />\n' +
    '                        <p class="form-label sel-blk">Service Name</p>\n' +
    '                    </div>\n' +
    '                    <div class="form-group">\n' +
    '                           <select class="select-field form-field field--not-empty" formControlName="ServiceCategoryId" ngModel="{{adminService.serviceData?.serviceCategoryId}}">\n' +
    '                             <option value="">Select Category</option>\n' +
    '                             <option *ngFor="let category of service_category" [ngValue]="category?.serviceCategoryId">{{category?.categoryType}}</option>\n' +
    '                           </select>\n' +
    '                        <p class="form-label sel-blk">Service Categories</p>\n' +
    '                    </div>\n' +
    '                        <h6 class="poptile">Service</h6>\n' +
    '                    <div class="form-group mt-2 form-field">\n' +
    '                    <ejs-multiselect formControlName="AddOnServiceIds" id=\'localData\' #local [dataSource]=\'service\' [fields]=\'multifields\' [mode]=\'box\' [popupHeight]=\'popHeight\' ></ejs-multiselect>\n'+
    // '                           <select class="select-field form-field" formControlName="AddOnServiceIds">\n' +
    // // '                             <option value="">Addon Services</option>\n' +
    // '                             <option *ngFor="let service of service" [ngValue]="service?.serviceId">{{service?.serviceName}}</option>\n' +
    // '                           </select>\n' +
    '                    </div>\n' +
    '                    <div class="form-group">\n' +
    '                        <input type="text" id="serv-code" name="serv-code" class="form-field" [ngClass]="{\'field--not-empty\': adminService.serviceData?.serviceCode}" formControlName="ServiceCode" ngModel="{{adminService.serviceData?.serviceCode}}" required />\n' +
    '                        <p class="form-label">Service Code/Number</p>\n' +
    '                    </div>\n' +
    '                    <div class="form-group">\n' +
    '                        <input type="text" id="def-time" name="def-time" class="form-field" [ngClass]="{\'field--not-empty\': adminService.serviceData?.serviceTime}" formControlName="DefaultTime" ngModel="{{adminService.serviceData?.serviceTime}}" required />\n' +
    '                        <p class="form-label">Default Time</p>\n' +
    '                    </div>\n' +
    '                    <div class="form-group">\n' +
    '                        <input type="number" id="serv-cost" name="serv-cost" class="form-field" [ngClass]="{\'field--not-empty\': adminService.serviceData?.serviceCost}" ngModel="{{adminService.serviceData?.serviceCost}}" formControlName="ServiceCost" required />\n' +
    '                        <p class="form-label">Service Cost</p>\n' +
    '                    </div>\n' +
    '\n' +
    '                    <h6 class="poptile">Service Pricing Structure</h6>\n' +
    '                    <div class="switch switch--horizontal">\n' +
    '                        <input id="serv-level-1" type="radio" name="PricingBit" (click)="showLevel(false)" ngModel="{{adminService.serviceData?.pricingBit}}" [value]="false" formControlName="PricingBit"/>\n' +
    '                        <label for="serv-level-1">Single Level</label>\n' +
    '                        <input id="serv-level-2" type="radio" name="PricingBit" (click)="showLevel(true)" ngModel="{{adminService.serviceData?.pricingBit}}" [value]="true" formControlName="PricingBit" />\n' +
    '                        <label for="serv-level-2">Multi Level</label><span class="toggle-outside"><span\n' +
    '                                class="toggle-inside"></span></span>\n' +
    '                    </div>\n' +
    '                    <div formArrayName="ServicePriceSt"> \n' +
    '                    <div *ngFor="let level of levelFormGroup.controls; let i = index;">\n' +
    '                    <div  [formGroupName]="i">\n' +
    '                    <div class="level-price-box" *ngIf="multi===true">\n' +
    '                        <div class="form-group w60 w-768-100 pl-0" >\n' +
    '                           <select class="select-field form-field" formControlName="ServiceLevelId" >\n' +
    '                             <option value="">Select Level</option>\n' +
    '                             <option *ngFor="let level of service_level" [ngValue]="level?.serviceLevelId">{{level.serviceLevelName}}</option>\n' +
    '                           </select>\n' +
    '                        </div>\n' +
    '                        <div class="form-group w40 w-768-100 p-0">\n' +
    '                            <input type="number" id="price" name="price" class="form-field" formControlName="Price"  />\n' +
    '                            <p class="form-label">Price</p>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '\n' +
    '                    <div class="form-group">\n' +
    '                        <input type="number" id="com-split" name="com-split" class="form-field" formControlName="CommissionSplitPercent"  required />\n' +
    '                        <p class="form-label">Commission Split %</p>\n' +
    '                    </div>\n' +
    '                    <button type="button" class="button dashed-button mb-4">\n' +
    '                        <i class="icon-cir-plus form-rem-icon mr-2" (click)="removeLevel(i)"></i>remove\n' +
    '                    </button>\n' +
    '                    </div>\n' +
    '                    </div>\n' +
    '                    </div>\n' +
    '\n' +
    '                    <button type="button" class="button dashed-button mb-4" *ngIf="multi===true" >\n' +
    '                        <i class="icon-cir-plus mr-2" (click)="addLevel()"></i>Add\n' +
    '                    </button>\n' +
    '\n' +
    '                    <h6 class="poptile">Turn Count Override</h6>\n' +
    '                    <div class="switch switch--horizontal">\n' +
    // '                        <input id="turn-count-1" type="radio" name="TurnCountOverride" [(ngModel)]="adminService.serviceData.turnCountOn"  [value]="false"  formControlName="TurnCountOverride"/>\n' +
    '                        <input id="turn-count-1" type="radio" name="TurnCountOverride" (click)="showTurn(false)" ngModel="{{adminService.serviceData?.turnCountOn}}"  [value]="false"  formControlName="TurnCountOverride"/>\n' +
    '                        <label for="turn-count-1">Off</label>\n' +
    '                        <input id="turn-count-2" type="radio" name="TurnCountOverride" (click)="showTurn(true)" ngModel="{{adminService.serviceData?.turnCountOn}}" [value]="true" formControlName="TurnCountOverride" />\n' +
    '                        <label for="turn-count-2">On</label><span class="toggle-outside"><span\n' +
    '                                class="toggle-inside"></span></span>\n' +
    '                    </div>\n' +
    '                    <div class="form-group" *ngIf="turn===true || adminService.serviceData?.turnCountId">\n' +
    '                        <select class="select-field form-field  field--not-empty" formControlName="TurnCountValue" ngModel="{{adminService.serviceData?.turnCountId}}">\n' +
    '                             <option value="">Select Turn</option>\n' +
    '                             <option *ngFor="let turn of turn_countlist" [ngValue]="turn?.turnCountId">{{turn.value}}</option>\n' +
    '                           </select>\n' +
    '                        <p class="form-label sel-blk">Select Value</p>\n' +
    '                    </div>\n' +
    '\n' +
    '                </div>\n' +
    '                <!-- end -->\n' +
    '            </div>\n' +
    '\n' +
    '            <div class="popBtn">\n' +
    '                <button class="button line close-btn" type="button" (click)="modalService.close(\'add-service\')">Cancel</button>\n' +
    '                <button class="button" type="submit" (click)="updateDetail(addserviceForm.value)">Add</button>\n' +
    '            </div>\n' +
    '\n' +
    '        </form>\n' +
    '\n' +
    '    </div>'
})

export class AddServiceComponent implements OnInit {
  addserviceForm: FormGroup;
  control: FormControl;
  public levelList: FormArray;

  submitted = false;
  // tslint:disable-next-line:no-shadowed-variable
  public result: {};
  public service_category: {};
  public service_level: {};
  // tslint:disable-next-line:variable-name
  public turn_countlist: {};
  public servicedetail: {};
  service: {};
  serviceName: string
  public multifields: Object = { text: 'serviceName', value: 'serviceId'};
  public multi: boolean;
  public turn: boolean;

  constructor(public adminService: AdminService, public modalService: ModalService, private formBuilder: FormBuilder,
              private messageService: MessageService) {
  }

  get f() {
    return this.addserviceForm.controls;
  }
  get levelFormGroup() {
    return this.addserviceForm.get('ServicePriceSt') as FormArray;
  }
  createLevel(): FormGroup {
    return this.formBuilder.group({
      ServiceLevelId: [''],
      CommissionSplitPercent: [''],
      Price: ['']
    });
  }
  ngOnInit() {
    this.addserviceForm = this.formBuilder.group({
      ServiceName: [''],
      ServiceCategoryId: [''],
      AddOnServiceIds: [''],
      ServiceCost: [''],
      ServiceCode: [''],
      DefaultTime: [''],
      PricingBit: [''],
      TurnCountOverride: [''],
      TurnCountValue: [''],
      ServicePriceSt: this.formBuilder.array([this.createLevel()])
    });
    this.levelList = this.addserviceForm.get('ServicePriceSt') as FormArray;
    this.getServiceCategories();
    this.getAddonService();
    // this.adminService.serviceData.pricingBit = false;
    this.servicedetail = this.adminService.serviceData;
    // this.getServiceDetails();
  }

  addLevel() {
    this.levelList.push(this.createLevel());
  }

  showLevel(val) {
    this.multi = !this.multi;
  }

  showTurn(val) {
    this.turn = !this.turn;
  }

  removeLevel(index) {
    this.levelList.removeAt(index);
  }

  getLevelsFormGroup(index): FormGroup {
    // this.levelList = this.addserviceForm.get('ServicePriceSt') as FormArray;
    const formGroup = this.levelList.controls[index] as FormGroup;
    return formGroup;
  }

  getServiceCategories() {
    this.adminService.getServiceCategories().subscribe((data) => {
      this.result = data['result'];
      this.service_category = this.result['serviceCategories'];
      this.service_level = this.result['serviceLevels'];
      this.turn_countlist = this.result['turnCountList'];
    });
  }


  getAddonService() {
    this.adminService.getAddonServices().subscribe((data) => {
      this.service = data["result"];
    });
  }

  getServiceDetails() {
    this.adminService.getServiceDetails().subscribe((data) => {
      this.servicedetail = data["result"]["serviceDetails"];
    });

  }
  updateDetail(userdata) {
    // userdata.Email = this.email;
    userdata.ServiceCategoryId = + (userdata.ServiceCategoryId);
    userdata.ServiceCost = + (userdata.ServiceCost);
    if(userdata.PricingBit=='' || userdata.ServicePriceSt[0].ServiceLevelId==''){
      userdata.PricingBit = false;
      userdata.ServicePriceSt[0].ServiceLevelId = 0;
      userdata.ServicePriceSt[0].Price = 0;
    }
    if(userdata.TurnCountOverride==''){
      userdata.TurnCountOverride = false;
      userdata.TurnCountValue = 0;
    }
    userdata.PricingBit = Boolean(userdata.PricingBit);
    userdata.TurnCountValue = + (userdata.TurnCountValue)
    userdata.TurnCountOverride = Boolean(userdata.TurnCountOverride)
    // userdata.TurnCountValue = + (userdata.TurnCountValue);
    this.adminService.add_service(userdata).subscribe((data) => {
      this.adminService.publish('service-list');
      this.adminService.editservice = false;
      this.modalService.close('add-service');
      this.messageService.clear();
      this.messageService.add('Service created.');
      // this.userdataService.publish('call-parent', this.userprofileForm, userdata);
    });
  }
}
