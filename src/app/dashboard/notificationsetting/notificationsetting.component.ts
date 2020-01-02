import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {UserdataService} from '../../userdata.service';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-notificationsetting',
  templateUrl: './notificationsetting.component.html',
  styleUrls: ['./notificationsetting.component.css']
})
export class NotificationsettingComponent implements OnInit {
  notificationForm: FormGroup;
  control: FormControl;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private router: Router, private userdataService: UserdataService) { }

  get f() {
    return this.notificationForm.controls;
  }

  ngOnInit() {
    this.userdataService.notificationnav = false;
    this.notificationForm = this.formBuilder.group({
      NotificationType: [''],
      EnableTextNotification: [true]
    });
  }

  updateNotification(userdata) {
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
