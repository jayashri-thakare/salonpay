import { Component, OnInit } from '@angular/core';
import {AdminService} from '../admin.service';
import {ModalService} from '../../_modal/modal.service';
import {Observable, Subscription} from 'rxjs';
import {MessageService} from '../../message.service';

@Component({
  selector: 'app-adminservice',
  templateUrl: './service.component.html'
})

export class AdminServiceComponent implements OnInit {
  subscription: Subscription;
  // tslint:disable-next-line:no-shadowed-variable
  public serviceList: Observable<any>;
  private result: Observable<any>;
  constructor(public adminService: AdminService, public modalService: ModalService, public messageService: MessageService) {
  }

  ngOnInit() {
    this.getServiceList();
  }

  getServiceList() {
    this.adminService.getAllServices().subscribe((res) => {
      this.result = res ;
      this.serviceList = this.result["result"]["list"];
      this.adminService.serviceList = this.serviceList;
    });
  }

  getServiceObject(service) {
    this.adminService.serviceData = service;
  }

  deleteService(service) {
    this.adminService.deleteService(service).subscribe((data) => {
      this.getServiceList();
      this.messageService.clear();
      this.messageService.add(data['result']);
    });
  }
}
