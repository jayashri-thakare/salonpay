import {Component, ElementRef, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {element} from 'protractor';
import {UserdataService} from '../../userdata.service';
import { AdminService } from 'src/app/admin/admin.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  private element: any;
  classvar: any;
  classvar1: string;
  constructor(private AdminService: AdminService, public router: Router, private el: ElementRef, private userdataService: UserdataService) {
    this.element = el.nativeElement;
  }

  ngOnInit() {
    this.classvar = 'profile-sid-box';
    this.classvar1 = 'menu-sid1-box';
  }

  navChange(id) {
    if (id === 'email-sid') {
      this.userdataService.emailnav = true;
      this.userdataService.notificationnav = false;
      this.userdataService.schedulenav = false;
      this.userdataService.accountnav = false;
      this.userdataService.profilenav = false;
      this.userdataService.banknav = false;
      this.classvar = 'email-sid-box';
    } else if (id === 'notification-sid'){
      this.userdataService.notificationnav = true;
      this.userdataService.emailnav = false;
      this.userdataService.schedulenav = false;
      this.userdataService.accountnav = false;
      this.userdataService.profilenav = false;
      this.userdataService.banknav = false;
      this.classvar = 'notification-sid-box';
    } else if (id === 'profile-sid'){
      this.userdataService.profilenav = true;
      this.userdataService.emailnav = false;
      this.userdataService.notificationnav = false;
      this.userdataService.schedulenav = false;
      this.userdataService.accountnav = false;
      this.userdataService.banknav = false;
      this.classvar = 'profile-sid-box';
    } else if (id === 'schedule-sid'){
      this.userdataService.schedulenav = true;
      this.userdataService.emailnav = false;
      this.userdataService.notificationnav = false;
      this.userdataService.accountnav = false;
      this.userdataService.profilenav = false;
      this.userdataService.banknav = false;
      this.classvar = 'schedule-sid-box';
    } else if (id === 'bank-sid'){
      this.userdataService.banknav = true;
      this.userdataService.emailnav = false;
      this.userdataService.notificationnav = false;
      this.userdataService.schedulenav = false;
      this.userdataService.accountnav = false;
      this.userdataService.profilenav = false;
      this.classvar = 'bank-sid-box';
    } else if (id === 'account-sid'){
      this.userdataService.accountnav = true;
      this.userdataService.emailnav = false;
      this.userdataService.notificationnav = false;
      this.userdataService.schedulenav = false;
      this.userdataService.profilenav = false;
      this.userdataService.banknav = false;
      this.classvar = 'account-sid-box';
    } else {
      this.userdataService.profilenav = true;
      this.userdataService.emailnav = false;
      this.userdataService.notificationnav = false;
      this.userdataService.schedulenav = false;
      this.userdataService.accountnav = false;
      this.userdataService.banknav = false;
      this.classvar = 'profile-sid-box';
    }
  }

  adminnavChange(id){
    if(id == 'menu-sid1'){
      this.AdminService.usernav = true;
      this.AdminService.rolesnav = false;
      this.AdminService.servicesnav = false;
      this.AdminService.inventorynav = false;
      this.AdminService.communicationnav = false;
      this.AdminService.taxtablenav = false;
      this.AdminService.couponsnav = false;
      this.AdminService.rewardsnav = false;
      this.AdminService.businessnav = false;
      this.classvar1 = 'menu-sid1-box'
    }else if(id == 'menu-sid2'){
      this.AdminService.usernav = false;
      this.AdminService.rolesnav = true;
      this.AdminService.servicesnav = false;
      this.AdminService.inventorynav = false;
      this.AdminService.communicationnav = false;
      this.AdminService.taxtablenav = false;
      this.AdminService.couponsnav = false;
      this.AdminService.rewardsnav = false;
      this.AdminService.businessnav = false;
      this.classvar1 = 'menu-sid2-box'
    }
  }
}
