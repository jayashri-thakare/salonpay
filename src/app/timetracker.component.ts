import { Component, Input , OnInit } from '@angular/core';
// @ts-ignore
import { Observable, Subscription } from 'rxjs/Rx';
import {UserdataService} from './userdata.service';
import {DomSanitizer} from '@angular/platform-browser';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  // tslint:disable-next-line:component-selector
    selector: 'timer',
    template: `
        <h1>
          <div class="time-track">
            <div class="time-hed">
              <h6>Time Tracker</h6>
              <i class="icon-minus"></i>
            </div>
            <div class="trak-sld">
              <div class="trk-prof">
                <div class="trk-det">
                  <div class="user-img"><img src="img/profile.svg" alt=""></div>
                  <div class="trk-name">
                    <h3>{{userdetail?.firstName}} {{userdetail?.lastName}}<span>Technician</span></h3>
                  </div>
                </div>
                <div id="stopWatch">
                  <h6 id="time">{{hoursDisplay ? hoursDisplay : '00'}} : {{(minutesDisplay) && (minutesDisplay <= 59) ? minutesDisplay : '00'}} : {{(secondsDisplay) && (secondsDisplay <= 59) ? secondsDisplay : '00'}}</h6>
                </div>
              </div>
              <div class="trk-btn">
                <button class="button" id="start" (click)="startTimer(StatusFlag=false);">Start</button>
                <button class="button blue" id="stop"  (click)="stopTimer(StatusFlag=true);">Stop</button>
              </div>
              <div class="form-group">
                <select class="select-field form-field valid" name="select-fld" id="select-fld" required=""
                        aria-invalid="false">
                  <option></option>
                  <option>Option 1</option>
                  <option>Option 2</option>
                  <option>Option 3</option>
                  <option>Option 4</option>
                  <option>Option 5</option>
                </select>
                <p class="form-label sel-blk">Task</p>
              </div>
            </div>
          </div>
<!--            {{hoursDisplay ? hoursDisplay : '00'}} : {{(minutesDisplay) && (minutesDisplay <= 59) ? minutesDisplay : '00'}} : {{(secondsDisplay) && (secondsDisplay <= 59) ? secondsDisplay : '00'}} <br/>-->
<!--            <button class="button line close-btn" type="button" (click)="startTimer();">Start</button>-->
<!--            <button class="button line close-btn" type="button" (click)="stopTimer();">Stop</button>-->
        </h1>
    `,
    styles: [ `
        h1 {
            color: #57acec;
            margin-top: 24px;
            text-align: center;
        }
    `]
})
export class TimerComponent implements OnInit {
    ticks = 0;
    minutesDisplay: number = 0;
    hoursDisplay: number = 0;
    secondsDisplay: number = 0;
    totalTime: any
    StatusFlag: boolean;
    @Input('userdata') userdetail: any;
    sub: Subscription;
    constructor(private userdataService: UserdataService,
              private formBuilder: FormBuilder) { }
    ngOnInit() {
        // this.startTimer();
        // this.getTimeDifference();
        // this.userdataService.get_time_difference();
    }

    private getTimeDifference(){
      // @ts-ignore
      this.totalTime = '02:33:42'
      var splitted = this.totalTime.split(":");
      console.log(splitted);
      this.hoursDisplay = splitted[0];
      this.secondsDisplay = splitted[2];
      // let timer = Observable.timer(1, 1000);
      // this.sub = timer.subscribe(this.totalTime);

      let timer = Observable.timer(2000,1000);
      // timer.subscribe(t=>this.ticks = t);
        this.sub = timer.subscribe(
            t => {
                this.ticks = t;
                this.secondsDisplay = this.getSeconds(20);
                this.minutesDisplay = this.getMinutes(30);
                this.hoursDisplay = this.getHours(2);
            }
        );

      this.userdataService.get_time_difference().subscribe((data) => {
        debugger;
      // this.userdetail = data;

      });
    }


    public startTimer(statusflag) {

        let timer = Observable.timer(1, 1000);
        this.sub = timer.subscribe(
            t => {
                this.ticks = t;
                this.secondsDisplay = this.getSeconds(this.ticks);
                this.minutesDisplay = this.getMinutes(this.ticks);
                this.hoursDisplay = this.getHours(this.ticks);
            }
        );
        this.saveTimer(statusflag);
    }

    saveTimer(statusflag) {
      debugger;
      this.userdataService.add_time_tracker(statusflag).subscribe((data) => {
        debugger;
        console.log("save")
      });
    }


    public stopTimer(statusflag) {
         this.sub.unsubscribe();
         this.saveTimer(statusflag);
    }

    public getSeconds(ticks: number) {
        return this.pad(ticks % 60);
    }

    public getMinutes(ticks: number) {
         return this.pad((Math.floor(ticks / 60)) % 60);
    }

    public getHours(ticks: number) {
        return this.pad(Math.floor((ticks / 60) / 60));
    }

    public pad(digit: any) {
        return digit <= 9 ? '0' + digit : digit;
    }
}
