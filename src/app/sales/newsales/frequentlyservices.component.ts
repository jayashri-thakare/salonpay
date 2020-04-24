import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { SalesService } from '../sales.service';

@Component({
  selector: 'app-frequentlyservices',
  template: '<div class="row mb-5">\n' +
    '              <div class="col-12">\n' +
    '                  <div class="comm-headline-btn">\n' +
    '                      <h4 class="hdn2 m-0">Frequently Used Services</h4>\n' +
    '                      <div class="form-group search-group mb-0">\n' +
    // '                          <form>\n' +
    // '                              <input class="form-field" type="text" name="filter-searh" required>\n' +
    // '                              <p class="form-label">Search</p>\n' +
    // '                              <button class="search icon-search" type="submit"></button>\n' +
    // '                          </form>\n' +
    '                      </div>\n' +
    '                  </div>\n' +
    '              </div>\n' +
    '              <div class="col-12">\n' +
    '                  <div class="f-row f-3 f-1300-2 f-640-1">\n' +
    '                      <div class="f-col" *ngFor="let service of frequentlyServices">\n' +
    '                          <!-- start -->\n' +
    '                          <div class="techi-box">\n' +
    '                              <div class="techi-top">\n' +
    '                                  <div class="user-det">\n' +
    '                                      <i class="icon-haircut prodt-ico"></i>\n' +
    '                                      <div class="usr-name">\n' +
    '                                          <h3><span>{{service.serviceName}}</span>$ {{service.serviceCost | number:\'1.2-2\'}}</h3>\n' +
    '                                      </div>\n' +
    '                                  </div>\n' +
    '                                  <div class="main-selt">\n' +
    '                                      <input type="checkbox" id="{{service?.serviceId}}" name="{{service?.serviceId}}" (click)="selectedServices(addedservice, $event);addingaddon(service?.serviceId, $event)" required>\n' +
    '                                      <label for="{{service?.serviceId}}">Select</label>\n' +
    '                                  </div>\n' +
    '                              </div>\n' +
    '                              <div class="techi-top center" *ngIf="service.serviceId == serviceIds">\n' +
    '                                  <a href="#" data-toggle="modal" data-target="#addonServicePopup">\n' +
    // '                                      <h5 class="prodt-ct" (click)="getaddonServiceList(service?.serviceId);"> <i class="icon-cir-plus mr-1"> <i class="icon-cir-plus mr-1"></i> Select Add On\n' +
    // '                                          Services\n' +
    // '                                      </h5>\n' +
    '                                  </a>\n' +
    '                              </div>\n' +
    '                          </div>\n' +
    '                          <!-- end -->\n' +
    '                      </div>\n' +
    '                  </div>\n' +
    '              </div>\n' +
    '          </div>'
})
export class SalesFrequentlyServicesComponent implements OnInit {
  frequentlyServices: any;
  serviceIds: any;arrayofselectedservices: Array<any>=[];
  @Output() messageToEmit = new EventEmitter<string>();
  receivedAddonService: Array<any> = [];

  constructor(public salesService: SalesService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.getFrequentlyServiceDetail();
  }

  getFrequentlyServiceDetail() {
    this.salesService.getFrequentlyServiceDetails().subscribe((data) => {
      this.frequentlyServices = data;
      // this.customerProfile = this.customerProfile.result;
      console.log(this.frequentlyServices)
      // localStorage.setItem('companyId', data['ParentCompanyID']);
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

  addingaddon(serviceid, event){
    if(event.currentTarget.checked){
      this.serviceIds = serviceid;
    }else{
      this.serviceIds = '';
    }
    for(let i=0;i< this.arrayofselectedservices.length; i++){
      if(this.arrayofselectedservices[i]['serviceId']== serviceid){
        this.arrayofselectedservices[i]['addonServices'] = []
      }
    }
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
}
