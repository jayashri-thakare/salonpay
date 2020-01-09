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
    '            <select class="select-field form-field" (change)="datechange(hour)" formControlName="StartTimeHour">\n' +
    '              <option value="">HH</option> '+
    '              <option (change)="hourschangefunc()" *ngFor="\let hour of arrayofhours" [value]="hour">{{hour}}</option>\n' +
    '            </select>\n' +
    '          </div>\n' +
    '          <!-- end -->\n' +
    '          <!-- start -->\n' +
    '          <div class="form-group">\n' +
    '            <select class="select-field form-field" formControlName="StartTimeMinute" [(ngModel)]="minute" (change)="datechange(minute)">\n' +
    '              <option value="">MM</option> '+
    '              <option *ngFor="let minute of arrayofminute">{{minute}}</option>\n' +
    '            </select>\n' +
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
    '        <h6 class="poptile">end Time</h6>\n' +
    '        <div class="start-time-input">\n' +
    '          <!-- start -->\n' +
    '          <div class="form-group">\n' +
    '            <select class="select-field form-field" [(ngModel)]="EndTimeHour" (change)="datechange(hour1)" formControlName="EndTimeHour" >\n' +
    '              <option value="">HH</option> '+
    '              <option *ngFor="\let hour1 of arrayofhours">{{hour1}}</option>\n' +
    '            </select>\n' +
    '          </div>\n' +
    '          <!-- end -->\n' +
    '          <!-- start -->\n' +
    '          <div class="form-group">\n' +
    '            <select class="select-field form-field" formControlName="EndTimeMinute" [(ngModel)]="minute1" (change)="datechange(minute1)" >\n' +
    '              <option value="">MM</option> '+
    '              <option *ngFor="\let minute1 of arrayofminute">{{minute1}}</option>\n' +
    '            </select>\n' +
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
  @Input('userdata') arrayofselectedobj : Array<any> = [];
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
