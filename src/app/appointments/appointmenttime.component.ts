import {Component, ElementRef, Input, TemplateRef, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {AppointmentService} from './appointment.service';
import {Observable} from 'rxjs';
// import { ToolbarService, LinkService, ImageService, HtmlEditorService, TableService } from '@syncfusion/ej2-angular-richtexteditor';


@Component({
  selector: 'app-appointmenttime',
  template: '      <div class="apn-right-in">\n' +
    '        <div class="scrollbar">\n' +
    '          <h6 class="hdn2">Available Start Times</h6>\n' +
    '\n' +
    '          <div class="apn-time-slot">\n' +
    '            <p class="sub-med mb-3">Morning</p>\n' +
    '            <div class="radio-box radio-box-2"  [ngClass]="{ \'booked-time\': getClass(time1) }" *ngFor="let time1 of morning; let i = index" (click)="addTime(time1)">\n' +
    '              <input type="radio" id="morning{{i}}" [value]="time1" name="timeslot"  [(ngModel)]="appointmentService.apptime" [checked]="apptime==time1" >\n' +
    '              <label for="morning{{i}}">{{time1}}</label>\n' +
    '            </div>\n' +
    '\n' +
    '            <p class="sub-med my-3">Afternoon </p>\n' +
    '            <div class="radio-box radio-box-2" *ngFor="let time2 of afternoon; let i2 = index" (click)="addTime(time2)">\n' +
    '              <input type="radio" id="afternoon{{i2}}"  [(ngModel)]="appointmentService.apptime" [checked]="apptime==time2" name="timeslot">\n' +
    '              <label for="afternoon{{i2}}">{{time2}}</label>\n' +
    '            </div>\n' +
    '\n' +
    '            <p class="sub-med my-3">Evening </p>\n' +
    '            <div class="radio-box radio-box-2" *ngFor="let time3 of evening; let i3 = index" (click)="addTime(time3)">\n' +
    '              <input type="radio" id="evening{{i3}}" [(ngModel)]="appointmentService.apptime" [checked]="apptime==time3"  name="timeslot">\n' +
    '              <label for="evening{{i3}}">{{time3}}</label>\n' +
    '            </div>\n' +
    '          </div>\n' +
    '        </div>\n' +
    '      </div>\n'
})
export class AppointmentTimeComponent {

   morning =  ['8:00 AM', '8:30 AM', '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM']
   afternoon = ['12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM' ];
   evening = ['4:30 PM', '5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM']
  @Input('bookedTime') bookedTime: any;
  @Input('preference') preference1: any;
  private apptime: any;
  constructor(private elementRef: ElementRef, public router: Router, public appointmentService: AppointmentService) {
  }

  ngOnInit() {

    // this.subscription = this.customerService.on('call-customerDetail').subscribe(() => this.getCustomerList());
  }


  addTime(time){
    debugger;
    if(this.appointmentService.objIndex >= 0) {
      if(this.preference1 ==3) {
        this.appointmentService.techserList[this.appointmentService.objIndex]['startTime'] = this.apptime;
      }else {
        this.appointmentService.techserList[this.appointmentService.objIndex]['startTime'] = time;
        console.log(this.appointmentService.techserList);
      }
    }
  }
  getClass = function(keyVal) {
    if(this.appointmentService.bookedTime!=undefined) {
      for (var i = 0; i < this.appointmentService.bookedTime.length; i++) {
        var bookt = this.appointmentService.bookedTime[i];
        var splits = bookt.split(" -")
        if (splits[0] === keyVal) {
          console.log(keyVal)
          return  true;
        }
      }
    }
  };

}
