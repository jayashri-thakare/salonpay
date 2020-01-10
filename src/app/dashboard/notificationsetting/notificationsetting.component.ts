import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {UserdataService} from '../../userdata.service';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';

// tslint:disable-next-line:class-name
class userdetail {
}

@Component({
  selector: 'app-notificationsetting',
  templateUrl: './notificationsetting.component.html',
  styleUrls: ['./notificationsetting.component.css']
})
export class NotificationsettingComponent implements OnInit {
  notificationForm: FormGroup;
  control: FormControl;
  submitted = false;
  private notificationobject = {};
  private EmailNotification = {};
  private SMSNotification = {};
  private notifications: Observable<userdetail>;

  constructor(private formBuilder: FormBuilder, private router: Router, private userdataService: UserdataService) { }

  get f() {
    return this.notificationForm.controls;
  }

  ngOnInit() {
    this.userdataService.notificationnav = false;
    // this.notificationsetting()
    this.notificationForm = this.formBuilder.group({
      NotificationTypeEmail: [''],
      NotificationTypeSMS: [''],
      EnableTextNotification: [true],
      Notification: this.notificationobject
    });
    this.getNotifications();
  }

  getNotifications() {
    this.userdataService.getNotification().subscribe((data) => {
      console.log(data)
      this.notifications = data;
    });
  }
  notificationsetting(notify, type){
    // debugger;
    if(type === 'email'){
      this.EmailNotification['Email'] = notify.currentTarget.checked;
    }else if(type === 'sms'){
      this.EmailNotification['SMS'] = notify.currentTarget.checked;
    }
    // this.SMSNotification['Email'] = true;
    // this.SMSNotification['SMS'] = false;
    this.notificationobject['Email-Notification'] = this.EmailNotification;
    this.notificationobject['SMS-Notification'] = this.SMSNotification;
    console.log(this.notificationobject);
    console.log(this.EmailNotification);
  }

  updateNotification(userdata) {
    debugger;
    console.log(userdata, this.notificationForm)
    // tslint:disable-next-line:triple-equals
    if (this.notificationForm.status == 'VALID') {
      this.userdataService.update_notification(userdata).subscribe((data) => {
        console.log('DONEEEEEEEEEE!!!')
      });
    } else {
      console.log(userdata, this.notificationForm.status);
      this.submitted = true;
      if (this.notificationForm.invalid) {
        return;
      }
    }
  }

}
