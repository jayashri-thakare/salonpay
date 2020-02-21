import {Component, OnInit, Pipe, PipeTransform} from '@angular/core';
import { Router } from '@angular/router';
import {UserdataService} from '../../userdata.service';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';
import {MessageService} from '../../message.service';

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
  public notifications: Observable<userdetail>
  public notification;
  private Email = {};
  private SMS = {};
  private note1 = {};
  public a1: any[];
  public a2: {};
  public masternotifications: Observable<userdetail>;
  constructor(private formBuilder: FormBuilder, private router: Router, public userdataService: UserdataService, public messageService: MessageService) { }

  get f() {
    return this.notificationForm.controls;
  }

  ngOnInit() {
    this.userdataService.notificationnav = false;
    // this.notificationsetting()
    // this.notificationForm = this.formBuilder.group({
    //   NotificationTypeEmail: [''],
    //   NotificationTypeSMS: [''],
    //   EnableEmailNotification: [''],
    //   // EnableEmailNotification1: [''],
    //   EnableTextNotification: [''],
    //   // EnableTextNotification1: ['']
    //   // notifications: new FormArray([])
    //   // Notification: this.notificationobject
    // });
    // this.getNotifications();
    this.getMasterNotification();
    this.getNotifications();
    this.a2 = {};
    this.a1 = [];
  }


  getMasterNotification() {
    this.userdataService.getMasterNotification().subscribe((data) => {
      console.log(data)
      this.masternotifications = data;
    });
  }
  getNotifications() {
    this.userdataService.getNotification().subscribe((data) => {
      console.log(data)
      // this.notifications = data;
      this.notifications = data[0].notify;
    });
  }

  addObj(notify, type, note) {
    // Custom_notification: {EnableEmailNotification: false, EnableTextNotification: true}
    // for(let i=0; i< this.notifications.length; i++){
    //   if(this.notifications[i]['notificationType'] == note){
    //     if(type == 'email'){
    //       this.notifications[i]['enableEmailNotification'] = notify
    //     }else if(type == 'sms'){
    //       this.notifications[i]['enableTextNotification'] = notify
    //     }
    //   }
    // }
    debugger;
    if(type == 'email'){
      // this.notificationobject['enableEmailNotification'] = notify
      this.EmailNotification['EnableEmailNotification'] = notify;
          }else if(type == 'sms'){
            // this.notificationobject['enableTextNotification'] = notify;
        this.EmailNotification['EnableTextNotification'] = notify;
          }
    //
    this.a2[note] = note;
    this.a2[note] = this.EmailNotification;
    this.a1.push(this.a2)
    console.log(this.notifications)
    // if (type === 'email'){
    //   this.Email = notify;
    //   this.EmailNotification['EnableEmailNotification'] = notify;
    //   this.notificationobject['EnableEmailNotification'] = this.EmailNotification;
    // } else if(type === 'sms'){
    //   this.SMS = notify;
    //   this.EmailNotification['EnableTextNotification'] = notify;
    //   this.notificationobject['EnableTextNotification'] = this.SMSNotification
    // }
    //
    //
    // const x = {};
    // this.a2[note] = note
    // // x[day] = day
    // this.a2[note] = this.notificationobject;
    // Object.assign(this.obj, x);
    // this.SMSNotification['Email'] = true;
    // this.SMSNotification['SMS'] = false;
    // this.a2[note] = this.EmailNotification

    // this.note1[note] = this.notificationobject;
    //
    // this.note[note] =  this.SMSNotification
    // console.log(this.notificationobject);
    // console.log(this.a2);
    // console.log(this.note1);

  }
  notificationsetting(notify, type, note) {
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
    // this.a2[note] = this.EmailNotification
    this.notificationobject['EnableEmailNotification'] = this.EmailNotification;
    this.notificationobject['EnableTextNotification'] = this.SMSNotification
    this.note1[note] = this.EmailNotification;

    this.note[note] =  this.SMSNotification
    // console.log(this.notificationobject);
    // console.log(this.a2);
    console.log(this.note1);
  }

  updateNotification(userdata) {
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
        this.getNotifications();
        this.messageService.clear();
        this.messageService.add('Notification updated successfully.');
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
