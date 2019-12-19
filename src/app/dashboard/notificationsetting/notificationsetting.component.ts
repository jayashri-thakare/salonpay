import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {UserdataService} from '../../userdata.service';

@Component({
  selector: 'app-notificationsetting',
  templateUrl: './notificationsetting.component.html',
  styleUrls: ['./notificationsetting.component.css']
})
export class NotificationsettingComponent implements OnInit {

  constructor(private router: Router, private userdataService: UserdataService) { }

  ngOnInit() {
    this.userdataService.notificationnav = false;
  }

}
