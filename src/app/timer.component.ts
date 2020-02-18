import {Component, OnInit, OnDestroy, Input} from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';
import { TimerService } from './timer.service';
import {UserdataService} from './userdata.service';

@Component({
  selector: 'timer1',
  template: `
    <h1>
      <div class="time-track" >
        <div class="time-hed" (click)="timetrack= !timetrack">
          <h6>Time Tracker</h6>
          <i class="icon-cross trk-plus" [ngStyle]="{'display': timetrack ? 'block' : 'none' }"></i>
          <i class="icon-minus trk-minus" [ngStyle]="{'display': !timetrack ? 'block' : 'none' }"></i>
        </div>
        <div class="trak-sld">
          <div class="trk-prof">
            <div class="trk-det">
              <div class="user-img"><img src="../../../assets/img/profile.svg" alt=""></div>
              <div class="trk-name">
                <h3>{{userdetail?.firstName}} {{userdetail?.lastName}}<span>Technician</span></h3>
              </div>
            </div>
            <div id="stopWatch">
              <h6 id="time">{{hoursDisplay ? hoursDisplay : '00'}} : {{(minutesDisplay) && (minutesDisplay <= 59) ? minutesDisplay : '00'}} : {{(secondsDisplay) && (secondsDisplay <= 59) ? secondsDisplay : '00'}}</h6>
            </div>
          </div>
          <div class="trk-btn">
            <button class="button" id="start" (click)="startTimer();saveTimer(false)">Start</button>
            <button class="button blue" id="stop"  (click)="stopTimer();saveTimer(true)">Stop</button>
          </div>
        </div>
      </div>
     </h1>
  `,
  styles: [ `
    h1 {
      color: #57acec;
      margin-top: 24px;
      text-align: center;
    }
    .trk-prof h6{
      margin: 0;
      font-family: "bold";
      font-size: 30px;
      color: #1c2d41;
    }

  `]
})
// tslint:disable-next-line:component-class-suffix
// https://dmkcode.com/2016/09/simple-timer-using-angular-2-and-rxjs-part-2/
export class TimerComponent1 implements OnInit, OnDestroy {
  private playPauseStopUnsubscribe: any;

  start = 0;
  ticks = 0;

  minutesDisplay: number = 0;
  hoursDisplay: number = 0;
  secondsDisplay: number = 0;
  timetrack: boolean
  @Input('userdata') userdetail: any;
  sub: Subscription;
  private totalTime: any;

  constructor(private timerService: TimerService, public userdataService: UserdataService) {
  }

  ngOnInit() {
    // this.start = 100;
    this.timetrack = !this.timetrack;
    this.getTimeDifference();
    // this.startTimer();
    this.playPauseStopUnsubscribe = this.timerService.playPauseStop$.subscribe((res: any) => this.playPauseStop(res));
  }

  ngOnDestroy() {
    this.playPauseStopUnsubscribe.unsubscribe();;
  }

  private playPauseStop(res: any) {
    if(res.play) {
      this.startTimer();
    } else if(res.pause) {
      this.pauseTimer();
    } else if (res.stop) {
      this.stopTimer();
    }
  }

  private startTimer() {

    let timer = Observable.timer(1, 1000);
    this.sub = timer.subscribe(
      t => {
        this.ticks = this.start + t;

        this.secondsDisplay = this.getSeconds(this.ticks);
        this.minutesDisplay = this.getMinutes(this.ticks);
        this.hoursDisplay = this.getHours(this.ticks);
      }
    );
    // this.saveTimer(false);
  }

  saveTimer(statusflag) {
    this.userdataService.add_time_tracker(statusflag).subscribe((data) => {
      console.log("save")
    });
  }
  private pauseTimer() {
    this.start = ++this.ticks;
    if (this.sub) this.sub.unsubscribe();
  }


  private getTimeDifference(){
    this.userdataService.get_time_difference().subscribe((data) => {
      // this.userdetail = data;
      debugger;
      if(data['totalTime']) {
        var hms = data['totalTime'];
        var a = hms.split(':'); // split it at the colons

        // minutes are worth 60 seconds. Hours are worth 60 minutes.
        var seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]);
        this.start = seconds;
        this.startTimer();
      }
    });
  }
  private stopTimer() {
    this.start = 0;
    this.ticks = 0;

    this.minutesDisplay = 0;
    this.hoursDisplay = 0;
    this.secondsDisplay = 0;
    if (this.sub) this.sub.unsubscribe();
  }

  private getSeconds(ticks: number) {
    return this.pad(ticks % 60);
  }

  private getMinutes(ticks: number) {
    return this.pad((Math.floor(ticks / 60)) % 60);
  }

  private getHours(ticks: number) {
    return this.pad(Math.floor((ticks / 60) / 60));
  }

  private pad(digit: any) {
    return digit <= 9 ? '0' + digit : digit;
  }
}
