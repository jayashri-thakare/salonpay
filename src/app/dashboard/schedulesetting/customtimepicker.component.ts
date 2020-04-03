import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserdataService } from '../../userdata.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-customTimePicker',
  template: '<form [formGroup]="customTimePicker">' +
    '<h6 class="poptile">{{\'Start\' | translate}} {{\'Time\' | translate}}</h6>\n' +
    '        <div class="start-time-input">\n' +
    '          <!-- start -->\n' +
    '          <div class="form-group">\n' +
    '            <select class="select-field form-field form-height-schedule" (change)="datechange(hour)" formControlName="StartTimeHour">\n' +
    '              <option value=""></option> ' +
    '              <option *ngFor="\let hour of arrayofhours" [value]="hour">{{hour}}</option>\n' +
    '            </select>\n' +
    '            <p class="form-label sel-blk">Hr.</p>\n' +
    '          </div>\n' +
    '          <!-- end -->\n' +
    '          <!-- start -->\n' +
    '          <div class="form-group">\n' +
    '            <select class="select-field form-field form-height-schedule" formControlName="StartTimeMinute" [(ngModel)]="minute" (change)="datechange(minute)">\n' +
    '              <option value=""></option> ' +
    '              <option *ngFor="let minute of arrayofminute">{{minute}}</option>\n' +
    '            </select>\n' +
    '            <p class="form-label sel-blk">Min.</p>\n' +
    '          </div>\n' +
    '          <!-- end -->\n' +
    '          <!-- start -->\n' +
    '          <div class="radio-box radio-box-2">\n' +
    '            <input type="radio" id="{{addchildAMMessage}}_AM" value="AM" formControlName="StartTimeMeridian" (click)="datechange(\'AM\')">\n' +
    '            <label for="{{addchildAMMessage}}_AM">AM</label>\n' +
    '          </div>\n' +
    '          <!-- end -->\n' +
    '          <!-- start -->\n' +
    '          <div class="radio-box radio-box-2">\n' +
    '            <input type="radio" id="{{addchildAMMessage}}_PM" value="PM" formControlName="StartTimeMeridian" (click)="datechange(\'PM\')">\n' +
    '            <label for="{{addchildAMMessage}}_PM">PM</label>\n' +
    '          </div>\n' +
    '          <!-- end -->\n' +
    '        </div>\n' +
    '        <h6 class="poptile">{{\'End\' | translate}} {{\'Time\' | translate}}</h6>\n' +
    '        <div class="start-time-input">\n' +
    '          <!-- start -->\n' +
    '          <div class="form-group">\n' +
    '            <select class="select-field form-field form-height-schedule"  (change)="datechange(hour1)" formControlName="EndTimeHour" >\n' +
    '              <option value=""></option> ' +
    '              <option *ngFor="\let hour1 of arrayofhours">{{hour1}}</option>\n' +
    '            </select>\n' +
    '            <p class="form-label sel-blk">Hr.</p>\n' +
    '          </div>\n' +
    '          <!-- end -->\n' +
    '          <!-- start -->\n' +
    '          <div class="form-group">\n' +
    '            <select class="select-field form-field form-height-schedule" formControlName="EndTimeMinute" [(ngModel)]="minute1" (change)="datechange(minute1)" >\n' +
    '              <option value=""></option> ' +
    '              <option *ngFor="\let minute1 of arrayofminute">{{minute1}}</option>\n' +
    '            </select>\n' +
    '            <p class="form-label sel-blk">Min.</p>\n' +
    '          </div>\n' +
    '          <!-- end -->\n' +
    '          <!-- start -->\n' +
    '          <div class="radio-box radio-box-2">\n' +
    '            <input type="radio" id="{{addchildAMMessage}}_endAM" value="AM" (click)="datechange1(\'AM\')" formControlName="EndTimeMeridian" >\n' +
    '            <label for="{{addchildAMMessage}}_endAM">AM</label>\n' +
    '          </div>\n' +
    '          <!-- end -->\n' +
    '          <!-- start -->\n' +
    '          <div class="radio-box radio-box-2">\n' +
    '            <input type="radio" id="{{addchildAMMessage}}_endPM" value="PM" (click)="datechange1(\'PM\')" formControlName="EndTimeMeridian" >\n' +
    '            <label for="{{addchildAMMessage}}_endPM">PM</label>\n' +
    '          </div>\n' +
    '          <!-- end -->\n' +
    '        </div>' +
    '       </form>',
  styleUrls: ['./schedulesetting.component.css']
})
export class CustomTimePickerComponent implements OnInit {
  hour: any;
  minute: any;
  onehalf: any;
  otherhalf: any;
  minute1: any;
  hour1: any;
  public arrayofhours: Array<any> = [];
  public arrayofminute: Array<any> = [];
  @Input() customTimePicker: FormGroup;
  @Input('userdata') arrayofselectedobj: Array<any> = [];
  private arrayofapplieddays: Array<any> = [];
  @Input() addchildAMMessage: string;
  // @Input() addchildPMMessage: string;
  // @Input() addEndAMMessage: string;
  // @Input() addEndPMMessage: string;
  // @Input() editchildAMMessage: string;
  // @Input() editchildPMMessage: string;
  // @Input() editEndAMMessage: string;
  // @Input() editEndPMMessage: string;
  selectedobj: any;

  constructor(private router: Router, private userdataService: UserdataService) { }

  ngOnInit() {
    this.selectedobj = this.arrayofselectedobj[0]
    var H = 13;
    this.arrayofhours = Array.apply(null, { length: H }).map(Number.call, Number)
    for (let i = 0; i <= this.arrayofhours.length; i++) {
      if (this.arrayofhours[i] < 10) {
        this.arrayofhours[i] = '0' + this.arrayofhours[i];
      }
    }
    var M = 60; this.arrayofminute = Array.apply(null, { length: M }).map(Number.call, Number)
    for (let i = 0; i <= this.arrayofminute.length; i++) {
      if (this.arrayofminute[i] < 10) {
        this.arrayofminute[i] = '0' + this.arrayofminute[i];
      }
    }
  }

  datechange(onehalf) {
    if (this.hour || this.minute || onehalf) {
      this.onehalf = onehalf;
      var time = this.hour + ':' + this.minute + ' ' + this.onehalf;
      console.log(time)
    }
  }

  datechange1(otherhalf) {
    if (this.hour1 || this.minute1 || otherhalf) {
      this.otherhalf = otherhalf
      var time1 = this.hour1 + ':' + this.minute1 + ' ' + this.otherhalf;
      console.log(time1)
    }
  }

}
