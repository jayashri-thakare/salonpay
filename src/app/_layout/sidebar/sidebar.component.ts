import {Component, ElementRef, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {element} from 'protractor';
import {UserdataService} from '../../userdata.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  private element: any;
  constructor(private router: Router, private el: ElementRef, private userdataService: UserdataService) {
    this.element = el.nativeElement;
  }

  ngOnInit() {
  }

  navChange(id) {
    if (id === 'email-sid') {
      this.userdataService.emailnav = true;
      this.userdataService.notificationnav = false;
      this.userdataService.schedulenav = false;
      this.userdataService.accountnav = false;
      this.userdataService.profilenav = false;
      this.userdataService.banknav = false;
    } else if (id === 'notification-sid'){
      this.userdataService.notificationnav = true;
      this.userdataService.emailnav = false;
      this.userdataService.schedulenav = false;
      this.userdataService.accountnav = false;
      this.userdataService.profilenav = false;
      this.userdataService.banknav = false;
    } else if (id === 'profile-sid'){
      this.userdataService.profilenav = true;
      this.userdataService.emailnav = false;
      this.userdataService.notificationnav = false;
      this.userdataService.schedulenav = false;
      this.userdataService.accountnav = false;
      this.userdataService.banknav = false;
    } else if (id === 'schedule-sid'){
      this.userdataService.schedulenav = true;
      this.userdataService.emailnav = false;
      this.userdataService.notificationnav = false;
      this.userdataService.accountnav = false;
      this.userdataService.profilenav = false;
      this.userdataService.banknav = false;
    } else if (id === 'bank-sid'){
      this.userdataService.banknav = true;
      this.userdataService.emailnav = false;
      this.userdataService.notificationnav = false;
      this.userdataService.schedulenav = false;
      this.userdataService.accountnav = false;
      this.userdataService.profilenav = false;
    } else if (id === 'account-sid'){
      this.userdataService.accountnav = true;
      this.userdataService.emailnav = false;
      this.userdataService.notificationnav = false;
      this.userdataService.schedulenav = false;
      this.userdataService.profilenav = false;
      this.userdataService.banknav = false;
    } else {
      this.userdataService.profilenav = true;
      this.userdataService.emailnav = false;
      this.userdataService.notificationnav = false;
      this.userdataService.schedulenav = false;
      this.userdataService.accountnav = false;
      this.userdataService.banknav = false;
    }
  }
}
