import { Component, OnInit } from '@angular/core';
import {AdminService} from '../admin.service';
import {ModalService} from '../../_modal/modal.service';
import {Observable, Subscription} from 'rxjs';

@Component({
  selector: 'app-adminservice',
  templateUrl: './service.component.html'
})

export class AdminServiceComponent implements OnInit {
  subscription: Subscription;
  // tslint:disable-next-line:no-shadowed-variable
  private serviceList: Observable<any>;
  private result: Observable<any>;
  constructor(public adminService: AdminService, public modalService: ModalService) {
  }

  ngOnInit() {
    this.getServiceList();
  }

  getServiceList() {
    this.adminService.getAllServices().subscribe((res) => {
      this.result = res ;
      this.serviceList = this.result["result"] ;
    });
  }

  getServiceObject(service) {
    debugger;
    this.adminService.serviceData = service;
  }
}
