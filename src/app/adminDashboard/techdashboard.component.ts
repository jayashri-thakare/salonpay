import {Component, ElementRef, EventEmitter, Output, TemplateRef, ViewChild} from "@angular/core";
import {Observable, Subject} from "rxjs";
import {Router} from "@angular/router";
import {AdmindashboardService} from "./admindashboard.service";
import {HttpClient} from "@angular/common/http";

import {  CalendarView } from 'angular-calendar';
import {AbstractControl, FormControl, ValidationErrors} from "@angular/forms";
import {map} from "rxjs/operators";
import {WeekDay} from "calendar-utils";
@Component({
  selector: 'app-techdashboard',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './techdashboard.component.html'
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
export class TechDashboardComponent {
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
    this.admindashboardService.startGraphConnection();
    this.admindashboardService.addTransferChartDataListener();
 this.getTechnicianChart();


  }
  myType = 'ColumnChart'
  myData = [
    ['London', 8136000],
    ['New York', 8538000],
    ['Paris', 2244000],
    ['Berlin', 3470000],
    ['Kairo', 19500000]
  ];


  private getAppointment = () => {
    this.httpClient.get('http://172.16.0.99:8013/api/TodayAndUpcommingAppointments?parentCompanyId=6')
      .subscribe(res => {
        console.log(res);
      });
  }
  private getTechnicianChart = () => {
    this.httpClient.get('http://172.16.0.99:8013/api/TodaysQuickStatistics_SalaryCommissionTip?parentCompanyId=6&TechnicianId=cfe2e89c-8c8a-47fc-8b72-d4a9ded74079')
      .subscribe(res => {
        console.log(res);
      });
  }
}
