import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserdataService} from '../../userdata.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-customTimePicker',
  template: '<form [formGroup]="customTimePicker">'+
    '<h6 class="poptile">Start Time</h6>\n' +
    '        <div class="start-time-input">\n' +
    '          <!-- start -->\n' +
    '          <div class="form-group">\n' +
    '            <select class="select-field form-field" formControlName="StartTimeHour" [(ngModel)]="hour" (change)="datechange(hour)">\n' +
    '              <option value="{{hour}}" *ngFor="\let hour of arrayofhours">{{hour}}</option>\n' +
    '            </select>\n' +
    '          </div>\n' +
    '          <!-- end -->\n' +
    '          <!-- start -->\n' +
    '          <div class="form-group">\n' +
    '            <select class="select-field form-field" formControlName="StartTimeMinute" [(ngModel)]="minute" (change)="datechange(minute)">\n' +
    '              <option *ngFor="let minute of arrayofminute">{{minute}}</option>\n' +
    '            </select>\n' +
    '          </div>\n' +
    '          <!-- end -->\n' +
    '          <!-- start -->\n' +
    '          <div class="radio-box radio-box-2">\n' +
    '            <input type="radio" id="StartAM" value="AM" formControlName="StartTimeMeridian" (click)="datechange(\'AM\')">\n' +
    '            <label for="StartAM">AM</label>\n' +
    '          </div>\n' +
    '          <!-- end -->\n' +
    '          <!-- start -->\n' +
    '          <div class="radio-box radio-box-2">\n' +
    '            <input type="radio" id="StartPM" value="PM" formControlName="StartTimeMeridian" (click)="datechange(\'PM\')">\n' +
    '            <label for="StartPM">PM</label>\n' +
    '          </div>\n' +
    '          <!-- end -->\n' +
    '        </div>\n' +
    '        <h6 class="poptile">end Time</h6>\n' +
    '        <div class="start-time-input">\n' +
    '          <!-- start -->\n' +
    '          <div class="form-group">\n' +
    '            <select class="select-field form-field" [(ngModel)]="EndTimeHour" (change)="datechange(hour1)" formControlName="EndTimeHour" required="">\n' +
    '              <option *ngFor="\let hour1 of arrayofhours">{{hour1}}</option>\n' +
    '            </select>\n' +
    '          </div>\n' +
    '          <!-- end -->\n' +
    '          <!-- start -->\n' +
    '          <div class="form-group">\n' +
    '            <select class="select-field form-field" formControlName="EndTimeMinute" [(ngModel)]="minute1" [value]="EndTimeMinute" (change)="datechange(minute1)" required="">\n' +
    '              <option *ngFor="\let minute1 of arrayofminute">{{minute1}}</option>\n' +
    '            </select>\n' +
    '          </div>\n' +
    '          <!-- end -->\n' +
    '          <!-- start -->\n' +
    '          <div class="radio-box radio-box-2">\n' +
    '            <input type="radio" id="EndAM" value="AM" (click)="datechange1(\'AM\')" formControlName="EndTimeMeridian" >\n' +
    '            <label for="EndAM">AM</label>\n' +
    '          </div>\n' +
    '          <!-- end -->\n' +
    '          <!-- start -->\n' +
    '          <div class="radio-box radio-box-2">\n' +
    '            <input type="radio" id="EndPM" value="PM" (click)="datechange1(\'PM\')" formControlName="EndTimeMeridian" >\n' +
    '            <label for="EndPM">PM</label>\n' +
    '          </div>\n' +
    '          <!-- end -->\n' +
    '        </div>'+
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
  private arrayofhours: Array<any> = [];
  private arrayofminute: Array<any> = [];
  @Input() customTimePicker: FormGroup;

  constructor(private router: Router, private userdataService: UserdataService) { }

  ngOnInit() {
    var H = 13; this.arrayofhours = Array.apply(null, {length: H}).map(Number.call, Number)
    var M = 60; this.arrayofminute = Array.apply(null, {length: M}).map(Number.call, Number)
  }

  datechange(onehalf){
    if (this.hour || this.minute || onehalf){
      this.onehalf = onehalf;
      var time = this.hour + ':' + this.minute + ' ' + this.onehalf;
      console.log(time)
    }
  }

  datechange1(otherhalf){
    if (this.hour1 || this.minute1 || otherhalf){
      this.otherhalf = otherhalf
      var time1 = this.hour1 + ':' + this.minute1 + ' ' + this.otherhalf;
      console.log(time1)
    }
  }

}
