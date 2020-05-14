import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
  ViewChild, ViewEncapsulation
} from '@angular/core';
import {Router} from '@angular/router';
import {AdmindashboardService} from './admindashboard.service';
import {Observable, Subject} from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

import {  CalendarView } from 'angular-calendar';
import {AbstractControl, FormControl, ValidationErrors} from "@angular/forms";
import {map} from "rxjs/operators";
import {WeekDay} from "calendar-utils";
// import { ToolbarService, LinkService, ImageService, HtmlEditorService, TableService } from '@syncfusion/ej2-angular-richtexteditor';


@Component({
  selector: 'app-addashboard',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './addashboard.component.html',
  // styles: ['cal-time-events {\n' +
  // '    display: none !important;\n' +
  // '  }\n' +
  // '.cal-week-view .cal-day-headers {\n' +
  // '    padding-left: 0 !important;\n' +
  // '}\n' +
  // '  .cal-week-view .cal-all-day-events .cal-time-label-column {\n' +
  // '    display: none !important;\n' +
  // '}'],
  // encapsulation: ViewEncapsulation.None

})
export class AddashboardComponent {
  title = 'SalonPay';
  private servicelist: Observable<any>;
  private appointmentList: any;
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;
  view: CalendarView = CalendarView.Week;

  CalendarView = CalendarView;
  // viewDate: Date = new Date();
  viewDate: Date = new Date();
  selectedDay: WeekDay;
  refresh: Subject<any> = new Subject();

  @Output() viewChange: EventEmitter<string> = new EventEmitter();

  @Output() viewDateChange: EventEmitter<Date> = new EventEmitter();
  constructor(private elementRef: ElementRef, public router: Router, public admindashboardService: AdmindashboardService, public httpClient: HttpClient) {
  }

  ngOnInit() {
    this.admindashboardService.startConnection();
    this.admindashboardService.addTransferChartDataListener();
    this.admindashboardService.startConnectionWeekly();
    this.admindashboardService.addWeeklyDataListener();

    this.getAppointment();
    this.getWeeklySchedule();
    let ele  = this.elementRef.nativeElement.querySelector('.cal-week-view');
    let ele1  = this.elementRef.nativeElement.querySelector('.cal-time-events');
    // let ele = document.getElementsByClassName("cal-week-view");
    // ele.style.display = 'none'
    ele1.style.display = 'none'
    // var ele2  = this.elementRef.nativeElement.querySelector('.mwl-calendar-week-view-hour-segment .cal-hour-segment');
    // var ele3  = this.elementRef.nativeElement.querySelector('.cal-hour-segment');
    // ele3.style.display = 'none'
    // ele2.style.display = 'none'
    // this.subscription = this.customerService.on('call-customerDetail').subscribe(() => this.getCustomerList());
  }


  private getAppointment = () => {
    this.httpClient.get('http://172.16.0.99:8013/api/TodayAndUpcommingAppointments?parentCompanyId=6')
      .subscribe(res => {
        console.log(res);
      });
  }
  private getWeeklySchedule = () => {
    this.httpClient.get('http://172.16.0.99:8013/api/TodayAndUpcommingAppointments?parentCompanyId=6')
      .subscribe(res => {
        console.log(res);
      });
  }
}
