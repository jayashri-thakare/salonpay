import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {UserdataService} from '../../userdata.service';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
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
  private note = {};
  private notifications: Observable<userdetail>;
  private Email = {};
  private SMS = {};
  private note1 = {};
  private a1: any[];
  private a2: {};
  constructor(private formBuilder: FormBuilder, private router: Router, private userdataService: UserdataService) { }

  get f() {
    return this.notificationForm.controls;
  }

  ngOnInit() {
    this.userdataService.notificationnav = false;
    // this.notificationsetting()
    this.notificationForm = this.formBuilder.group({
      // NotificationTypeEmail: [''],
      // NotificationTypeSMS: [''],
      EnableEmailNotification: [''],
      // EnableEmailNotification1: [''],
      EnableTextNotification: [''],
      // EnableTextNotification1: ['']
      // notifications: new FormArray([])
      // Notification: this.notificationobject
    });
    // this.getNotifications();
    // this.getMasterNotification();
    this.getNotifications();
  }


  getMasterNotification() {
    this.userdataService.getMasterNotification().subscribe((data) => {
      console.log(data)
      this.notifications = data;
    });
  }
  getNotifications() {
    this.userdataService.getNotification().subscribe((data) => {
      console.log(data)
      // this.notifications = data;
      this.notifications = data[0].notify;
    });
  }
  notificationsetting(notify, type, note) {

    debugger;
    // if(type === 'email'){
    //   this.EmailNotification['EnableEmailNotification'] = notify;
    // }else if(type === 'sms'){
    //   this.EmailNotification['EnableTextNotification'] = notify;
    // }
    // if(type === 'sms-email'){
    //
    //   this.SMSNotification['EnableEmailNotification'] = notify;
    // }else if(type === 'sms-sms'){
    //   this.SMSNotification['EnableTextNotification'] = notify;
    // }
    // this.notificationobject[note] = this.EmailNotification;
    // console.log(this.notificationobject);
    // console.log(this.EmailNotification);
    if (type === 'email'){
      this.Email = notify.currentTarget.checked;
      this.EmailNotification['EnableEmailNotification'] = notify.currentTarget.checked;
    } else if(type === 'sms'){
      this.SMS = notify.currentTarget.checked;
      this.EmailNotification['EnableTextNotification'] = notify.currentTarget.checked;
    }
    // this.SMSNotification['Email'] = true;
    // this.SMSNotification['SMS'] = false;
    this.notificationobject['EnableEmailNotification'] = this.EmailNotification;
    this.notificationobject['EnableTextNotification'] = this.SMSNotification
    this.note1[note] = this.EmailNotification;

    this.note[note] =  this.SMSNotification
    console.log(this.notificationobject);
    console.log(this.note);
    console.log(this.note1);
  }

  updateNotification(userdata) {
    debugger;
    console.log(userdata, this.notificationForm)
    // tslint:disable-next-line:triple-equals
    // this.a1 = [];
    // this.a2 = {};
    // let a2;
    // a2 = this.note1;
    // let a1;
    // a1 = a2;
    if (this.notificationForm.status == 'VALID') {
      userdata["NotificationType"] = [this.note1];
      this.userdataService.update_notification(userdata).subscribe((data) => {
        debugger;
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
