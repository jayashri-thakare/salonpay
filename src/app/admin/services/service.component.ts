import { Component, OnInit } from '@angular/core';
import {AdminService} from '../admin.service';

@Component({
  selector: 'app-adminservice',
  templateUrl: './service.component.html'
})

export class AdminServiceComponent implements OnInit {

  // tslint:disable-next-line:no-shadowed-variable
  constructor(public adminService: AdminService) {
  }

  ngOnInit() {
    this.adminService.usernav = true;
  }
}
