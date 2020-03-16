import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { AdminService } from 'src/app/admin/admin.service';
import { SalesService } from '../sales.service';
import { AddonServicesComponent } from './addonservices.component';

@Component({
  selector: 'app-servicestransaction',
  template: '<div class="row mb-5">\n' +
    '              <div class="col-12">\n' +
    '                  <div class="comm-headline-btn">\n' +
    '                      <h4 class="hdn2 m-0">Select Services</h4>\n' +
    '                      <div class="form-group search-group mb-0">\n' +
    '                          <form>\n' +
    '                              <input class="form-field" type="text" name="filter-searh" required>\n' +
    '                              <p class="form-label">Search</p>\n' +
    '                              <button class="search icon-search" type="submit"></button>\n' +
    '                          </form>\n' +
    '                      </div>\n' +
    '                  </div>\n' +
    '              </div>\n' +
    '              <div class="col-12">\n' +
    '                  <div class="tab-2">\n' +
    '                      <div class="service-nav-box mCustomScrollbar _mCS_1">\n' +
    '                        <div id="mCSB_1" class="mCustomScrollBox mCS-dark mCSB_horizontal mCSB_inside" style="max-height: none;" tabindex="0">\n' +
    '                            <div id="mCSB_1_container" class="mCSB_container" dir="ltr">\n' +
    '                                <ul class="nav nav-pills">\n' +
    '                              <li class="nav-item" *ngFor="let servicelist of serviceList">\n' +
    '                                  <a class="nav-link" data-toggle="pill" (click)="getAddedServiceList(servicelist.serviceCategoryId)" href="#tab1">{{servicelist?.categoryType}}</a>\n' +
    '                              </li>\n' +
    '                                </ul>\n' +
    '                            </div>\n' +
    '                        </div>\n' +
    '                      </div>\n' +
    '\n' +
    '                      <!-- Tab panes -->\n' +
    '                      <div class="service-nav-pane-box">\n' +
    '                          <div class="tab-content">\n' +
    '                              <div class="tab-pane fade show active" id="tab1">\n' +
    '                                  <!-- Tab 1 Starts -->\n' +
    '                                  <div class="f-row f-3 f-1300-2 f-640-1">\n' +
    '                                      <div class="f-col" *ngFor="let addedservice of addedserviceList">\n' +
    '                                          <!-- start -->\n' +
    '                                          <div class="techi-box">\n' +
    '                                              <div class="techi-top">\n' +
    '                                                  <div class="user-det">\n' +
    '                                                      <i class="icon-haircut prodt-ico"></i>\n' +
    '                                                      <div class="usr-name">\n' +
    '                                                          <h3><span>{{addedservice?.serviceName}}</span>$ {{addedservice?.serviceCost}}</h3>\n' +
    '                                                      </div>\n' +
    '                                                  </div>\n' +
    '                                                  <div class="main-selt">\n' +
    '                                                      <input type="checkbox" id="{{addedservice?.serviceId}}" name="{{addedservice?.serviceId}}" (click)="selectedServices(addedservice, $event)" required>\n' +
    '                                                      <label for="{{addedservice?.serviceId}}">Select</label>\n' +
    '                                                  </div>\n' +
    '                                              </div>\n' +
    '                                              <div class="techi-top center">\n' +
    '                                                  <a href="#" data-toggle="modal"\n' +
    '                                                      data-target="#addonServicePopup">\n' +
    '                                                      <h5 class="prodt-ct" (click)="getaddonServiceList(addedservice?.serviceId);addingaddon(addedservice?.serviceId)"> <i class="icon-cir-plus mr-1"></i>\n' +
    '                                                          Select Add On\n' +
    '                                                          Services\n' +
    '                                                      </h5>\n' +
    '                                                  </a>\n' +
    '                                              </div>\n' +
    '                                          </div>\n' +
    '                                          <!-- end -->\n' +
    '                                      </div>\n' +
    '                                  </div>\n' +
    '                                  <!-- Tab 1 Ends -->\n' +
    '                              </div>\n' +
    '                          </div>\n' +
    '                      </div>\n' +
    '                  </div>\n' +
    '              </div>\n' +
    '\n' +
    '          </div>\n' +
    '          <addonservice-modal [addonService]="addonService" (addonsertoparent)="getaddonservice($event)"></addonservice-modal>'
})
export class SalesTransactionServicesComponent implements OnInit {
    result: any;
    serviceList: any;
    addedserviceList: any;
    arrayofselectedservices: Array<any>=[];
    @Output() messageToEmit = new EventEmitter<string>();
    addonService: any;
    customerProfile: any;
    receivedAddonService: Array<any> = [];
    @Output() addonsertoparent = new EventEmitter<string>();

  constructor(private salesService: SalesService, public adminService:AdminService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
      this.getServiceList();
  }

  getServiceList() {
    this.adminService.GetServicesList().subscribe((res) => {
      this.result = res ;
      this.serviceList = this.result.list;
      console.log(this.serviceList)
      this.getAddedServiceList(this.result["list"][0]['serviceCategoryId']);
    });
  }

  getAddedServiceList(serviceid) {
    this.salesService.getServicesByCategoryId(serviceid).subscribe((res) => {
      this.addedserviceList = res;
    });
  }

  selectedServices(selected_services, event){
    var index = this.arrayofselectedservices.indexOf(selected_services);
    if(index<0 && event.currentTarget.checked){
      this.arrayofselectedservices.push(selected_services);
    }else{
      this.arrayofselectedservices.splice(index, 1);
    }
    this.sendMessageToParent(this.arrayofselectedservices)
  }

  sendMessageToParent(message) {
    this.messageToEmit.emit(message)
  }

  getaddonservice(addonservice) {
    this.receivedAddonService = addonservice;
    for(let i=0;i< this.arrayofselectedservices.length; i++){
      for(let j=0;j< this.receivedAddonService.length; j++){
        if(this.arrayofselectedservices[i]['serviceId']== this.receivedAddonService[j]['serviceId'] ){
          this.arrayofselectedservices[i]['addonServices'] = this.receivedAddonService
        }
      }
    }
    this.receivedAddonService = []
    this.sendMessageToParent(this.arrayofselectedservices)
  }

  getaddonServiceList(serviceid) {
    this.salesService.getAllAddedServices(serviceid).subscribe((res) => {
      this.result = res ;
      this.addonService = this.result;
    });
  }

  addingaddon(serviceid){
    for(let i=0;i< this.arrayofselectedservices.length; i++){
      if(this.arrayofselectedservices[i]['serviceId']== serviceid){
        this.arrayofselectedservices[i]['addonServices'] = []
      }
    }
  }
}
